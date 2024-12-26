import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import Game from "../../../models/Game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const pets = await Game.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: pets });
      } catch {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const pet = await Game.create(
          req.body,
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: pet });
      } catch {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
