"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Megaphone,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "AI Sales Assistant",
    description:
      "Get intelligent recommendations, draft emails, and analyze your pipeline with conversational AI.",
  },
  {
    icon: Users,
    title: "Smart Lead Management",
    description:
      "Score, prioritize, and nurture leads automatically with AI-driven insights.",
  },
  {
    icon: Megaphone,
    title: "Campaign Optimization",
    description:
      "Launch and optimize multi-channel campaigns with real-time performance analytics.",
  },
  {
    icon: Workflow,
    title: "Sales Automation",
    description:
      "Build visual workflows that automate follow-ups, task creation, and CRM updates.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track revenue, conversion rates, and pipeline health with beautiful dashboards.",
  },
  {
    icon: Target,
    title: "Account-Based Selling",
    description:
      "Target high-value accounts with personalized outreach sequences.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to scale sales
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful tools designed for modern sales teams who want to work
            smarter, not harder.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
