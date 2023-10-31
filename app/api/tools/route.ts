import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Item } from "@/types/schemaTypes";
import { getAllToolsWithImages, getFeaturedTools } from "@/app/actions";

export async function GET(req: NextRequest) {
  const tools = await prisma?.item.findMany({ 
    include: {
      images: true,
      Transaction: {
        select: {
          status: true,
          startDate: true,
          endDate: true
        },
        where: {
          NOT: {
            status: 'COMPLETED'
          }
        }
      }
    }
  });

  const toolsWithAvailability = tools.map(tool => {
    const hasTransactions = tool.Transaction.length > 0;

    if (!hasTransactions) {
      return { ...tool, available: true };
    }
    const activeTransactionExists = hasTransactions && tool.Transaction.some(
      transaction => transaction.status !== 'ACTIVE'
    );
    return { ...tool, available: activeTransactionExists };
  });

  return NextResponse.json(toolsWithAvailability);
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



