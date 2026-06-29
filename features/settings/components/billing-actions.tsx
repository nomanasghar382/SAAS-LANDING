"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

export function UpgradePlanButton() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.info("Upgrade plan", "Billing portal will open in the next release.")
      }
    >
      Upgrade plan
    </Button>
  );
}

export function UpdatePaymentButton() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.info("Payment method", "Stripe Customer Portal coming soon.")
      }
    >
      Update payment method
    </Button>
  );
}
