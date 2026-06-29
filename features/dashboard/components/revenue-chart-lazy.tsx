"use client";

import dynamic from "next/dynamic";
import { ChartSkeleton } from "./chart-skeleton";
import type { RevenueChartProps } from "./revenue-chart";

const RevenueChart = dynamic(
  () =>
    import("./revenue-chart").then((mod) => ({ default: mod.RevenueChart })),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
);

export function RevenueChartLazy(props: RevenueChartProps) {
  return <RevenueChart {...props} />;
}
