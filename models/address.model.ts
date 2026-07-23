import "server-only";
import { model, models, Schema } from "mongoose";
import type { IAddress } from "@/types/address";

const addressSchema = new Schema<IAddress>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    addressLine1: { type: String, required: true, trim: true, maxlength: 160 },
    addressLine2: { type: String, trim: true, maxlength: 160 },
    city: { type: String, required: true, trim: true, maxlength: 80 },
    state: { type: String, required: true, trim: true, maxlength: 80 },
    postalCode: { type: String, required: true, trim: true, maxlength: 20 },
    country: { type: String, required: true, trim: true, default: "India", maxlength: 80 },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const AddressModel = models.Address ?? model<IAddress>("Address", addressSchema);
