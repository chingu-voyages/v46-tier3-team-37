'use server'
import prisma from "@/lib/prisma"

export async function getFeaturedTools() {
try {
    const tools = await prisma?.item.findMany({
        take: 10,
        include: {images: true} 
    });
    return tools;

} catch(e: any) {
    throw new Error(e)
}    
}

export async function getAllToolsWithImages() {
    try {
        const tools = await prisma.item.findMany({
            include: { images: true}
        })
        return tools;
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function activeUserListings(id: string) {
  const today = new Date().toISOString();
    const rentedListings = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          items: {
            where: {
              AND: [
                {
                  ownerId: id,
                },
                {
                  Transaction: {
                    every: {
                      AND: [
                        {
                          NOT: { status: "COMPLETED" },
                        },
                        {
                          OR: [
                            {
                              startDate: { lte: today },
                              endDate: { gte: today },
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
            },
            include: {
              images: true
            }
          },
        }
      });
      if(!rentedListings) return null
      return rentedListings;
}