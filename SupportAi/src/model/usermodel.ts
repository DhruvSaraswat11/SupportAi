import mongoose from "mongoose";


// ✅ Express + nodemon → Process restart → mongoose.models delete ho jata hai.
// ✅ Next.js dev → Process restart nahi hota → mongoose.models memory me rehta hai.

interface Isettings {
    ownerId : string 
    businessName : string
    supportEmail : string 
    knowledge : string
}
const userSchema = new mongoose.Schema < Isettings > ( {
ownerId : {
    type : String , 
    required : true ,
    unique : true
} ,
businessName : {
    type : String 
} ,
 supportEmail : {
    type : String  
} ,
 knowledge : {
    type : String 
}

} , { timestamps : true } )

const usermodel = mongoose. models . User || mongoose. model ( "User" , userSchema ) ;
export default usermodel 









// Express vs Next.js MongoDB Connection Summary

// 1. Express
// - Ek entry point hota hai (server.js / app.js).
// - Server start hote hi connectDB() sirf ek baar call hota hai.
// - Uske baad saari requests wahi existing MongoDB connection use karti hain.
// - Isliye har route me connectDB() call karne ki zarurat nahi padti.

// Flow:
// Server Start
//     │
// connectDB()
//     │
// MongoDB Connected
//     │
// All Routes Reuse Same Connection

// --------------------------------------------------

// 2. Next.js (App Router)

// - Koi central server.js nahi hota jahan startup par connectDB() call kar saken.
// - Har API Route, Server Action, ya Server Component independently execute ho sakta hai.
// - Isliye jahan bhi MongoDB use karni ho, wahan connectDB() call karna padta hai.

// Example:

// // app/api/users/route.ts
// await connectDB();

// // app/api/login/route.ts
// await connectDB();

// --------------------------------------------------

// 3. connectDB() har baar naya connection nahi banata.

// connectDB() ke andar check hota hai:

// if (mongoose.connection.readyState === 1) {
//     return;
// }

// Agar connection pehle se bana hua hai:
// ✔ connectDB() turant return kar deta hai.

// Agar connection nahi bana:
// ✔ mongoose.connect() call hota hai.

// --------------------------------------------------

// 4. Home page me connectDB() call karna enough nahi hai.

// Reason:
// - User directly /api/login hit kar sakta hai.
// - Home page execute hi nahi hoga.
// - Isliye har server-side entry point ko khud ensure karna padta hai ki DB connected hai.

// --------------------------------------------------

// 5. Memory kiski hoti hai?

// Node.js process ki RAM.

// Us RAM me Mongoose store karta hai:
// - mongoose.connection
// - mongoose.models

// Express restart:
// Node Process Restart
// → Memory Clear
// → Fresh Connection

// Next.js Dev (Hot Reload):
// Node Process same rehta hai.
// Memory rehti hai.
// Isliye existing connection aur existing models reuse kiye ja sakte hain.

// --------------------------------------------------

// 6. Mongoose Model

// const User =
//   mongoose.models.User ||
//   mongoose.model("User", userSchema);

// Reason:
// - Agar User model pehle se bana hua hai to usi ko use karo.
// - Nahi bana to naya model create karo.
// - Isse OverwriteModelError nahi aata.