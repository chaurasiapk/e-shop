// import "server-only";
import { connectDB } from "@/lib/db";
import { OfferModel } from "@/models/offer.model";
import type { IOffer } from "@/types/offers";

function toCategoryOffer(offer: IOffer): IOffer {
  return {
    ...offer,
    _id: String(offer._id),
  };
}

export async function getOffers(): Promise<IOffer[]> {
  await connectDB();
  const offers = await OfferModel.find({ isActive: true })
    .lean<IOffer[]>()
    .exec();
  return offers.map((offer) => ({ ...offer, _id: String(offer._id) }));
}

export async function getOffersByCategory(
  categorySlug: string,
): Promise<IOffer[]> {
  await connectDB();
  const offers = await OfferModel.find({ categorySlug, isActive: true })
    .lean<IOffer[]>()
    .exec();
  return offers.map(toCategoryOffer);
}
