export type IntegrationStatus = "connected" | "disconnected" | "pending";

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: IntegrationStatus;
  icon: string;
  brandColor: string;
  lastSync?: string;
}

export type WorkflowNodeType =
  | "trigger"
  | "ai_qualification"
  | "email"
  | "conversion";

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  label: string;
  description: string;
  status: "active" | "idle" | "completed";
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  nodes: WorkflowNode[];
  runsCount: number;
  successRate: number;
}
