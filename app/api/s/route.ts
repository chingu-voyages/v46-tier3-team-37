import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
      const searchParams = request.nextUrl.searchParams;
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");
      
      if (startDate && endDate) {
        const tools = await prisma.item.findMany({
          where: {
            OR: [
              {
                Transaction: {
                  some: {
                    AND: [
                      {
                        OR: [
                          { NOT: { status: "ACTIVE" } },
                          { NOT: { status: "OPEN" } },
                          { NOT: { status: "HOLD" } },
                        ],
                      },
                      {
                        NOT: {
                          AND: [
                            {
                              startDate: { lte: new Date(endDate) },
                            },
                            {
                              endDate: { gte: new Date(startDate) },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
              {
                Transaction: {
                  none: {},
                },
              },
            ],
          },
          include: { images: true },
        });

        return NextResponse.json(tools);
      }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
