import "server-only";
import { model, models, Schema } from "mongoose";
import type { IAuthSession } from "@/types/auth";

const authSessionSchema = new Schema<IAuthSession>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true, versionKey: false },
);

export const AuthSessionModel =
  models.AuthSession ?? model<IAuthSession>("AuthSession", authSessionSchema);
