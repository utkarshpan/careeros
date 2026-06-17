import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import MentorChat from "@/components/mentor/MentorChat";
import { BrainCircuit, Lightbulb, Map, BookOpen } from "lucide-react";

export const metadata = {
  title: "AI Career Mentor | CareerOS",
  description: "Get personalized career guidance from your AI mentor powered by Groq Llama 3.3 70B.",
};

export default async function MentorPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();
  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

  const userProfile = {
    name: dbUser?.name || clerkUser?.firstName || undefined,
    targetRole: dbUser?.targetRole || undefined,
    skills: dbUser?.skills ? JSON.parse(dbUser.skills).join(", ") : undefined,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-bg p-7 text-white shadow-lg shadow-primary/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shrink-0">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold">AI Career Mentor</h1>
            <p className="text-white/80 mt-1">
              Personalized career guidance powered by Groq Llama 3.3 70B. Get roadmaps, course picks & expert advice.
            </p>
          </div>
          {/* Stat pills */}
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: Lightbulb, label: "Career Advice" },
              { icon: Map, label: "Roadmaps" },
              { icon: BookOpen, label: "Courses" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl border border-white/20 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-white/80" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat */}
      <MentorChat userProfile={userProfile} />
    </div>
  );
}
