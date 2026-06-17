import { NextRequest, NextResponse } from "next/server";
import { generateContentFromParts } from "@/lib/ai/gemini";
import {
  REWRITE_RESUME_SYSTEM_INSTRUCTION,
  REWRITE_BULLET_PROMPT,
  REWRITE_SUMMARY_PROMPT,
  TAILOR_RESUME_PROMPT,
} from "@/lib/ai/prompts/resume";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { mode, bullet, summary, resumeData, targetRole } = await req.json();

    if (!targetRole) {
      return NextResponse.json({ error: "Target role is required" }, { status: 400 });
    }

    let prompt = "";
    if (mode === "bullet") {
      if (!bullet) return NextResponse.json({ error: "Bullet text is required" }, { status: 400 });
      prompt = REWRITE_BULLET_PROMPT(bullet, targetRole);
    } else if (mode === "summary") {
      if (!summary) return NextResponse.json({ error: "Summary text is required" }, { status: 400 });
      prompt = REWRITE_SUMMARY_PROMPT(summary, targetRole);
    } else if (mode === "resume") {
      if (!resumeData) return NextResponse.json({ error: "Resume data is required" }, { status: 400 });
      prompt = TAILOR_RESUME_PROMPT(resumeData, targetRole);
    } else {
      return NextResponse.json({ error: "Invalid rewrite mode" }, { status: 400 });
    }

    const responseText = await generateContentFromParts(
      [prompt],
      REWRITE_RESUME_SYSTEM_INSTRUCTION,
      "application/json"
    );

    let cleanJson = responseText.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.slice(7);
    }
    if (cleanJson.endsWith("```")) {
      cleanJson = cleanJson.slice(0, -3);
    }
    cleanJson = cleanJson.trim();

    const result = JSON.parse(cleanJson);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in rewrite API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to rewrite content" },
      { status: 500 }
    );
  }
}
