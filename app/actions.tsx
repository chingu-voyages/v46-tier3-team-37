import { Tool } from "@/types/schemaTypes";
import prisma from "@/lib/prisma"

export async function getFeaturedTools() {
try {
    const tools: Tool[] = await prisma?.item.findMany({ take: 10 });
    return tools;

} catch(e: any) {
    throw new Error(e)
}    
}

