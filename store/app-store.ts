import { create } from "zustand";

interface AppState {
  commandOpen: boolean;
  addLeadOpen: boolean;
  createCampaignOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  setAddLeadOpen: (open: boolean) => void;
  setCreateCampaignOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  commandOpen: false,
  addLeadOpen: false,
  createCampaignOpen: false,
  setCommandOpen: (open) => set({ commandOpen: open }),
  setAddLeadOpen: (open) => set({ addLeadOpen: open }),
  setCreateCampaignOpen: (open) => set({ createCampaignOpen: open }),
}));
