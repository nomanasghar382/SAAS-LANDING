import { getLeadStats, getLeads } from "@/lib/data/leads.repository";
import { getCampaigns } from "@/lib/data/campaigns.repository";

export function generateAssistantResponse(message: string): string {
  const lower = message.toLowerCase();
  const stats = getLeadStats();
  const hotLeads = getLeads({ status: "qualified" }).data.slice(0, 3);
  const campaigns = getCampaigns().data.filter((c) => c.status === "active");

  if (lower.includes("hot lead") || lower.includes("pipeline")) {
    const top = getLeads().data
      .filter((l) => l.score >= 80)
      .slice(0, 3)
      .map((l) => `• **${l.name}** at ${l.company} — score ${l.score}, ${l.status}`)
      .join("\n");

    return `Here's your pipeline snapshot:\n\n**${stats.hot} hot leads** (score 80+) out of ${stats.total} total.\nPipeline value: **$${(stats.pipeline / 1000).toFixed(0)}K**\n\nTop opportunities:\n${top || "No hot leads yet — focus on qualifying recent inbound."}\n\nWant me to draft outreach for any of these?`;
  }

  if (lower.includes("campaign")) {
    const list = campaigns
      .map((c) => `• **${c.name}** — ${c.openRate}% open rate, ${c.conversions} conversions`)
      .join("\n");
    return `You have **${campaigns.length} active campaigns**:\n\n${list || "No active campaigns. Create one to start outreach."}\n\nI can help optimize subject lines or suggest A/B test variants.`;
  }

  if (lower.includes("email") || lower.includes("outreach")) {
    return `Here's a proven outreach framework:\n\n**Subject:** Quick idea for {{company}}\n\n**Body:**\nHi {{first_name}},\n\nI noticed {{company}} is scaling fast. Teams like yours typically see 30-40% more qualified meetings when they automate lead scoring and follow-ups.\n\nWould a 15-min call this week make sense?\n\n— Best,\n{{your_name}}`;
  }

  if (lower.includes("forecast") || lower.includes("revenue")) {
    return `Based on your current pipeline:\n\n• **Qualified leads:** ${hotLeads.length}\n• **Weighted pipeline:** $${(stats.pipeline * 0.24 / 1000).toFixed(0)}K (24% avg close rate)\n• **Projected Q close:** $${(stats.pipeline * 0.18 / 1000).toFixed(0)}K\n\nRecommendation: Prioritize leads with score 80+ and status "proposal" for fastest revenue impact.`;
  }

  return `I analyzed your workspace and here's what stands out:\n\n• **${stats.total} leads** in pipeline ($${(stats.pipeline / 1000).toFixed(0)}K total value)\n• **${stats.hot} hot leads** ready for outreach\n• **${campaigns.length} active campaigns** running\n\nTry asking me about:\n- "Show hot leads in my pipeline"\n- "Draft an outreach email"\n- "Campaign performance summary"\n- "Revenue forecast"`;
}
