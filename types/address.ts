export type IAddress = {
  _id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AddressInput = Omit<IAddress, "_id" | "userId" | "isDefault" | "createdAt" | "updatedAt">;
