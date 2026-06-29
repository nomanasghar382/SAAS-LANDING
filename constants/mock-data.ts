import type {
  ActivityItem,
  Campaign,
  CampaignMetric,
  ChatMessage,
  DashboardStat,
  Lead,
  RevenueDataPoint,
  SuggestedPrompt,
} from "@/types";

export const dashboardStats: DashboardStat[] = [
  {
    id: "1",
    label: "Total Revenue",
    value: "$124,500",
    change: 12.5,
    changeLabel: "vs last month",
  },
  {
    id: "2",
    label: "Active Leads",
    value: "1,284",
    change: 8.2,
    changeLabel: "vs last month",
  },
  {
    id: "3",
    label: "Conversion Rate",
    value: "24.8%",
    change: -2.1,
    changeLabel: "vs last month",
  },
  {
    id: "4",
    label: "Campaign ROI",
    value: "340%",
    change: 18.7,
    changeLabel: "vs last month",
  },
];

export const revenueData: RevenueDataPoint[] = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Feb", revenue: 52000, target: 55000 },
  { month: "Mar", revenue: 48000, target: 52000 },
  { month: "Apr", revenue: 61000, target: 58000 },
  { month: "May", revenue: 55000, target: 60000 },
  { month: "Jun", revenue: 67000, target: 62000 },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "1",
    type: "lead",
    title: "New lead qualified",
    description: "Sarah Chen from TechCorp moved to Qualified",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "2",
    type: "campaign",
    title: "Campaign launched",
    description: "Q2 Enterprise Outreach is now active",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "3",
    type: "customer",
    title: "Deal closed",
    description: "Acme Industries signed $45,000 contract",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "4",
    type: "automation",
    title: "Workflow triggered",
    description: "Follow-up sequence sent to 12 leads",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
];

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@techcorp.com",
    company: "TechCorp",
    status: "qualified",
    source: "linkedin",
    value: 45000,
    score: 92,
    createdAt: "2026-06-20T10:00:00Z",
    updatedAt: "2026-06-28T14:30:00Z",
  },
  {
    id: "2",
    name: "Michael Torres",
    email: "m.torres@acme.io",
    company: "Acme Industries",
    status: "proposal",
    source: "referral",
    value: 78000,
    score: 88,
    createdAt: "2026-06-15T08:00:00Z",
    updatedAt: "2026-06-27T16:00:00Z",
  },
  {
    id: "3",
    name: "Emily Watson",
    email: "emily@startup.co",
    company: "Startup Co",
    status: "new",
    source: "website",
    value: 12000,
    score: 65,
    createdAt: "2026-06-28T09:00:00Z",
    updatedAt: "2026-06-28T09:00:00Z",
  },
  {
    id: "4",
    name: "James Park",
    email: "j.park@globalnet.com",
    company: "GlobalNet",
    status: "contacted",
    source: "cold_outreach",
    value: 35000,
    score: 71,
    createdAt: "2026-06-22T11:00:00Z",
    updatedAt: "2026-06-26T10:00:00Z",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@enterprise.com",
    company: "Enterprise Solutions",
    status: "won",
    source: "event",
    value: 120000,
    score: 95,
    createdAt: "2026-05-10T08:00:00Z",
    updatedAt: "2026-06-25T17:00:00Z",
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q2 Enterprise Outreach",
    description: "Targeted outreach to enterprise decision makers",
    status: "active",
    leads: 342,
    conversions: 48,
    revenue: 285000,
    startDate: "2026-04-01",
    endDate: "2026-06-30",
  },
  {
    id: "2",
    name: "Product Launch Campaign",
    description: "New feature announcement to existing customers",
    status: "active",
    leads: 156,
    conversions: 32,
    revenue: 96000,
    startDate: "2026-05-15",
  },
  {
    id: "3",
    name: "LinkedIn ABM Series",
    description: "Account-based marketing on LinkedIn",
    status: "paused",
    leads: 89,
    conversions: 12,
    revenue: 42000,
    startDate: "2026-03-01",
    endDate: "2026-05-31",
  },
];

export const campaignMetrics: CampaignMetric[] = [
  { date: "Jun 1", impressions: 12000, clicks: 840, conversions: 42, revenue: 21000 },
  { date: "Jun 8", impressions: 14500, clicks: 1020, conversions: 51, revenue: 25500 },
  { date: "Jun 15", impressions: 13200, clicks: 950, conversions: 48, revenue: 24000 },
  { date: "Jun 22", impressions: 15800, clicks: 1180, conversions: 59, revenue: 29500 },
  { date: "Jun 29", impressions: 16200, clicks: 1250, conversions: 62, revenue: 31000 },
];

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "1",
    label: "Analyze pipeline",
    prompt: "Analyze my current sales pipeline and identify bottlenecks",
  },
  {
    id: "2",
    label: "Draft follow-up",
    prompt: "Draft a follow-up email for qualified leads from this week",
  },
  {
    id: "3",
    label: "Campaign ideas",
    prompt: "Suggest campaign ideas to improve conversion rates",
  },
  {
    id: "4",
    label: "Lead scoring",
    prompt: "Review lead scores and recommend priority actions",
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your SellPilot AI assistant. I can help you analyze leads, draft outreach emails, optimize campaigns, and more. What would you like to work on today?",
    timestamp: new Date().toISOString(),
  },
];
