import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Game from "@/app/models/Game";

export async function GET() {
  try {
    await dbConnect();
    console.log("Connected to database");
    const games = await Game.find();
    return Response.json(games);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    console.log("Connected to database");
    const reqBody = await request.json();
    const game = await Game.create(reqBody);
    return Response.json(game);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};