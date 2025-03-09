import mongoose from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "customer" | "designer" | "dropshipper" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password should be at least 8 characters long"],
    },
    accountType: {
      type: String,
      enum: ["customer", "designer", "dropshipper", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

// Check if the model already exists to prevent overwriting
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
