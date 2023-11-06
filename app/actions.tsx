'use server'
import prisma from "@/lib/prisma"
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

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
    console.log(session.user)
    const newListing = await prisma.item.create({
        data: {
            name: data.get('name')?.toString() ?? '',
            description: data.get('description')?.toString() ?? '',
            price: Number(data.get('price')) ?? '',
            owner: {
                connect: { 'id': session.user.id },
            },
            location: {
                connect: { id: 'clohteox400046xiun7covlqg' },
            },
        },
    })
    if (newListing) {
        redirect('/profile')
    }
}