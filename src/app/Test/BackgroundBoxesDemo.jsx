
"use client";
import { Boxes } from "@/components/ui/background-boxes";
import React from "react";


export function BackgroundBoxesDemo() {
  return (
    <div
      className="h-screen w-full relative overflow-hidden bg-slate-900 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"
      />
      <Boxes />
    </div>
  );
}
