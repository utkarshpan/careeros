import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import PortfolioGeneratorClient from "@/components/portfolio/PortfolioGeneratorClient";
import { Layout, Sparkles, Download, Globe } from "lucide-react";

export const metadata = {
  title: "Portfolio Generator | CareerOS",
  description: "Generate a stunning personal portfolio website from your resume data in seconds.",
};

export default async function PortfolioPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

  // Fetch most recent resume to pre-populate
  const latestResume = dbUser
    ? await prisma.resume.findFirst({
        where: { userId: dbUser.id },
        orderBy: { updatedAt: "desc" },
      })
    : null;

  const userResume = latestResume
    ? {
        fullName: latestResume.fullName || undefined,
        email: latestResume.email || undefined,
        summary: latestResume.summary || undefined,
        skills: latestResume.skills || undefined,
        experience: latestResume.experience || undefined,
        education: latestResume.education || undefined,
        targetRole: latestResume.targetRole || undefined,
      }
    : undefined;

  const userProfile = dbUser
    ? {
        name: dbUser.name,
        githubUrl: dbUser.githubUrl || undefined,
        linkedinUrl: dbUser.linkedinUrl || undefined,
      }
    : undefined;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-bg p-7 text-white shadow-lg shadow-primary/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shrink-0">
            <Layout className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold">Portfolio Generator</h1>
            <p className="text-white/80 mt-1">
              Generate a stunning personal portfolio from your resume data in seconds with AI.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: Sparkles, label: "AI Generated" },
              { icon: Globe, label: "3 Templates" },
              { icon: Download, label: "Download HTML" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl border border-white/20 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-white/80" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generator */}
      <PortfolioGeneratorClient userResume={userResume} userProfile={userProfile} />
    </div>
  );
}
