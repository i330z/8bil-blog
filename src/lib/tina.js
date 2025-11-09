// lib/tina.ts
import { createClient } from "tinacms/dist/client";
import { queries } from "../../tina/__generated__/types";

const client = createClient({
  url: process.env.NEXT_PUBLIC_TINA_URL || "http://localhost:4001/graphql",
  token: process.env.TINA_TOKEN, // only needed for local dev writes
  credentials: "include",
});

export const tinaSdk = queries(client);