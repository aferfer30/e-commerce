"use client";

import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

interface AnalyticsChartProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  // placeholder for future chart data
  // chartData?: any;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <motion.div
      className="glass p-4 rounded-xl shadow-lg flex items-center space-x-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-3xl text-primary">{icon ?? <BarChart2 />}</div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </motion.div>
  );
};
