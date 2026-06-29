"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Bot,
  CheckCircle2,
  Mail,
  Play,
  UserPlus,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { defaultWorkflow } from "@/constants/mock-data";
import type { WorkflowNode, WorkflowNodeType } from "@/types";

const nodeConfig: Record<
  WorkflowNodeType,
  { icon: typeof UserPlus; color: string; bg: string }
> = {
  trigger: { icon: UserPlus, color: "text-blue-600", bg: "bg-blue-500/10" },
  ai_qualification: { icon: Bot, color: "text-purple-600", bg: "bg-purple-500/10" },
  email: { icon: Mail, color: "text-amber-600", bg: "bg-amber-500/10" },
  conversion: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/10" },
};

const statusStyles = {
  active: "ring-2 ring-primary shadow-md shadow-primary/10",
  completed: "ring-2 ring-emerald-500/50",
  idle: "opacity-70",
};

function WorkflowNodeCard({ node, index }: { node: WorkflowNode; index: number }) {
  const config = nodeConfig[node.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="flex flex-col items-center"
    >
      <div
        className={cn(
          "relative w-full max-w-xs rounded-xl border bg-card p-5 ds-transition hover:shadow-md",
          statusStyles[node.status]
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              config.bg,
              config.color
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold">{node.label}</h4>
              {node.status === "active" && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {node.description}
            </p>
          </div>
        </div>
      </div>

      {index < defaultWorkflow.nodes.length - 1 && (
        <div className="flex flex-col items-center py-3">
          <div className="h-6 w-px bg-border" />
          <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
          <div className="h-6 w-px bg-border" />
        </div>
      )}
    </motion.div>
  );
}

export function WorkflowBuilder() {
  const workflow = defaultWorkflow;

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{workflow.name}</h3>
            <Badge variant="success">{workflow.status}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {workflow.description}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4" />
            Test Run
          </Button>
          <Button size="sm">
            <Zap className="h-4 w-4" />
            Activate
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Visual workflow */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workflow Canvas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8">
              {workflow.nodes.map((node, index) => (
                <WorkflowNodeCard key={node.id} node={node} index={index} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-4">
          <Card variant="elevated">
            <CardContent className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Runs
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums">
                {workflow.runsCount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Success Rate
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-primary">
                {workflow.successRate}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-5">
              <p className="text-sm font-semibold">Node Status</p>
              {workflow.nodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{node.label}</span>
                  <Badge
                    variant={
                      node.status === "completed"
                        ? "success"
                        : node.status === "active"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {node.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
