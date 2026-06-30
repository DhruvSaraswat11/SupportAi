import { Connection } from "mongoose";

// declare global ka actual matlab hai:
// "TypeScript, existing global object ke andar naye properties bhi hain, unhe bhi jaan lo."



// TypeScript me declare global ke through global variables ko augment (extend) karne ke liye var ka syntax hi support kiya gaya hai.


// mongoose
//    │
//    └── Variable

// :
//    │
//    └── Iska type

// {
//     conn: ...
//     promise: ...
// }
//    │
//    └── Object type 
// | mtlb mongoose ek vAriAble h jiskA type h object or uski shApe esi 

// globAl  ke Age {} -> ye bs ek block h jo ki btega ki mongoose name ki property bhi Age exist kregi 

declare global {
    var mongoose : {
      conn : Connection | null ,
      promise : Promise<Connection> | null
   }
} 


export {} // is file ko module bnA do

// export {}
//       │
//       └── "Kuch export nahi kar raha,
//           bas TypeScript ko bol raha hoon
//           ki ye file ek module hai ."