import { NextRequest, NextResponse } from "next/server";
import { getUserListings } from "@/app/actions";

export async function GET(
  req: NextRequest
) {
  try {
   
    const listings = await getUserListings();
    if (!listings) {
        throw new Error ()
    }
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error });
  }
}


//Waiting on next auth issue #28 to be completed before implementing protected user routes