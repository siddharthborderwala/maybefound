import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.local" });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });
