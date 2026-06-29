"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth.service";

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "SP";
}

export function UserMenu() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const initials = getInitials(user?.name, user?.email);

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Open account menu"
        >
          <Avatar className="h-8 w-8 cursor-pointer sm:h-9 sm:w-9">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownTrigger>
      <DropdownContent align="end" className="w-56">
        <DropdownLabel className="font-normal">
          <p className="text-sm font-medium">{user?.name ?? "Account"}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </DropdownLabel>
        <DropdownSeparator />
        <DropdownItem asChild>
          <Link href={ROUTES.settingsProfile}>
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem asChild>
          <Link href={ROUTES.settings}>
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          onClick={async () => {
            await authService.logout();
            router.refresh();
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
