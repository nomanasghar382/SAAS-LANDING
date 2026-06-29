"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does the 14-day free trial work?",
    a: "Start with full access to all Professional features. No credit card required. At the end of your trial, choose a plan or your account pauses — no surprise charges.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade anytime from Settings → Billing. Changes take effect immediately and we prorate the difference.",
  },
  {
    q: "What integrations are supported?",
    a: "SellPilot connects with Shopify, Stripe, Slack, Google Analytics, and HubSpot out of the box. Enterprise plans include custom integrations via API.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit and at rest. We're SOC 2 Type II compliant and never sell your data. See our Privacy Policy for details.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes — save 20% with annual billing on Starter and Professional plans. Toggle annual pricing on this page.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about SellPilot AI.
          </p>
        </div>

        <div className="mt-12 space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border bg-card ds-transition hover:border-primary/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground ds-transition",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
