import mongoose, { Schema, Document, Model, Types } from "mongoose";

// 1. Interface for Picture Document
export interface IPicture extends Document {
  recipe?: Types.ObjectId | null;
  title: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define Schema with typed interface
const pictureSchema = new Schema<IPicture>(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Recipe",
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Export Typed Model
const Picture: Model<IPicture> = mongoose.model<IPicture>("Picture", pictureSchema);

export default Picture;