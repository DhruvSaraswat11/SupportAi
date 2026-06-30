import { cookies } from "next/headers"
import { scalekit } from "./scAlekit"
// import { scalekit } from "../lib/scAlekit"

interface UserResult {
  scopes: string[];
  roles: string[];
  sub: string;
  oid: string;
  exp: number;
}

const getSession = async () => {
    const cookie = await cookies() 
   const token = cookie.get( "AccessToken" )?.value
   if ( !token ) return null ;
  try {
    // console.log( token ) 
    const userResult : UserResult = await scalekit.validateToken( token )
    const userdetAilsId = userResult.sub
    const user = await scalekit.user.getUser( userdetAilsId )
    return user 
  } catch (error) {
    console. log( error ) 
  }
}

export default getSession
