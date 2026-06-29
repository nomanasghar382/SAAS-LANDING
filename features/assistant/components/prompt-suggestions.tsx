import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SuggestedPrompt } from "@/types";

interface PromptSuggestionsProps {
  suggestions: SuggestedPrompt[];
  onSelect: (prompt: string) => void;
}

export function PromptSuggestions({
  suggestions,
  onSelect,
}: PromptSuggestionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Suggested prompts
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            type="button"
            onClick={() => onSelect(suggestion.prompt)}
            className="rounded-lg border bg-card px-4 py-3 text-left text-sm ds-transition hover:border-primary/30 hover:bg-accent/50 hover:shadow-sm"
          >
            <span className="font-medium">{suggestion.label}</span>
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {suggestion.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
