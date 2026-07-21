export type IUser = {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  isLockedIn: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IAuthSession = {
  _id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthUser = Pick<IUser, "_id" | "name" | "email" | "isLockedIn">;
