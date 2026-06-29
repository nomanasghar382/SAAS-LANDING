"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

export function TeamActions() {
  return (
    <Button
      onClick={() =>
        toast.info("Invite sent", "Team invitations will be available soon.")
      }
    >
      Invite member
    </Button>
  );
}
