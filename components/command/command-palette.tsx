"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  LayoutDashboard,
  Megaphone,
  Moon,
  Plus,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Modal,
  ModalContent,
} from "@/components/ui/modal";
import { dashboardNavItems } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useAppStore } from "@/store/app-store";
import { useUiStore } from "@/store/ui-store";

export function CommandPalette() {
  const router = useRouter();
  const { commandOpen, setCommandOpen, setAddLeadOpen, setCreateCampaignOpen } =
    useAppStore();
  const { theme, setTheme, toggleSidebar } = useUiStore();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [commandOpen, setCommandOpen]);

  const run = (fn: () => void) => {
    setCommandOpen(false);
    fn();
  };

  return (
    <Modal open={commandOpen} onOpenChange={setCommandOpen}>
      <ModalContent className="overflow-hidden p-0 shadow-2xl sm:max-w-xl">
        <Command>
          <CommandInput placeholder="Search commands, pages, actions..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Actions">
              <CommandItem
                onSelect={() => run(() => setAddLeadOpen(true))}
              >
                <Plus className="h-4 w-4" />
                Add new lead
                <CommandShortcut>⌘L</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => run(() => setCreateCampaignOpen(true))}
              >
                <Megaphone className="h-4 w-4" />
                Create campaign
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Navigation">
              {dashboardNavItems.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => run(() => router.push(item.href))}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Quick links">
              <CommandItem
                onSelect={() => run(() => router.push(ROUTES.assistant))}
              >
                <Bot className="h-4 w-4" />
                Open AI Assistant
              </CommandItem>
              <CommandItem
                onSelect={() => run(() => router.push(ROUTES.settings))}
              >
                <Settings className="h-4 w-4" />
                Settings
              </CommandItem>
              <CommandItem
                onSelect={() => run(() => router.push(ROUTES.leads))}
              >
                <Users className="h-4 w-4" />
                View all leads
              </CommandItem>
              <CommandItem
                onSelect={() => run(() => router.push(ROUTES.dashboard))}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard home
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Preferences">
              <CommandItem onSelect={() => run(toggleSidebar)}>
                Toggle sidebar
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  run(() => toggleTheme())
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                Toggle {theme === "dark" ? "light" : "dark"} mode
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ModalContent>
    </Modal>
  );
}
