
// src/styles/fonts.ts
import localFont from "next/font/local";

export const ananias = localFont({
  src: [
    { path: "../../public/fonts/Ananias.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Ananias Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-ananias",
  display: "swap",
});
