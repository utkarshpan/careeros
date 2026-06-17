import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { resumeData, template, personalInfo } = await req.json();

    const prompt = `You are a professional portfolio website generator. Generate clean, modern HTML for a developer portfolio.

Developer Information:
- Name: ${personalInfo?.name || resumeData?.fullName || "John Doe"}
- Email: ${personalInfo?.email || resumeData?.email || ""}
- Role: ${personalInfo?.role || resumeData?.targetRole || "Software Engineer"}
- Summary: ${resumeData?.summary || "Passionate developer"}
- Skills: ${Array.isArray(resumeData?.skills) ? resumeData.skills.join(", ") : resumeData?.skills || "JavaScript, React"}
- Experience: ${JSON.stringify(resumeData?.experience || [])}
- Education: ${JSON.stringify(resumeData?.education || [])}
- GitHub: ${personalInfo?.github || ""}
- LinkedIn: ${personalInfo?.linkedin || ""}
- Template Style: ${template || "modern"} (modern=gradient dark, minimal=clean white, bold=vibrant colors)

Return ONLY valid JSON:
{
  "html": "<!DOCTYPE html>...complete standalone HTML file with embedded CSS and all content..."
}

Requirements for the HTML:
- Completely standalone (no external CDN links)
- All CSS embedded in <style> tags
- Dark or light theme based on template (modern=dark, minimal=light, bold=colorful)
- Sections: Hero, About, Skills, Experience, Education, Contact
- Smooth animations with CSS only
- Mobile responsive with CSS media queries
- Professional typography
- Skill badges/tags
- Clean timeline for experience
- Footer with social links
- NO JavaScript (pure HTML/CSS)`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a portfolio HTML generator. Generate complete, production-ready standalone HTML files. Return only valid JSON with the html field." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 4096,
    });

    const content = response.choices[0]?.message?.content || "{}";
    let parsed: any = {};
    try { parsed = JSON.parse(content); } catch { parsed = { html: "<html><body>Generation failed</body></html>" }; }

    // Save to database
    try {
      const user = await prisma.user.findUnique({ where: { clerkId } });
      if (user) {
        await (prisma as any).portfolio.upsert({
          where: { id: "placeholder" },
          create: {
            userId: user.id,
            template: template || "modern",
            htmlContent: parsed.html,
          },
          update: {
            template: template || "modern",
            htmlContent: parsed.html,
          },
        }).catch(async () => {
          // If placeholder doesn't exist, just create
          await (prisma as any).portfolio.create({
            data: {
              userId: user.id,
              template: template || "modern",
              htmlContent: parsed.html,
            },
          });
        });
      }
    } catch (dbErr) {
      console.error("Portfolio DB save error:", dbErr);
    }

    return NextResponse.json({ html: parsed.html });
  } catch (error: any) {
    console.error("Portfolio generate error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate portfolio" }, { status: 500 });
  }
}
