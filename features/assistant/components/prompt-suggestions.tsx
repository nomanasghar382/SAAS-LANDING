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
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5" />
        Suggested prompts
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.id}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onSelect(suggestion.prompt)}
          >
            {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
