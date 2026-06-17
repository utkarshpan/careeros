"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Activity, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import ScoreCard from "./ScoreCard";
import KeywordList from "./KeywordList";
import FeedbackList from "./FeedbackList";

interface ScanResponse {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  feedback: string[];
  formattingIssues: string[];
}

export default function ATSScanner() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);

  React.useEffect(() => {
    const cached = localStorage.getItem("ats_resume_text");
    if (cached) {
      setResumeText(cached);
      localStorage.removeItem("ats_resume_text");
      toast.success("Resume text loaded from builder!");
    }
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      toast.error("Missing Job Description", {
        description: "Please enter the target job description to match against.",
      });
      return;
    }

    if (!resumeText.trim()) {
      toast.error("Missing Resume Content", {
        description: "Please paste your resume plain text to begin scanning.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ats/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          resumeText,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to scan resume. Check network logs.");
      }

      const data: ScanResponse = await res.json();
      setResult(data);
      toast.success("ATS scan completed successfully!", {
        description: `Match score calculated: ${data.score}%`,
      });
    } catch (err: any) {
      console.error("Scan error:", err);
      toast.error("Scan Failed", {
        description: err.message || "An unexpected error occurred while communicating with the AI API.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJobDescription("");
    setResumeText("");
    setResult(null);
    toast.info("Inputs cleared");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Input panel (Left - 5 Cols on desktop) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="border border-border bg-card shadow-lg flex-1">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>ATS Scan Configuration</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Provide the job description and your resume text. Groq AI matches alignment instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleScan} className="space-y-6">
              {/* Job Description Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                  Target Job Description
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description (responsibilities, skills, requirements) here..."
                  className="min-h-[160px] resize-none leading-relaxed text-xs"
                  disabled={loading}
                />
              </div>

              {/* Resume Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                  Resume Text (Plain Text)
                </label>
                <Textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste the text content of your resume here..."
                  className="min-h-[220px] resize-none leading-relaxed text-xs"
                  disabled={loading}
                />
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading || (!jobDescription && !resumeText)}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 shrink-0" />
                  <span>Clear</span>
                </Button>

                <Button type="submit" variant="gradient" loading={loading} className="flex-[2]">
                  {!loading && <Activity className="w-4 h-4 shrink-0" />}
                  <span>{loading ? "Analyzing..." : "Analyze Alignment"}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Results panel (Right - 7 Cols on desktop) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {loading ? (
          // Loading skeleton state
          <Card className="border border-dashed border-border bg-card/50 flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[450px]">
            <div className="space-y-6 w-full max-w-sm flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-t-primary border-border animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm">Groq Llama 4 Scanner Active</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Extracting key skills, evaluating structural formatting, and calculating match compatibility scores...
                </p>
              </div>
            </div>
          </Card>
        ) : result ? (
          // Analysis Results
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <ScoreCard score={result.score} />
            </div>
            <KeywordList
              matchedKeywords={result.matchedKeywords}
              missingKeywords={result.missingKeywords}
            />
            <FeedbackList feedback={result.feedback} formattingIssues={result.formattingIssues} />
          </div>
        ) : (
          // Empty State
          <Card className="border border-dashed border-border bg-card/30 flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[450px]">
            <div className="space-y-4 max-w-sm flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-sm">Scan Results Awaiting</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Enter target specifications and paste your profile resume inside the form, then click **Analyze Alignment** to run the scan.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
