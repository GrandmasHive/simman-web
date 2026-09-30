import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTeamUser } from "@/lib/team-auth";
import { getProfile } from "@/lib/team-profile";
import { SettingsForm } from "@/components/team/settings-form";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  // The proxy already guards /team; check again here (defence in depth).
  const user = await getTeamUser();
  if (!user) redirect("/team/login?next=/team/settings");

  const profile = await getProfile(user);
  return (
    <SettingsForm
      account={user.charAt(0).toUpperCase() + user.slice(1)}
      initial={profile.contact}
      isDefault={profile.isDefault}
      canSave={profile.canSave}
    />
  );
}
