import { connectDb } from "@/lib/Db";
import usermodel from "@/model/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { ownerId } = await req.json()
        if (!ownerId) {
            return NextResponse.json({
                message: "ownerId is required",
            }, { status: 400 })
        }
        await connectDb();
        const setting = await usermodel.findOne({ ownerId })
        return NextResponse. json ( setting )
    } catch (e) {
        return NextResponse.json({
            message: ` get setting error ${e} `,
        }, { status: 500 })
    }
}