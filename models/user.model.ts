import "server-only";
import { model, models, Schema } from "mongoose";
import type { IUser } from "@/types/auth";

const userSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    isLockedIn: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const UserModel = models.User ?? model<IUser>("User", userSchema);
