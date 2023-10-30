import { ItemWithImages, Tool } from "@/types/schemaTypes";
import prisma from "@/lib/prisma"

export async function getFeaturedTools() {
try {
    const tools = await prisma?.item.findMany({ take: 10 });
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