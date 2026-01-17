"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Farm Management
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/overview.png`}
          alt="FarmDigits Dashboard Overview"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top shadow-2xl border border-white/20"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
