import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IRecipe extends Document {
  user: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define Schema with typed interface
const recipeSchema = new Schema<IRecipe>(
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
  },
  {
    timestamps: true,
  }
);

// 3. Export Typed Model
const Recipe: Model<IRecipe> = mongoose.model<IRecipe>("Recipe", recipeSchema);

export default Recipe;