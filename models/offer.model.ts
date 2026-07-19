import "server-only";
import { Schema, models, model } from "mongoose";
import type { IOffer } from "@/types/offers";

const offerSchema = new Schema<IOffer>(
  {
    _id: { type: String, required: true },
    categorySlug: { type: String, required: true, index: true },
    eventLabel: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    tagline: { type: String, required: true },
    emiAmount: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    bg: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const OfferModel =
  models.Offer ?? model<IOffer>("Offer", offerSchema);
