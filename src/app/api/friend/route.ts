import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getSessionForServer } from "@/libs/session";

// route to add number to the user
export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const session = await getSessionForServer();
  try {
    const friend = await prisma.friend.create({
      data: {
        name: body.name,
        email: body.email,
        photo: body.photo,
        number: body.number,
        user: {
          connect: {
            id: session?.user.id,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Friend added successfully",
      friend,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while adding friend",
      error,
    });
  }
}

export async function GET(req: Request) {
  const session = await getSessionForServer();

  try {
    const friends = await prisma.friend.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    return NextResponse.json({
      friends,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while fetching friends",
      error,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("--------------------UPDATING FRIEND-------------------");
    console.log(body);
    const updatedfriend = await prisma.friend.update({
      where: { id: body.id },
      data: {
        name: body.name,
        email: body.email,
        number: body.number,
      },
    });

    return NextResponse.json({
      message: "Friend updated successfully",
      friend: updatedfriend,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error,
    });
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();

  try {
    const deletedfriend = await prisma.friend.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      message: "Friend deleted successfully",
      friend: deletedfriend,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while deleting friend",
      error,
    });
  }
}
