import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Tool } from "@/types/schemaTypes";

export async function GET(req: NextRequest) {
  const tools:Tool[] = await prisma?.item.findMany({ take: 10 });
  return NextResponse.json(tools);
}

export async function POST(req: NextRequest) {
  const data: Tool = await req.json();

  try {
    const newTool = await prisma?.item.create({ data });
    return NextResponse.json(newTool);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}



