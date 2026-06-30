import getSession from "@/lib/getSession";
import HomeClient from "../components/HomeClient";

export default async function Home() {
 const session = await getSession()  
  // console.log( session ) 
  return (
   <>
    <HomeClient email = { session?.user?.email  } />
   </>
  );
}