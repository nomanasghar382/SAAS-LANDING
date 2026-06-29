"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthly: 29,
    description: "For individuals and small teams getting started",
    features: [
      "Up to 500 leads",
      "AI assistant (100 credits/mo)",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Professional",
    monthly: 79,
    description: "For growing sales teams that need more power",
    features: [
      "Up to 5,000 leads",
      "AI assistant (1,000 credits/mo)",
      "Advanced analytics",
      "Campaign automation",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    description: "For large organizations with custom needs",
    features: [
      "Unlimited leads",
      "Unlimited AI credits",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

export function PricingPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm ds-transition",
            !annual ? "font-medium text-foreground" : "text-muted-foreground"
          )}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
          onClick={() => setAnnual(!annual)}
          className={cn(
            "relative h-6 w-11 rounded-full ds-transition",
            annual ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm ds-transition",
              annual && "translate-x-5"
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm ds-transition",
            annual ? "font-medium text-foreground" : "text-muted-foreground"
          )}
        >
          Annual
          <span className="ml-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Save 20%
          </span>
        </span>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => {
          const price =
            plan.monthly === null
              ? "Custom"
              : annual
                ? `$${Math.round(plan.monthly * 0.8)}`
                : `$${plan.monthly}`;

          return (
            <Card
              key={plan.name}
              className={cn(
                "ds-transition",
                plan.popular && "border-primary shadow-lg ring-1 ring-primary/20"
              )}
            >
              <CardHeader>
                {plan.popular && (
                  <span className="mb-2 w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{price}</span>
                  {plan.monthly !== null && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={ROUTES.signup}>
                    {plan.monthly === null ? "Contact sales" : "Start free trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
