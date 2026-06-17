import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import ProfileForm from "@/components/profile/ProfileForm";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, UserCircle2, Sparkles } from "lucide-react";

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
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-bg text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-bold gradient-text hidden sm:inline">
                CareerOS
              </span>
            </div>
            <div className="h-6 w-px bg-border" />
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-6">
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
  );
}
