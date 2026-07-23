import "server-only";
import { connectDB } from "@/lib/db";
import { AddressModel } from "@/models/address.model";
import type { AddressInput, IAddress } from "@/types/address";

function toAddress(address: IAddress): IAddress {
  return { ...address, _id: String(address._id) };
}

export async function getAddressesByUserId(userId: string) {
  await connectDB();
  const addresses = await AddressModel.find({ userId }).sort({ isDefault: -1, createdAt: -1 }).lean<IAddress[]>().exec();
  return addresses.map(toAddress);
}

export async function createAddress(userId: string, id: string, input: AddressInput) {
  await connectDB();
  const hasAddress = Boolean(await AddressModel.exists({ userId }));
  const address = await AddressModel.create({ _id: id, userId, ...input, isDefault: !hasAddress });
  return toAddress(address.toObject() as IAddress);
}

export async function setDefaultAddress(userId: string, addressId: string) {
  await connectDB();
  const address = await AddressModel.findOne({ _id: addressId, userId });
  if (!address) return null;

  await AddressModel.updateMany({ userId, _id: { $ne: addressId } }, { $set: { isDefault: false } });
  address.isDefault = true;
  await address.save();
  return toAddress(address.toObject() as IAddress);
}
