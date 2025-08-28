
import React from "react";
import Image from "next/image";
import { ananias } from "@/styles/fonts";

export default function BlogHero() {
  return (
    <header className="relative isolate w-full overflow-hidden" aria-labelledby="blog-hero-title">
      <div className="bg-[#4f8f8c]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 pt-10 sm:pt-12 md:pt-14 pb-2">
            <h1
              id="blog-hero-title"
              className={`${ananias.className} text-white tracking-[0.02em] text-[clamp(1.6rem,6vw,3.2rem)] text-center`}
            >
              WHAT AM I ON ABOUT
            </h1>
            <Image
              src="/icons/brain-fart.svg"
              alt=""
              aria-hidden="true"
              width={80}
              height={80}
              className="translate-y-1"
              priority={false}
            />
          </div>

          <p className="mx-auto max-w-5xl pb-8 text-center text-white/95 text-[clamp(.95rem,2.2vw,1.1rem)] font-semibold whitespace-nowrap mt-2">
            Design, learning, and biomimicry – a blog best served with sarcasm and the occasional brain fart.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 md:h-8 bg-gradient-to-b from-transparent to-white/30" />
    </header>
  );
}
