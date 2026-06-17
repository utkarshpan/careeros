import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import InternshipFinder from "@/components/internships/InternshipFinder";
import { Briefcase, Zap, MapPin, DollarSign } from "lucide-react";

export const metadata = {
  title: "Internship Finder | CareerOS",
  description: "Discover AI-matched internships that align with your skills and career goals.",
};

export default async function InternshipsPage() {
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
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold">Internship Finder</h1>
            <p className="text-white/80 mt-1">
              AI-scored internships ranked by how well they match your skills and target role.
            </p>
            {userRole && (
              <p className="text-white/60 text-sm mt-1">
                Matching for: <span className="text-white font-semibold">{userRole}</span>
              </p>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: Zap, label: "AI Matched" },
              { icon: MapPin, label: "India & Remote" },
              { icon: DollarSign, label: "With Stipend" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl border border-white/20 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-white/80" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internship Finder */}
      <InternshipFinder userSkills={userSkills} userRole={userRole} />
    </div>
  );
}
