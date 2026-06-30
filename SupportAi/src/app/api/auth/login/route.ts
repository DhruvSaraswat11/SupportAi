import { scalekit } from "@/lib/scAlekit";
import {  NextResponse } from "next/server";

export async function GET() {
   const redirectUri =  `${process.env.NEXT_PUBLIC_URL}/api/auth/callbAck`
const authorizationUrl = scalekit.getAuthorizationUrl(redirectUri, {
  scopes: ["openid", "profile", "email", "offline_access"],
  prompt: "login",
}); 
  // console.log( authorizationUrl )
  return NextResponse.redirect( authorizationUrl ) ;
}