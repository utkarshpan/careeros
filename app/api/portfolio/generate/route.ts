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

    const prompt = `You are a professional portfolio website generator. Generate clean, modern, and highly visually appealing HTML for a developer portfolio.
    
Developer Information:
- Name: ${personalInfo?.name || resumeData?.fullName || "John Doe"}
- Email: ${personalInfo?.email || resumeData?.email || ""}
- Role: ${personalInfo?.role || resumeData?.targetRole || "Software Engineer"}
- Summary: ${resumeData?.summary || ""}
- Skills: ${Array.isArray(resumeData?.skills) ? resumeData.skills.join(", ") : resumeData?.skills || ""}
- Experience: ${JSON.stringify(resumeData?.experience || [])}
- Education: ${JSON.stringify(resumeData?.education || [])}
- GitHub: ${personalInfo?.github || ""}
- LinkedIn: ${personalInfo?.linkedin || ""}
- Template Style: ${template || "modern"} (modern=gradient dark, minimal=clean white, bold=vibrant colors)

CRITICAL INSTRUCTIONS FOR CONTENT:
1. ONLY use the actual details (name, email, role, summary, skills, experience, education, github, linkedin) provided above.
2. Do NOT invent, fabricate, or add any placeholder projects, experiences, certifications, or skills (such as "Deep Learning and Neural Networks" or mock projects) that are not provided in the inputs.
3. If no projects are explicitly mentioned in the experience list, do NOT render a projects section.
4. Render the GitHub icon/link using the exact URL: "${personalInfo?.github || ""}". If no URL is provided, omit the GitHub icon/link.
5. Render the LinkedIn icon/link using the exact URL: "${personalInfo?.linkedin || ""}". If no URL is provided, omit the LinkedIn icon/link.
6. The styling should feel extremely premium and modern.

Return ONLY valid JSON with this exact key:
{
  "html": "<!DOCTYPE html>...complete standalone HTML file with embedded CSS and all content..."
}

Requirements for the HTML design & visibility:
- Completely standalone (no external CDN JavaScript, you can use font-awesome or Google Fonts link tags for icons/fonts).
- All CSS embedded in a <style> tag.
- Visual theme based on template:
  - 'modern': A premium dark theme (background: #030712) with subtle indigo/violet/pink gradient glow, glassmorphism cards (rgba(255,255,255,0.03)), clean typography (Inter/Geist), and colored tag capsules.
  - 'minimal': A clean white background with elegant charcoal typography, high-contrast borders, and spacious layout.
  - 'bold': Vibrant, high-contrast colors, dark background with neon border accents.
- Mobile responsive with CSS media queries.
- Clean timelines for experience and education.
- Footer with social links using the actual URLs provided.
- Do NOT wrap the response in markdown code fences.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a portfolio HTML generator. Generate complete, production-ready standalone HTML files. Return only valid JSON with the html field." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content || "{}";
    let parsed: any = {};
    try { 
      parsed = JSON.parse(content); 
    } catch { 
      parsed = { html: "<html><body>Generation failed</body></html>" }; 
    }

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
