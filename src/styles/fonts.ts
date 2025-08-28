
// src/styles/fonts.ts
import localFont from "next/font/local";

export const ananias = localFont({
  src: [
    { path: "../../public/fonts/ananias.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-ananias",
  display: "swap",
});
