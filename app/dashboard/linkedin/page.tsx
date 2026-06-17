import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import LinkedInOptimizerClient from "@/components/linkedin/LinkedInOptimizerClient";
import { Share2, Sparkles, Eye, TrendingUp } from "lucide-react";

export const metadata = {
  title: "LinkedIn Optimizer | CareerOS",
  description: "AI-powered LinkedIn profile optimization for maximum recruiter visibility.",
};

export default async function LinkedInPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  const userSkills = dbUser?.skills ? JSON.parse(dbUser.skills).join(", ") : undefined;
  const userRole = dbUser?.targetRole || undefined;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-bg p-7 text-white shadow-lg shadow-primary/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shrink-0">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold">LinkedIn Optimizer</h1>
            <p className="text-white/80 mt-1">
              Craft recruiter-attracting headlines, rewrite your bio, and get skill gap analysis.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: Sparkles, label: "AI Headlines" },
              { icon: Eye, label: "Profile Bio" },
              { icon: TrendingUp, label: "Skill Gaps" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl border border-white/20 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-white/80" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimizer Client */}
      <LinkedInOptimizerClient userRole={userRole} userSkills={userSkills} />
    </div>
  );
}
