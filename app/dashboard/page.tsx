import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import dynamic from "next/dynamic";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const ModuleCard = dynamic(() => import("@/components/dashboard/ModuleCard"), {
  loading: () => <LoadingSkeleton variant="card" />,
});
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import {
  FileText,
  ScanSearch,
  BrainCircuit,
  Briefcase,
  Video,
  Code2,
  Share2,
  Layout,
  Mic,
  ArrowRight,
  Sparkles,
  Award,
  Calendar,
  Zap,
  GitGraph,
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
  {
    title: "AI Voice Interview",
    description:
      "Real adaptive AI voice mock interviews with live scoring, follow-up questions, and detailed performance report.",
    status: "active" as const,
    iconName: "Mic",
    href: "/dashboard/interview-voice",
  },
  {
    title: "GitHub Deep Analysis",
    description:
      "Analyze your GitHub profile for coding activity, language diversity, project quality, and documentation.",
    status: "active" as const,
    iconName: "GitGraph",
    href: "/dashboard/github",
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
    <PageTransition staggerChildren={true}>
      <div className="space-y-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ═══ WELCOME BANNER ═══ */}
        <GlassCard hoverEffect={false} glowColor="indigo" className="p-8 sm:p-10 text-white relative">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-500/10 blur-[80px]" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-pink-500/5 blur-[80px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Active Member
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">{displayName}</span>!
              </h1>

              <p className="text-gray-300 text-base max-w-xl leading-relaxed">
                Your AI-powered workspace is ready. Tailor resumes, practice voice mocks, track coding milestones, and find internships all in one unified dashboard.
              </p>

              {targetRole ? (
                <div className="flex items-center gap-2.5 pt-1">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Target Role:</span>
                  <span className="bg-white/5 border border-white/10 text-indigo-300 px-3 py-1 rounded-lg text-xs font-bold">
                    {targetRole}
                  </span>
                </div>
              ) : (
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors pt-1"
                >
                  Complete profile configuration
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            {/* Quick Action buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link href="/profile" passHref>
                <AnimatedButton variant="glass" className="w-full sm:w-auto text-center justify-center">
                  Configure Profile
                </AnimatedButton>
              </Link>
              <Link href="/dashboard/resume" passHref>
                <AnimatedButton variant="primary" className="w-full sm:w-auto text-center justify-center">
                  Build AI Resume
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* ═══ MODULES SECTION ═══ */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Workspace Hub
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Access CareerOS AI instruments optimized to support your professional progression.
            </p>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Performance Analytics</h2>
            <p className="text-xs text-muted-foreground mt-1">Review aggregated career preparation milestones.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Resumes Created", value: resumesCount.toString(), sublabel: resumesCount > 0 ? "Optimized draft stored" : "None created yet", icon: FileText, glow: "indigo" as const },
              { label: "Average ATS Score", value: avgAtsScore, sublabel: avgAtsScore !== "—" ? "Targeting 80%+" : "Scan to measure score", icon: Award, glow: "violet" as const },
              { label: "Mock Interviews Done", value: interviewSessionsCount.toString(), sublabel: interviewSessionsCount > 0 ? "Excellent practice" : "No tests taken yet", icon: Calendar, glow: "pink" as const },
              { label: "Coding Streak", value: `${maxStreak}d`, sublabel: maxStreak > 0 ? "Consistency active" : "Solve problems to start", icon: Zap, glow: "indigo" as const },
            ].map((stat) => (
              <GlassCard
                key={stat.label}
                glowColor={stat.glow}
                className="p-5 flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <stat.icon className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                    {stat.sublabel}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}