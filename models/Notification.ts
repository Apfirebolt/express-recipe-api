import mongoose, { Schema, Document, Model, Types } from "mongoose";

// 1. Interface for Notification Document
export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define Schema with typed interface
const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Export Typed Model
const Notification: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;