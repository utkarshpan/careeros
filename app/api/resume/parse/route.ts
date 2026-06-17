import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

// ✅ Make sure POST is exported
export async function POST(req: NextRequest) {
  console.log("API /api/resume/parse called");

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("File received:", file.name, file.size);

    // Mock response for now (Gemini will be added later)
    const mockResumeData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+91 9876543210",
      skills: ["JavaScript", "React", "Node.js", "TypeScript"],
      experience: [
        {
          company: "Tech Corp",
          role: "Frontend Developer",
          duration: "2022 - Present",
          achievements: [
            "Built responsive web applications with React",
            "Improved performance by 35%",
            "Collaborated with design team"
          ]
        }
      ],
      education: [
        {
          degree: "B.Tech Computer Science",
          institution: "University Name",
          year: "2022"
        }
      ],
      summary: "Passionate developer with experience in modern web technologies."
    };

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(mockResumeData);

  } catch (error: any) {
    console.error("Parse error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse resume" },
      { status: 500 }
    );
  }
}