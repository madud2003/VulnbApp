// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });
// console.log("Loaded ENV from:", process.cwd());
// console.log("dotenv result:", dotenv.config({ path: ".env.local" }));

// const MONGODB_URI = process.env.MONGODB_URI as string;
// console.log("MONGODB_URI =", process.env.MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads in development.
//  */
// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

// src/lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "VulnbApp",
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
