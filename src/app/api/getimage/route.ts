import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const vehicleNumber = searchParams.get("vehicleNumber");

    if (!date || !vehicleNumber) {
      return NextResponse.json(
        { msg: "Missing search parameters" },
        { status: 400 }
      );
    }

    const image = await prisma.image.findMany({
      where: {
        date,
        vehicleNumber,
      },
    });

    if (!image) {
      return NextResponse.json({ msg: "Image not found" }, { status: 404 });
    }
    console.log(image);
    return NextResponse.json({ image }, { status: 200 });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ msg: "Failed to fetch image" }, { status: 500 });
  }
};
