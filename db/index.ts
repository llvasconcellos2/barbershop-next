import dotenv from "dotenv";
//import { drizzle } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/node-postgres";
// import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

// export const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: false }), {
//   schema,
// });

export const db = drizzle(process.env.DATABASE_URL!, { schema });
