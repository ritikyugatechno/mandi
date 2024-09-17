import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

export const POST = async (request:any) => {
  try {
    const file = await request.formData();
    const image = file.get("image");
    const date = file.get("date"); // Get date
    const vehicleNumber = file.get("vehicleNumber"); // Get vehicle number

    if (!image || !date || !vehicleNumber) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    const imageName = image.name;
    const imageBuffer = await image.arrayBuffer();
    const uploadPath = path.join(process.cwd(), "public", "image", imageName);

    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(imageBuffer);

    // Save the file to the filesystem
    await fs.writeFile(uploadPath, buffer);
    console.log(`Image saved to ${uploadPath}`);

    // Convert the date to YYYY-MM-DD format
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Save image details to the database
    try {
      const savedImage = await prisma.image.create({
        data: {
          name: imageName,
          date: formattedDate, // Store date as string in YYYY-MM-DD format
          vehicleNumber: vehicleNumber.toString(), // Save vehicle number
        },
      });
      console.log("Image saved in the database:", savedImage);
      return NextResponse.json({
        msg: "Image uploaded successfully",
        image: savedImage,
      });
    } catch (dbError) {
      console.error("Error saving image to the database:", dbError);
      return NextResponse.json(
        { msg: "Failed to save image to database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { msg: "Failed to upload image" },
      { status: 500 }
    );
  }
};
