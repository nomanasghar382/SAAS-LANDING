"use client";

import { motion } from "framer-motion";
import { Bot, TrendingUp, Users } from "lucide-react";

const floatingCards = [
  {
    icon: TrendingUp,
    label: "Revenue",
    value: "$124K",
    className: "left-[8%] top-[18%] -rotate-6",
    delay: 0,
  },
  {
    icon: Users,
    label: "Active Leads",
    value: "1,284",
    className: "right-[10%] top-[28%] rotate-3",
    delay: 0.15,
  },
  {
    icon: Bot,
    label: "AI Score",
    value: "98%",
    className: "left-[15%] bottom-[22%] rotate-2",
    delay: 0.3,
  },
];

export function HeroFallback() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-4xl sm:h-[480px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute right-[20%] top-[30%] h-[150px] w-[150px] rounded-full bg-purple-500/15 blur-[80px]" />
      </div>

      {/* Dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 w-[85%] max-w-lg -translate-x-1/2 -translate-y-1/2"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-indigo-950/90 p-1 shadow-2xl shadow-primary/10 backdrop-blur-xl">
          <div className="rounded-xl bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex gap-3">
              <div className="w-16 space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded ${i === 1 ? "bg-primary" : "bg-white/10"}`}
                  />
                ))}
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 rounded-lg bg-white/5 backdrop-blur-sm"
                    />
                  ))}
                </div>
                <div className="flex h-24 items-end gap-1.5 rounded-lg bg-white/5 p-2">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                      className="flex-1 rounded-sm bg-gradient-to-t from-primary to-purple-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating glass cards */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + card.delay, duration: 0.5 }}
          className={`absolute ${card.className}`}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4 + card.delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <card.icon className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] text-white/60">{card.label}</p>
                <p className="text-sm font-semibold text-white">{card.value}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* AI hologram indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute right-[18%] top-[15%]"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative"
        >
          <div className="h-14 w-14 rounded-full border border-primary/40 bg-primary/20 backdrop-blur-sm" />
          <div className="absolute inset-2 rounded-full bg-primary/40 blur-sm" />
          <Bot className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}
