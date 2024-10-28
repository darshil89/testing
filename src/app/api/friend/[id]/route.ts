import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = String(req.url);
    const parts = url.split("/");

    const friendId = parts[parts.length - 1];
    console.log(friendId);
    return NextResponse.json(
      await prisma.friend.findUnique({ where: { id: friendId } })
    );
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const url = String(req.url);
    const parts = url.split("/");

    const friendId = parts[parts.length - 1];
    const body = await req.json();
    console.log(friendId, body);
    return NextResponse.json(
      await prisma.friend.update({
        where: { id: friendId },
        data: body,
      })
    );
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error,
    });
  }
}
