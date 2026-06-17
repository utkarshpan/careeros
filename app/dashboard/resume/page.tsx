import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ResumeBuilder from "@/components/resume/ResumeBuilder";

export const metadata = {
  title: "AI Resume Builder | CareerOS",
  description: "Upload, edit, and optimize your resume using advanced Gemini AI parsing and ATS alignment features.",
};

export default async function ResumePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <ResumeBuilder />
    </div>
  );
}
