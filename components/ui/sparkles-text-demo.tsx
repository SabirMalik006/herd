"use client";

import { SparklesText } from "@/components/ui/sparkles-text";

export function SparklesTextSection() {
  return (
    <div className="container">
      <div className="grid grid-cols-1">
        <div className="flex flex-col items-center justify-center py-10 max-w-2xl text-black dark:text-white">
          <SparklesText
            text="Under the Hood: Powerful Features Working Seamlessly for You"
            colors={{ first: "#39ac63", second: "#2d8659" }}
            className="md:text-6xl text-3xl"
          />
        </div>
      </div>
    </div>
  );
}
