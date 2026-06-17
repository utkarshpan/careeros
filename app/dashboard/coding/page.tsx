import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CodingTrackerClient from "@/components/coding/CodingTrackerClient";
import { Code2, BookOpen, Target, Zap } from "lucide-react";

export const metadata = {
  title: "Coding Tracker | CareerOS",
  description: "Track your DSA progress, monitor streaks, and identify weak areas to focus your practice.",
};

export default async function CodingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-bg p-7 text-white shadow-lg shadow-primary/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shrink-0">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold">Coding Tracker</h1>
            <p className="text-white/80 mt-1">
              Track DSA progress across 12 topics. Build streaks, master concepts, and get interview-ready.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: BookOpen, label: "12 DSA Topics" },
              { icon: Target, label: "Progress Bars" },
              { icon: Zap, label: "Streak Tracking" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl border border-white/20 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-white/80" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracker */}
      <CodingTrackerClient />
    </div>
  );
}
