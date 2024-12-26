import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import Game from "../../../models/Game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const pet = await Game.findById(id);
        if (!pet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: pet });
      } catch  {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const pet = await Game.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!pet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: pet });
      } catch {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedGame = await Game.deleteOne({ _id: id });
        if (!deletedGame) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
