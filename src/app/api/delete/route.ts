import { PrismaClient} from "@prisma/client"
import fs from "fs"
import path from "path"
import {NextResponse} from "next/server"

const prisma = new PrismaClient()

export const DELETE = async (request) => {
  try{
    const {imageId, imageUrl} = await request.json()

    console.log("imageId", imageId, "ImageUrl", imageUrl)

    //Delete the image record from prisma
    await prisma.image.delete({
      where: {id: imageId}
    })
    //Delete the image file  from local storage 
    const imagePath = path.join(process.cwd(), "public", imageUrl)
    fs.unlinkSync(imagePath)
    return NextResponse.json({message: "Image deleted successfully"})
  }
  catch(error){
    console.error("Error deleting image", error)
    return NextResponse.json({message: "Failed to delete image"}, {status : 500})
  }
}