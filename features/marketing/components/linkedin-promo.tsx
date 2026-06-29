"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Megaphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const SCENES = [
  { id: "intro", duration: 5000 },
  { id: "problem", duration: 6000 },
  { id: "solution", duration: 5500 },
  { id: "assistant", duration: 7000 },
  { id: "leads", duration: 7000 },
  { id: "campaigns", duration: 7000 },
  { id: "stats", duration: 6000 },
  { id: "cta", duration: 8000 },
] as const;

const TOTAL_MS = SCENES.reduce((s, c) => s + c.duration, 0);

type SceneId = (typeof SCENES)[number]["id"];

const fade = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(6px)" },
};

export function LinkedInPromo() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const scene = SCENES[index];
  const sceneId = scene?.id ?? "intro";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % SCENES.length);
    }, scene.duration);
    return () => clearTimeout(timer);
  }, [index, scene.duration]);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = (Date.now() - start) % TOTAL_MS;
      setProgress((elapsed / TOTAL_MS) * 100);
    }, 50);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#050508]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[400px] w-[500px] rounded-full bg-indigo-600/15 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 z-20 h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-400"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scene counter — hide when screen recording */}
      <div className="absolute bottom-6 left-6 z-20 font-mono text-xs text-white/30">
        {index + 1}/{SCENES.length} · ~{Math.round(TOTAL_MS / 1000)}s loop
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-8 py-16">
        <AnimatePresence mode="wait">
          {sceneId === "intro" && (
            <motion.div
              key="intro"
              {...fade}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold shadow-2xl shadow-violet-500/30"
              >
                SP
              </motion.div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                SellPilot{" "}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              <p className="mt-4 text-xl text-white/50 sm:text-2xl">
                AI-Powered Sales Automation
              </p>
            </motion.div>
          )}

          {sceneId === "problem" && (
            <motion.div
              key="problem"
              {...fade}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-center"
            >
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-400/80">
                The problem
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
                Sales teams lose{" "}
                <span className="text-red-400">40%</span> of their time
              </h2>
              <p className="mt-6 text-lg text-white/45 sm:text-xl">
                Manual lead tracking. Scattered tools. Missed follow-ups.
                Revenue left on the table.
              </p>
            </motion.div>
          )}

          {sceneId === "solution" && (
            <motion.div
              key="solution"
              {...fade}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-violet-200">The solution</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight sm:text-6xl">
                One platform.
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  Intelligent automation.
                </span>
              </h2>
              <p className="mt-6 text-lg text-white/45">
                Qualify leads. Run campaigns. Close deals — powered by AI.
              </p>
            </motion.div>
          )}

          {sceneId === "assistant" && (
            <FeatureScene
              icon={Bot}
              label="AI Sales Assistant"
              title="Your 24/7 sales copilot"
              description="Ask about pipeline, draft outreach, forecast revenue — with live data from your workspace."
              mock={
                <div className="space-y-3 text-left text-sm">
                  <div className="ml-auto w-[85%] rounded-2xl bg-violet-600 px-4 py-2.5 text-white">
                    Show me hot leads in my pipeline
                  </div>
                  <div className="w-[90%] rounded-2xl bg-white/10 px-4 py-2.5 text-white/90">
                    <strong>3 hot leads</strong> scored 80+. Top: Sarah Chen at
                    TechCorp — $45K deal, qualified.
                  </div>
                </div>
              }
            />
          )}

          {sceneId === "leads" && (
            <FeatureScene
              icon={Users}
              label="Leads CRM"
              title="Smart lead scoring & pipeline"
              description="Filter, sort, and prioritize every opportunity. AI scores tell you who to call first."
              mock={
                <div className="space-y-2 text-left text-xs">
                  {[
                    ["Sarah Chen", "TechCorp", "92", "Qualified"],
                    ["Mike Torres", "DataSync", "87", "Proposal"],
                    ["Emily Park", "CloudNine", "81", "Contacted"],
                  ].map(([name, co, score, status]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                    >
                      <div>
                        <p className="font-medium text-white">{name}</p>
                        <p className="text-white/40">{co}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-400">
                          {score}
                        </span>
                        <span className="text-white/50">{status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
          )}

          {sceneId === "campaigns" && (
            <FeatureScene
              icon={Megaphone}
              label="Campaigns & Automation"
              title="Automate your entire funnel"
              description="Launch campaigns, track open rates, and build visual workflows — Lead → AI → Email → Close."
              mock={
                <div className="flex items-center justify-center gap-2 text-xs">
                  {[
                    { icon: Target, label: "Lead" },
                    { icon: Bot, label: "AI" },
                    { icon: Zap, label: "Email" },
                    { icon: TrendingUp, label: "Close" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1 rounded-lg bg-white/5 px-3 py-2">
                        <step.icon className="h-4 w-4 text-violet-400" />
                        <span className="text-white/60">{step.label}</span>
                      </div>
                      {i < 3 && (
                        <Workflow className="h-3 w-3 rotate-90 text-white/20 sm:rotate-0" />
                      )}
                    </div>
                  ))}
                </div>
              }
            />
          )}

          {sceneId === "stats" && (
            <motion.div
              key="stats"
              {...fade}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl text-center"
            >
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/40">
                Trusted by sales teams
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { value: "10,000+", label: "Sales teams" },
                  { value: "2.5M+", label: "Leads managed" },
                  { value: "340%", label: "Avg. ROI" },
                  { value: "4.9/5", label: "Rating" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <p className="text-3xl font-bold text-violet-400 sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-white/45">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {sceneId === "cta" && (
            <motion.div
              key="cta"
              {...fade}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold sm:text-6xl">
                Close more deals.
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  Starting today.
                </span>
              </h2>
              <p className="mt-6 text-lg text-white/45">
                14-day free trial · No credit card required
              </p>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-lg font-semibold shadow-xl shadow-violet-500/25"
              >
                sellpilot.ai
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <p className="mt-6 font-mono text-sm text-white/30">
                Built with Next.js · TypeScript · AI
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeatureScene({
  icon: Icon,
  label,
  title,
  description,
  mock,
}: {
  icon: typeof Bot;
  label: string;
  title: string;
  description: string;
  mock: React.ReactNode;
}) {
  return (
    <motion.div
      key={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2"
    >
      <div>
        <div className="mb-4 inline-flex items-center gap-2 text-sm text-violet-400">
          <Icon className="h-4 w-4" />
          {label}
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-white/45">{description}</p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
      >
        {mock}
      </motion.div>
    </motion.div>
  );
}
