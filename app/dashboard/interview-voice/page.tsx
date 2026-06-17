import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import VoiceChatUI from "@/components/interview/VoiceChatUI";
import { Mic, Brain, BarChart2, Trophy, Zap } from "lucide-react";

export const metadata = {
  title: "AI Voice Interview | CareerOS",
  description:
    "Experience a real AI-powered voice mock interview with adaptive questions, real-time evaluation, and detailed feedback.",
};

export default async function VoiceInterviewPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();
  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

  const targetRole =
    dbUser?.targetRole ||
    clerkUser?.unsafeMetadata?.targetRole as string ||
    "Software Engineer";

  const skills = dbUser?.skills ? JSON.parse(dbUser.skills).join(", ") : "";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-bg p-7 text-white shadow-lg shadow-primary/10">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shrink-0">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              AI Voice Mock Interview
            </h1>
            <p className="text-white/80 mt-1 max-w-lg">
              Powered by Groq Llama 3.3 70B. Adaptive questions, real-time scoring, and a human-like AI interviewer that responds to exactly what you say.
            </p>
            {targetRole && (
              <p className="text-white/60 text-sm mt-1.5">
                Practicing for:{" "}
                <span className="text-white font-semibold">{targetRole}</span>
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap sm:flex-col">
            {[
              { icon: Brain, label: "Adaptive AI" },
              { icon: BarChart2, label: "Real-time Scores" },
              { icon: Trophy, label: "Final Report" },
              { icon: Zap, label: "Voice + Text" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl border border-white/20 text-xs font-semibold"
              >
                <Icon className="w-3.5 h-3.5 text-white/80" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Component */}
      <VoiceChatUI targetRole={targetRole} skills={skills} />
    </div>
  );
}
