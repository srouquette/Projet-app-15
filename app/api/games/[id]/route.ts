import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Game from "@/app/models/Game";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    console.log("Connected to database");
    const id = (await params).id
    const game = await Game.findById(id);
    return Response.json(game);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    console.log("Connected to database");
    const id = (await params).id
    const reqBody = await request.json();

    const game = await Game.findByIdAndUpdate(id, reqBody, {
        new: true,
        runValidators: true,
      });
    return Response.json(game);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};