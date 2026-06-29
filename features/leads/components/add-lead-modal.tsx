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
import { leadsService } from "@/services/leads.service";
import { useAppStore } from "@/store/app-store";
import { toast } from "@/lib/toast";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(1, "Company is required"),
  value: z.number().min(0).optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AddLeadModalProps {
  onSuccess?: () => void;
}

export function AddLeadModal({ onSuccess }: AddLeadModalProps) {
  const { addLeadOpen, setAddLeadOpen } = useAppStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { value: 0 },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await leadsService.create(data);
      toast.success("Lead created", `${data.name} added to your pipeline.`);
      reset();
      setAddLeadOpen(false);
      window.dispatchEvent(new CustomEvent("leads:refresh"));
      onSuccess?.();
    } catch {
      toast.error("Failed to create lead");
    }
  };

  return (
    <Modal open={addLeadOpen} onOpenChange={setAddLeadOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Add new lead</ModalTitle>
          <ModalDescription>
            Create a lead in your pipeline. You can enrich it later with notes
            and activity.
          </ModalDescription>
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="lead-name">Full name</Label>
              <Input
                id="lead-name"
                error={!!errors.name}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-email">Email</Label>
              <Input
                id="lead-email"
                type="email"
                error={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-company">Company</Label>
              <Input id="lead-company" error={!!errors.company} {...register("company")} />
              {errors.company && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.company.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-value">Deal value ($)</Label>
              <Input
                id="lead-value"
                type="number"
                min={0}
                {...register("value")}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="lead-notes">Notes (optional)</Label>
              <textarea
                id="lead-notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ds-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                {...register("notes")}
              />
            </div>
          </div>

          <ModalFooter className="px-0 pb-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddLeadOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Create lead
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
