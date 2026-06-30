import { cookies } from "next/headers";
import {  NextResponse } from "next/server";

export async function GET() {
const  cookie = await cookies()  
  cookie. delete( "AccessToken" )
  return NextResponse. json ( {
    messAge : " logout successful "
  } )
} 
