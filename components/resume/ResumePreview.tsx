"use client";

import React from "react";
import { Printer, Download, Eye } from "lucide-react";
import { type ResumeData } from "@/types";

interface ResumePreviewProps {
  data: ResumeData;
  title?: string;
}

export default function ResumePreview({ data, title = "Resume" }: ResumePreviewProps) {
  const handlePrint = () => {
    // Save current document title to customize PDF name
    const originalTitle = document.title;
    document.title = `${data.fullName.replace(/\s+/g, "_")}_Resume`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Header bar - Hidden when printing */}
      <div className="no-print flex items-center justify-between px-6 py-4 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Live Preview</h3>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02]"
        >
          <Printer className="w-4 h-4" />
          <span>Export PDF / Print</span>
        </button>
      </div>

      {/* Styled print page block */}
      <style jsx global>{`
        @media print {
          /* Hide everything except the print-container */
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
          /* Remove background gradients/dark modes in print */
          .print-container {
            background-color: white !important;
            color: #1a1a1a !important;
            font-family: "Geist", "Inter", sans-serif !important;
          }
          .print-badge {
            border: 1px solid #ccc !important;
            background: none !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Scrollable preview area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30">
        {/* Printable Resume Document Sheet */}
        <div className="print-container w-full max-w-[800px] mx-auto bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-8 md:p-12 rounded-xl shadow-md border border-border/50 transition-colors duration-300 min-h-[1050px] flex flex-col justify-between">
          <div className="space-y-8">
            {/* Header / Contact Info */}
            <div className="text-center border-b pb-6 border-zinc-200 dark:border-zinc-800">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {data.fullName || "Your Full Name"}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400 mt-3 font-medium">
                {data.email && <span>{data.email}</span>}
                {data.email && data.phone && <span className="hidden sm:inline">•</span>}
                {data.phone && <span>{data.phone}</span>}
              </div>
            </div>

            {/* Summary */}
            {data.summary && (
              <div className="space-y-2">
                <h2 className="text-lg font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1">
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {data.summary}
                </p>
              </div>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-lg font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1">
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  {data.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="print-badge px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                          {exp.role || "Role"} at <span className="text-primary">{exp.company || "Company"}</span>
                        </h3>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {exp.duration || "Dates"}
                        </span>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1.5">
                          {exp.bullets.map((bullet, bulletIdx) => (
                            <li
                              key={bulletIdx}
                              className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1">
                  Education
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-start justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                          {edu.degree || "Degree"}
                        </h3>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                          {edu.school || "School"}
                        </p>
                      </div>
                      <div className="text-right flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0 mt-1 sm:mt-0">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {edu.year || "Year"}
                        </span>
                        {edu.gpa && (
                          <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 print-badge sm:mt-1">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer brand indicator - Small font, prints nicely */}
          <div className="mt-12 pt-4 border-t border-zinc-100 dark:border-zinc-900 text-center">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-medium">
              Generated via CareerOS AI Resume Builder
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
