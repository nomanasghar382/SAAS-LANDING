"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { campaignsService } from "@/services/campaigns.service";
import { useAppStore } from "@/store/app-store";
import { toast } from "@/lib/toast";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface CreateCampaignModalProps {
  onSuccess?: () => void;
}

export function CreateCampaignModal({ onSuccess }: CreateCampaignModalProps) {
  const { createCampaignOpen, setCreateCampaignOpen } = useAppStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await campaignsService.create(data);
      toast.success("Campaign created", `"${data.name}" is ready to configure.`);
      reset();
      setCreateCampaignOpen(false);
      window.dispatchEvent(new CustomEvent("campaigns:refresh"));
      onSuccess?.();
    } catch {
      toast.error("Failed to create campaign");
    }
  };

  return (
    <Modal open={createCampaignOpen} onOpenChange={setCreateCampaignOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create campaign</ModalTitle>
          <ModalDescription>
            Launch a new outreach campaign. You can configure targeting and
            automation after creation.
          </ModalDescription>
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign name</Label>
            <Input
              id="campaign-name"
              placeholder="Q3 Enterprise Outreach"
              error={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign-description">Description</Label>
            <textarea
              id="campaign-description"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ds-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              placeholder="Describe the campaign goals and target audience..."
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          <ModalFooter className="px-0 pb-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateCampaignOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Create campaign
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
