import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL ?? "");

export async function now() {
  const result = await sql`SELECT NOW()`;
  console.log(result);
}
