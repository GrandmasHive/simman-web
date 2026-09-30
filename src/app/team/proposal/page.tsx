import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTeamUser } from "@/lib/team-auth";
import { getProfile } from "@/lib/team-profile";
import { ProposalBuilder } from "@/components/proposal/proposal-builder";

export const metadata: Metadata = {
  title: "Proposal maker",
  robots: { index: false, follow: false },
};

export default async function ProposalPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // The proxy already guards /team; check again here (defence in depth).
  const user = await getTeamUser();
  if (!user) redirect("/team/login?next=/team/proposal");

  const { sample } = await searchParams;
  const pick = sample === "hotel" || sample === "owner" ? sample : null;
  const profile = await getProfile(user);
  return (
    <ProposalBuilder
      name={user.charAt(0).toUpperCase() + user.slice(1)}
      contact={profile.contact}
      isDefaultContact={profile.isDefault}
      sample={pick}
    />
  );
}
