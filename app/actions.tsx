'use server'
import prisma from "@/lib/prisma"
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export async function getAllToolsData() {
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
    
      return toolsWithAvailability;
}

export async function getToolById(id: string) {
    try {
        const tool = await prisma.item.findUnique({
          where: {
            id,
          },
          include: {
            images: true,
            Transaction: {
              select: {
                startDate: true,
                endDate: true,
              },
              where: {
                NOT: {
                  status: 'COMPLETED',
                },
              },
            },
          },
        })
    
        if (tool) return tool
      } catch (error) {
        console.log(error);
      }
}

export async function getFeaturedTools() {
    try {
        const tools = await prisma?.item.findMany({
            take: 10,
            include: { images: true }
        });
        return tools;

    } catch (e: any) {
        throw new Error(e)
    }
}

export async function getAllToolsWithImages() {
    try {
        const tools = await prisma.item.findMany({
            include: { images: true }
        })
        return tools;
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function getUserListings() {
try {

    const session = await getServerSession(options);
    if (!session) {
        redirect('/login')
    }
    const listings = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }, select: {
            items: {
                include: { images: true, Transaction: true },
                where: {
                    ownerId: session.user.id
                },
            }
        },
    })
    if (!listings) {
        throw new Error('no listings found')
    }
    return listings;
} catch (error: any) {
    console.log({message: error})
    return null
}
}

export async function getUserRentals() {
    const session = await getServerSession(options);
    if(!session) redirect('/login');
    const rentals = await prisma.transaction.findMany({
        where: {
            AND: [
                { renterId: session.user.id },
                { NOT: { status: 'HOLD'}}
            ]

        }, include: {
            item: {'include': {images: true}}
        }
    })
    if (!rentals) {
        throw new Error('no Listings found');
    }
    return rentals;
}

export async function createListing(data: FormData) {
    const session = await getServerSession(options);
    if (!session) {
        redirect('/login')
    }
    const newListing = await prisma.item.create({
        data: {
            name: data.get('name')?.toString() ?? '',
            description: data.get('description')?.toString() ?? '',
            price: Number(data.get('price')) ?? '',
            owner: {
                connect: { 'id': session.user.id },
            },
            location: {
                connect: { id: 'clotd6f5z00046x1oi1omty5y' },
            },
        },
    })
    if (newListing) {
        redirect('/profile')
    }
}

export default async function getRenterById(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            username: true,
            email: true,
            id: true
        }
    })
    return user;
}