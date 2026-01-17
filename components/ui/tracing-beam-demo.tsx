"use client";
import React from "react";

import { TracingBeam } from "@/components/ui/tracing-beam";
import FeatureImg from "../FeatureImg";
// import { CheckCircleIcon } from 'lucide-react'; // Assuming lucide-react for icons, but using SVG directly for simplicity now

export default function TracingBeamDemo() {
  return (
    <TracingBeam>
      <FeatureImg
        heading="Farm Overview Dashboard"
        subtext="Track real-time metrics like livestock counts, milk production, and financial performance in one centralized view."
        features={[
          "Actionable Alerts: Spot anomalies (e.g., dropped production) and act fast.",
          "Instant Insights: Visualize trends with charts for milk yields, revenue vs. expenses, and growth rates.",
          "Time-Saving: No more manual data juggling—get automated updates daily.",
        ]}
        image="/overview.png"
        imageAlt="Dashboard View"
        icon={
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
        }
      />
      <FeatureImg
        heading="Livestock Health Monitoring"
        subtext="Monitor animal health and activity with automated alerts and historical data."
        features={[
          "Early Warning: Get notified of abnormal behavior or health issues.",
          "Detailed Records: Access health logs and treatment history for every animal.",
          "Productivity Boost: Optimize feeding and care routines for better yields.",
        ]}
        image="/healthmonitoring.png"
        imageAlt="Livestock Health"
        icon={
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h8M12 8v8"
            />
          </svg>
        }
      />
      <FeatureImg
        heading="Automated Financial Reports"
        subtext="Generate and export financial summaries, expense breakdowns, and profit analysis."
        features={[
          "One-Click Reports: Instantly create income and expense statements.",
          "Export Options: Download reports as PDF or Excel.",
          "Smart Suggestions: Identify cost-saving opportunities automatically.",
        ]}
        image="/financial-reports.png"
        imageAlt="Financial Reports"
        icon={
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 2v4M8 2v4M3 10h18"
            />
          </svg>
        }
      />
    </TracingBeam>
  );
}

// Note: dummyContent array and mapping logic were removed in previous edits.
// If you need dynamic content based on data, you would re-introduce that structure.
