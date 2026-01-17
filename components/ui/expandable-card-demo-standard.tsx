"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="overflow-y-scroll">
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400  [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="w-full md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: "Crop Management",
    description:
      "Track and optimize your crop production cycle from planting to harvest.",
    src: "https://cdn.pixabay.com/photo/2017/10/29/15/58/trees-2900064_960_720.jpg",
    ctaText: "View",
    ctaLink: "https://outscalers.com/",
    content: () => {
      return (
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Planting schedule and reminders
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Growth tracking and monitoring
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Treatment and fertilization logs
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Harvest planning and yield forecast
          </li>
        </ul>
      );
    },
  },
  {
    title: "Livestock Tracking",
    description:
      "Monitor your livestock health, breeding, and production data in real-time.",
    src: "https://cdn.pixabay.com/photo/2018/05/08/18/40/cow-3383624_960_720.jpg",
    ctaText: "View",
    ctaLink: "https://outscalers.com/",
    content: () => {
      return (
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Individual animal records
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Health monitoring and alerts
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Breeding and genealogy tracking
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Production and performance metrics
          </li>
        </ul>
      );
    },
  },
  {
    title: "Equipment Management",
    description:
      "Keep track of your farm equipment usage, maintenance, and efficiency.",
    src: "https://cdn.pixabay.com/photo/2023/03/31/14/52/rice-field-7890204_960_720.jpg",
    ctaText: "View",
    ctaLink: "https://outscalers.com/",
    content: () => {
      return (
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Maintenance scheduling
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Usage tracking and history
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Fuel consumption monitoring
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Repair logs and cost tracking
          </li>
        </ul>
      );
    },
  },
  {
    title: "Soil Analysis & Fertility Mgt",
    description:
      "Understand your soil health and optimize nutrient management for better yields.",
    src: "https://cdn.pixabay.com/photo/2016/11/18/16/25/farm-1835706_960_720.jpg",
    ctaText: "View",
    ctaLink: "https://outscalers.com/",
    content: () => {
      return (
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Soil sample tracking
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Nutrient level analysis
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Fertilization recommendations
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Historical data trends
          </li>
        </ul>
      );
    },
  },
  {
    title: "Weather Monitoring & Forecasting",
    description:
      "Get real-time weather data and forecasts to make informed decisions.",
    src: "https://cdn.pixabay.com/photo/2016/11/18/16/25/farm-1835706_960_720.jpg",
    ctaText: "View",
    ctaLink: "https://outscalers.com/",
    content: () => {
      return (
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Local weather conditions
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Short and long-term forecasts
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Alerts for extreme weather
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Historical weather data
          </li>
        </ul>
      );
    },
  },
  {
    title: "Financial Management",
    description:
      "Simplify your farm finances with tools for budgeting and expense tracking.",
    src: "https://cdn.pixabay.com/photo/2016/11/18/16/25/farm-1835706_960_720.jpg",
    ctaText: "View",
    ctaLink: "https://outscalers.com/",
    content: () => {
      return (
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Income and expense tracking
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Budget creation and monitoring
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Financial reporting
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Integration with accounting tools
          </li>
        </ul>
      );
    },
  },
  {
    title: "Inventory Management",
    description:
      "Efficiently manage your farm supplies, seeds, and harvested produce.",
    src: "https://cdn.pixabay.com/photo/2016/11/18/16/25/farm-1835706_960_720.jpg",
    ctaText: "View",
    ctaLink: "https://outscalers.com/",
    content: () => {
      return (
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Seed and supply tracking
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Harvested produce inventory
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Low stock alerts
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-2 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            Inventory valuation
          </li>
        </ul>
      );
    },
  },
];
