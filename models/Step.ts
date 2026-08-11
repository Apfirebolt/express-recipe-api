import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IStep extends Document {
  recipe: Types.ObjectId;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const stepSchema = new Schema<IStep>(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Recipe",
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Export Typed Model
const Step: Model<IStep> = mongoose.model<IStep>("Step", stepSchema);

export default Step;