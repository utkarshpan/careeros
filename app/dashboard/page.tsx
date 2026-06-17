import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import ModuleCard from "@/components/dashboard/ModuleCard";
import Link from "next/link";
import {
  FileText,
  ScanSearch,
  BrainCircuit,
  Briefcase,
  Video,
  Code2,
  Share2,
  Layout,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const MODULES = [
  {
    title: "AI Resume Builder",
    description:
      "Build ATS-optimized resumes with AI-powered suggestions and real-time formatting.",
    status: "active" as const,
    iconName: "FileText",
    href: "/dashboard/resume",
  },
  {
    title: "ATS Scanner",
    description:
      "Scan your resume against job descriptions and get instant compatibility scores.",
    status: "active" as const,
    iconName: "ScanSearch",
    href: "/dashboard/ats",
  },
  {
    title: "AI Career Mentor",
    description:
      "Get personalized career guidance and roadmap recommendations from AI.",
    status: "active" as const,
    iconName: "BrainCircuit",
    href: "/dashboard/mentor",
  },
  {
    title: "Internship Finder",
    description:
      "Discover relevant internships matching your skills, location, and interests.",
    status: "active" as const,
    iconName: "Briefcase",
    href: "/dashboard/internships",
  },
  {
    title: "AI Interview Coach",
    description:
      "Practice mock interviews with AI and get detailed feedback on your answers.",
    status: "active" as const,
    iconName: "Video",
    href: "/dashboard/interview",
  },
  {
    title: "Coding Tracker",
    description:
      "Track your DSA progress across platforms and identify weak areas to improve.",
    status: "active" as const,
    iconName: "Code2",
    href: "/dashboard/coding",
  },
  {
    title: "LinkedIn Optimizer",
    description:
      "Optimize your LinkedIn profile for recruiter visibility and personal branding.",
    status: "active" as const,
    iconName: "Share2",
    href: "/dashboard/linkedin",
  },
  {
    title: "Portfolio Generator",
    description:
      "Generate a stunning portfolio website from your resume data in minutes.",
    status: "active" as const,
    iconName: "Layout",
    href: "/dashboard/portfolio",
  },
];

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const clerkUser = await currentUser();
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  const db = prisma as any;

  const displayName = dbUser?.name || clerkUser?.firstName || "Student";
  const targetRole = dbUser?.targetRole;

  const resumesCount = dbUser
    ? await db.resume.count({
        where: { userId: dbUser.id },
      })
    : 0;

  const avgAtsAggregate = dbUser
    ? await db.aTSScan.aggregate({
        where: { userId: dbUser.id },
        _avg: { score: true },
      })
    : null;
  
  const avgAtsScore = avgAtsAggregate?._avg?.score !== null && avgAtsAggregate?._avg?.score !== undefined
    ? `${Math.round(avgAtsAggregate._avg.score)}%`
    : "—";

  const interviewSessionsCount = dbUser
    ? await db.interviewSession.count({
        where: { userId: dbUser.id },
      })
    : 0;

  const codingProgressList = dbUser
    ? await db.codingProgress.findMany({
        where: { userId: dbUser.id },
      })
    : [];
  
  const maxStreak = codingProgressList.length > 0
    ? Math.max(...codingProgressList.map((c: any) => c.streak))
    : 0;

  const getModuleBadge = (title: string) => {
    if (title === "AI Resume Builder") return resumesCount > 0 ? `${resumesCount} Resumes` : "Get Started";
    if (title === "ATS Scanner") return avgAtsScore !== "—" ? `Avg: ${avgAtsScore}` : "Start Scanning";
    if (title === "AI Interview Coach") return interviewSessionsCount > 0 ? `${interviewSessionsCount} Mock Tests` : "Practice Mock";
    if (title === "Coding Tracker") return maxStreak > 0 ? `Streak: ${maxStreak}d` : "Track DSA";
    return undefined;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ═══ WELCOME BANNER ═══ */}
      <div className="relative overflow-hidden rounded-2xl gradient-bg p-8 sm:p-10 text-white shadow-lg shadow-primary/10 animate-fade-in">
        {/* Decorative orbs */}
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white/80" />
              <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
                Dashboard
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {displayName}!
            </h1>

            <p className="text-white/80 text-lg max-w-lg">
              Ready to accelerate your career? Explore your AI-powered workspace
              below.
            </p>

            {targetRole ? (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm text-white/60">Target Role:</span>
                <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/10">
                  {targetRole}
                </span>
              </div>
            ) : (
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors pt-1"
              >
                Complete your profile to get personalized guidance
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Quick actions */}
          <div className="flex sm:flex-col gap-3">
            <Link
              href="/profile"
              className="bg-white/15 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/25 transition-all duration-300 text-center"
            >
              Edit Profile
            </Link>
            <Link
              href="/dashboard/resume"
              className="bg-white text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg text-center"
            >
              Build Resume
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ MODULES SECTION ═══ */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Your Workspace
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Access AI-driven tools designed to prepare you for every career
            stage.
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULES.map((module, index) => (
            <ModuleCard
              key={module.title}
              title={module.title}
              description={module.description}
              status={module.status}
              iconName={module.iconName}
              href={module.href}
              badge={getModuleBadge(module.title)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* ═══ QUICK STATS ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up delay-500">
        {[
          { label: "Resumes Created", value: resumesCount.toString(), sublabel: resumesCount > 0 ? "Keep optimizing!" : "Get started!" },
          { label: "Average ATS Score", value: avgAtsScore, sublabel: avgAtsScore !== "—" ? "Targeting 80%+" : "Scan resume to check" },
          { label: "Interviews Done", value: interviewSessionsCount.toString(), sublabel: interviewSessionsCount > 0 ? "Great practice!" : "No mock tests yet" },
          { label: "Coding Streak", value: `${maxStreak}d`, sublabel: maxStreak > 0 ? "Consistency is key!" : "Solve problems" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-2xl font-extrabold text-foreground mt-1">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}