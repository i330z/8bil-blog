// app/admin/[[...slug]]/page.tsx
"use client"
import { TinaAdmin } from "tinacms";
import config from "../../../../tina/config";

export default function AdminPage() {
  return <TinaAdmin config={config} />;
}