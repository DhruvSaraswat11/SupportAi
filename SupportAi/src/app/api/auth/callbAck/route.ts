import { scalekit } from "@/lib/scAlekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req:NextRequest) {
    const { searchParams } = new URL ( req.url )
    const code = searchParams.get("code")
    const redirectUri =  `${process.env.NEXT_PUBLIC_URL}/api/auth/callbAck`
    if ( !code ) {
        return NextResponse.json ({
            messAge : " code is not found " ,
        } , { status : 400 } )
    }
    const session = await scalekit. authenticateWithCode( code ,redirectUri )
    // console. log ( session.user ) 
    const response = NextResponse.redirect( `${process.env.NEXT_PUBLIC_URL}` )
    response.cookies.set("AccessToken" , session. accessToken , {
        httpOnly : true ,
        maxAge : 24*60*60*1000 , 
        secure : false ,
        path : "/"
    } )
    return response ;
}