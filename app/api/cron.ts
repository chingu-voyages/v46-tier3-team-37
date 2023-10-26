import { NextRequest, NextResponse } from "next/server";

export default async function handler(request: NextRequest, ) {
    if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_secret}`){
        NextResponse.json({
            data: 'Unauthorized'
        },{
            status: 401
        }
        )
    }

    const updated = await prisma!.$executeRaw`CALL update_transaction_status();`
    console.log(updated);
    return NextResponse.json({
        success: true
    })
    
}