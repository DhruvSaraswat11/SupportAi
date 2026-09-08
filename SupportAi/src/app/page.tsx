import getSession from "@/lib/getSession";
import HomeClient from "../components/HomeClient";

export default async function Home() {
 const session = await getSession()  
  return (
   <>
    <HomeClient email = { session?.user?.email  } />
   </>
  );
}
