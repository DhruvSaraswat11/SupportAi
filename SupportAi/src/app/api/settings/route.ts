import { connectDb } from "@/lib/Db";
import usermodel from "@/model/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req:NextRequest ) {
    try {
        const { ownerId , businessName , supportEmail , knowledge} = await req.json() ;
        if ( !ownerId ) {
            return NextResponse.json ( {
                message : "ownerId is required" ,
            } , { status : 400 } )
        }
        await connectDb() ;
        const settings = await usermodel.findOneAndUpdate( 
//             upsert: true → Agar ownerId ka document nahi mila to naya document create kar dega.
// new: true → Chahe update hua ho ya naya create hua ho, latest document return karega.
            { ownerId  } , {  ownerId , businessName , supportEmail ,  knowledge } , { new : true , upsert : true } )

return NextResponse.json ( settings )

    } catch ( e ) {
        console.log( "Server Error" , e )
         return NextResponse.json ( {
                message : ` settings error ${ e } ` ,
            } , { status : 500 } )
    }
    
}



