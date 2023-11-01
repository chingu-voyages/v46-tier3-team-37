import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Item } from "@/types/schemaTypes";
import { activeUserListings, getAllToolsWithImages, getFeaturedTools } from "@/app/actions";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);
  try {
    if (!session?.user.id) {
      return NextResponse.redirect("/login");
    }
    const rentedListings = await activeUserListings(session.user.id);
   
    if (rentedListings) {
        return NextResponse.json(rentedListings)
    }
    throw new Error('no Users Found');
  } catch (e) {
    return NextResponse.json(
        e,
        {
            status: 500
        }
    )
  }
}
