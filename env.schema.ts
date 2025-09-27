import { z } from "zod/v4";

export const envSchema = z
  .object({
    BETTER_AUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string(),
  })
  .describe("Environment variables");

type EnvSchema = z.infer<typeof envSchema>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvSchema {}
  }
}
