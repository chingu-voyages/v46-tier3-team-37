import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Item } from "@/types/schemaTypes";

export async function GET(req: NextRequest) {
  const tools = await prisma?.item.findMany({ 
    include: {
      images: true,
      Transaction: {
        select: {
          startDate: true,
          endDate: true
        }
      }
    }
   });
  return NextResponse.json(tools);
}

export async function POST(req: NextRequest) {
  const data:Item = await req.json();

  try {
    const newTool = await prisma?.item.create({ data });
    return NextResponse.json(newTool);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}



