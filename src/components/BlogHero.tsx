
import React from "react";
import { ananias } from "@/styles/fonts";

export default function BlogHero(){
  return (
    <header className="relative isolate w-full overflow-hidden" aria-labelledby="blog-hero-title">
      <div className="bg-[#4f8f8c]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 py-10 sm:py-12 md:py-14">
            {/* main title */}
            <h1
              id="blog-hero-title"
              className={[
                ananias.className,
                "text-white tracking-[0.02em]",
                "text-[clamp(1.6rem,6vw,3.2rem)]",
                "text-center"
              ].join(" ")}
            >
              WHAT AM I ON ABOUT
            </h1>
            {/* brain icon (decorative) */}
            <img
              src="/icons/Brain_Fart.svg"
              alt=""
              aria-hidden="true"
              className="h-[clamp(1.8rem,6vw,3rem)] w-auto translate-y-1"
              loading="lazy"
              decoding="async"
            />
          </div>

          <p className="mx-auto max-w-3xl pb-8 text-center text-white/95 text-[clamp(.95rem,2.2vw,1.1rem)] font-semibold">
            Design, learning, and biomimicry – a blog best served with sarcasm and the occasional brain fart.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 md:h-8 bg-gradient-to-b from-transparent to-white/70" />
    </header>
  );
}
