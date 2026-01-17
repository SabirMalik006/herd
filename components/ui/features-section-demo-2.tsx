import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import {
  IconTractor,
  IconClick,
  IconReceipt2,
  IconCloudCheck,
  IconHome2,
  IconHeadset,
  IconShieldCheck,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Made for Modern Farmers",
      description:
        "Built for growers, ranchers, and agri-entrepreneurs who want more control and better yields.",
      icon: <IconTractor />,
    },
    {
      title: "Simple to Use",
      description:
        "Intuitive tools designed for all experience levels. No tech skills required — just tap and go.",
      icon: <IconClick />,
    },
    {
      title: "Transparent Pricing",
      description:
        "No hidden fees. Pay only for what you use. Try it free — no credit card required.",
      icon: <IconReceipt2 />,
    },
    {
      title: "Always Available",
      description:
        "24/7 cloud access from any device. Rain or shine, your data's always safe and synced.",
      icon: <IconCloudCheck />,
    },
    {
      title: "Multi-Farm Management",
      description:
        "Manage multiple plots, livestock units, and farm assets under one roof.",
      icon: <IconHome2 />,
    },
    {
      title: "Dedicated Support",
      description:
        "Need help? Our support team (real humans!) is available around the clock.",
      icon: <IconHeadset />,
    },
    {
      title: "Risk-Free Trial",
      description:
        "Try it out risk-free. If it's not the right fit, we offer a full money-back guarantee.",
      icon: <IconShieldCheck />,
    },
    {
      title: "All-in-One Solution",
      description:
        "From planning and planting to harvesting and selling — everything you need, in one dashboard.",
      icon: <IconLayoutDashboard />,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 0.9 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center text-center  mx-auto md:max-w-2xl space-y-5">
          <span className="rounded-lg bg-[#D4EDDA] dark:bg-gray-900 px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-[#39ac63] dark:text-[#39ac63]">
            Features
          </span>
          <h1 className="text-3xl font-semibold text-black dark:text-gray-200 md:text-4xl xl:text-5xl leading-tight">
            What makes our farm management system stand out
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
            Designed to simplify your workload and maximize productivity —
            whether you're managing crops, livestock, or both.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#39ac63] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 group-hover/feature:text-[#39ac63] dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
