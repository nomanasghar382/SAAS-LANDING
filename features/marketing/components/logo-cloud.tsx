"use client";

import { motion } from "framer-motion";

const companies = [
  "TechFlow",
  "GrowthLabs",
  "ScaleUp",
  "DataSync",
  "CloudNine",
  "RevOps",
  "PipelineHQ",
  "SalesForge",
];

export function LogoCloud() {
  return (
    <section className="border-y bg-muted/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Trusted by high-performing sales teams worldwide
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {companies.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="flex items-center justify-center"
            >
              <span className="text-sm font-semibold tracking-tight text-muted-foreground/60 ds-transition hover:text-muted-foreground">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
