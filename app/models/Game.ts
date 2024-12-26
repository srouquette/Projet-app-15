import mongoose from "mongoose";

export interface Games extends mongoose.Document {
  name: string;
  image_url: string;
  likes: number;
  dislikes: number;
}

/* GameSchema will correspond to a collection in your MongoDB database. */
const GameSchema = new mongoose.Schema<Games>({
  name: {
    /* The name of this Game */

    type: String,
    required: [true, "Please provide a name for this Game."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  image_url: {
    /* Url to Game image */

    required: [true, "Please provide an image url for this Game."],
    type: String,
  },
  likes: {
    /* List of things your Game likes to do */

    type: Number,
  },
  dislikes: {
    /* List of things your Game does not like to do */

    type: Number,
  },
});

export default mongoose.models.Game || mongoose.model<Games>("Game", GameSchema);
