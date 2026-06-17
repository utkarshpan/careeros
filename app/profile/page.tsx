import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import ProfileForm from "@/components/profile/ProfileForm";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { UserCircle2 } from "lucide-react";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const clerkUser = await currentUser();
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  const parsedSkills = dbUser?.skills ? JSON.parse(dbUser.skills) : [];

  const initialData = {
    name: dbUser?.name || clerkUser?.fullName || clerkUser?.firstName || "",
    targetRole: dbUser?.targetRole || null,
    skills: parsedSkills,
    githubUrl: dbUser?.githubUrl || null,
    linkedinUrl: dbUser?.linkedinUrl || null,
    bio: dbUser?.bio || null,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <Sidebar />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="lg:pl-64 transition-all duration-300">
        <DashboardHeader />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto py-10 px-6">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-4 mb-4 text-primary border border-primary/20 shadow-sm">
              <UserCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              My Professional Profile
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              Keep your profile updated so CareerOS can customize your AI-powered
              career tools.
            </p>
          </div>

          <ProfileForm initialData={initialData} />
        </main>
      </div>
    </div>
  );
}
