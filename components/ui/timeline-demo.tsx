import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineSection() {
  const data = [
    {
      title: "2018 - Founding",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            FarmDigits was founded by a passionate team of technologists and
            agricultural experts with a shared vision: to revolutionize farming
            through smart, accessible technology.
          </p>
          {/* Placeholder images for Our Story context */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://img.freepik.com/premium-vector/continuous-one-line-drawing-happy-programmer-pointing-coding-laptop-programming-code-concept-single-line-draw-design-vector-graphic-illustration_612079-1530.jpg" // Using existing team image as placeholder
              alt="Sarah Johnson"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/017/210/784/non_2x/single-one-line-drawing-man-carrying-laptop-for-coding-programming-code-concept-continuous-line-draw-design-graphic-illustration-vector.jpg" // Using existing team image as placeholder
              alt="Michael Chen"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Growth & Expansion",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            What started as a simple crop management tool quickly evolved into a
            robust platform, empowering thousands of farmers to streamline
            operations, boost productivity, and make data-driven decisions.
          </p>
          {/* Placeholder images for Our Story context */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://t4.ftcdn.net/jpg/08/76/19/49/360_F_876194952_11gwXzOBACtHCCBVbkQuq76Zk9udnAnz.jpg" // Using existing team image as placeholder
              alt="Elena Rodriguez"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://img.freepik.com/premium-vector/entertainer-elegant-talking-man-holding-microphone-continuous-line-drawing_676691-168.jpg" // Using existing team image as placeholder
              alt="David Kim"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Present - Innovation",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Today, FarmDigits leads the way in agri-tech innovation, integrating
            cutting-edge solutions like IoT, AI, and advanced analytics. We
            remain committed to helping farmers thrive in a rapidly changing
            world.
          </p>
          {/* Placeholder for future content/images related to innovation */}
          <div className="grid grid-cols-1 gap-4">
            <img
              src="destination.png" // Generic farm image
              alt="Modern Farm"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip py-20">
      {/* Added title */}
      <Timeline data={data} />
    </div>
  );
}
