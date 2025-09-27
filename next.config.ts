import type { NextConfig } from "next";
import { prettifyError } from "zod/v4";
import { envSchema } from "./env.schema";

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    "Error validating environment variables\n",
    prettifyError(result.error),
  );
  process.exit(1);
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
