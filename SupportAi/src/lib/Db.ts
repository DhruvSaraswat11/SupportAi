   import  mongoose  from "mongoose";

   const MONGO_URL = process.env.MONGO_URL ;
   if (!MONGO_URL) {
      throw new Error ( " MONGO_URL is not found " ) ;
   }

   let cache = global. mongoose
   if ( !cache ) {
      cache = global. mongoose = {
         conn : null ,
         promise : null 
      }

   }

   export const connectDb = async () => {
   if ( cache.conn ) {
      return cache.conn
   }
   if ( !cache.promise ) {
      cache.promise = mongoose.connect( MONGO_URL ).then( ( c ) => c.connection )
   }

   try {
      cache.conn = await cache.promise
   } catch (error) {
      
   console.error("DB Connection Error:", error);
   throw error;

   }
      return cache.conn
   }


//    ===========================
// NEXT.JS + MONGODB NOTES
// ===========================

// 1. EXPRESS VS NEXT.JS

// Express:
// - Ek entry file hoti hai (server.js/app.js).
// - Server start hote hi mongoose.connect() sirf 1 baar call hota hai.
// - Uske baad sab routes wahi connection use karte hain.

// Flow:
// Server Start
//     ↓
// MongoDB Connect (1 time)
//     ↓
// Routes use same connection


// Next.js:
// - Koi central server.js nahi hota.
// - Har API Route independently execute hoti hai.
// - Isliye har route me connectDb() call kiya jata hai.

// Flow:
// Request
//    ↓
// Route
//    ↓
// connectDb()


// ===================================

// 2. KYA HAR REQUEST PAR CONNECTION BANTA HAI?

// ❌ Nahi.

// Har request par sirf check hota hai.

// if (cache.conn) {
//     return cache.conn;
// }

// Agar connection pehle se bana hua hai:
// → Existing connection return ho jata hai.

// Agar connection nahi bana:
// → mongoose.connect() call hota hai.

// ===================================

// 3. global.mongoose KA PURPOSE

// global.mongoose current server ki memory me connection store karta hai.

// Purpose:
// - Same server me baar-baar connection banne se bachana.

// Example:

// Request 1
// ↓
// Connect MongoDB

// Request 2
// ↓
// Reuse Connection

// Request 3
// ↓
// Reuse Connection


// ===================================

// 4. KYA SERVER A KA CONNECTION SERVER B USE KAR SAKTA HAI?

// ❌ Nahi.

// Har server ki apni memory hoti hai.

// Server A
// Connection A

// Server B
// Connection B

// Server C
// Connection C

// Sab MongoDB se connect hote hain,
// lekin ek dusre ka connection share nahi karte.

// ===================================

// 5. NEW SERVER PAR KYA HOGA?

// Agar Vercel ne naya server start kiya:

// Server B
// ↓

// cache.conn = null

// ↓

// MongoDB Connect

// ↓

// Connection store

// Uske baad wahi connection reuse hoga.

// ===================================

// 6. cache.promise KYU USE KARTE HAIN?

// Suppose ek hi time par 100 requests aa gayi.

// Without cache.promise:

// Request 1 → Connect
// Request 2 → Connect
// Request 3 → Connect

// Bahut saare unnecessary connections ban sakte hain.

// With cache.promise:

// Request 1 → Connect Promise ban gayi

// Request 2 → Same Promise ka wait

// Request 3 → Same Promise ka wait

// Sirf ek hi connection create hota hai.

// ===================================

// 7. declare global

// declare global {
//     var mongoose: {
//         conn: Connection | null;
//         promise: Promise<Connection> | null;
//     };
// }

// Ye runtime me kuch create nahi karta.

// Ye sirf TypeScript ko batata hai ki:

// global.mongoose naam ki property exist karegi.

// ===================================

// 8. mongoose KYA HAI?

// var mongoose: {
//     conn: ...
//     promise: ...
// }

// Yahan:

// mongoose = variable

// : = type annotation

// {...} = object type

// Matlab:

// mongoose ek variable hai jiska type object hai.

// ===================================

// 9. export {}

// export {}

// Kuch export nahi karta.

// Sirf file ko Module banata hai.

// ===================================

// 10. .d.ts

// d = Declaration

// Purpose:
// Sirf TypeScript ko type information dena.

// Ye runtime me execute nahi hoti.

// ===================================

// 11. FINAL FLOW

// Request
//    ↓
// Route
//    ↓
// connectDb()
//    ↓
// Connection already exists?

// YES
// ↓
// Return Existing Connection

// NO
// ↓
// mongoose.connect()
// ↓
// Store in global.mongoose
// ↓
// Return Connection

// ===================================

// IMPORTANT RULES

// ✅ Same Server = Same Connection Reuse

// ✅ New Server = New MongoDB Connection

// ✅ global.mongoose sirf current server ki memory me hota hai.

// ❌ Server A aur Server B connection share nahi karte.

// ❌ Next.js har request par naya connection nahi banata, sirf check karta hai.