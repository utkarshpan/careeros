import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ATSScanner from "@/components/ats/ATSScanner";

export const metadata = {
  title: "AI ATS Scanner | CareerOS",
  description: "Scan your resume against any target job description using Groq Llama 4 and get instant scores and tips.",
};

export default async function ATSPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header Info */}
      <div className="flex flex-col gap-1.5 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          ATS Compatibility Scanner
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Paste the job description and your resume plain text. Our Groq-powered AI will measure keyword overlap, layout completeness, and formatting standards.
        </p>
      </div>

      <ATSScanner />
    </div>
  );
}
