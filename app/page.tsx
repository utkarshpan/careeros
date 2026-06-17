import Link from "next/link";
import {
  Sparkles,
  FileText,
  ScanSearch,
  BrainCircuit,
  Briefcase,
  Video,
  Code2,
  Share2,
  Layout,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  ChevronRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    description: "Build ATS-optimized resumes with AI-powered suggestions and real-time formatting.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: ScanSearch,
    title: "ATS Scanner",
    description: "Scan your resume against job descriptions and get an instant compatibility score.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: BrainCircuit,
    title: "AI Career Mentor",
    description: "Get personalized career guidance and roadmap recommendations from AI.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Briefcase,
    title: "Internship Finder",
    description: "Discover relevant internships matching your skills, location, and interests.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Video,
    title: "AI Interview Coach",
    description: "Practice mock interviews with AI and get detailed feedback on your answers.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Code2,
    title: "Coding Tracker",
    description: "Track your DSA progress across platforms and identify weak areas to improve.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Share2,
    title: "LinkedIn Optimizer",
    description: "Optimize your LinkedIn profile for recruiter visibility and personal branding.",
    color: "from-sky-500 to-indigo-600",
  },
  {
    icon: Layout,
    title: "Portfolio Generator",
    description: "Generate a stunning portfolio website from your resume data in minutes.",
    color: "from-fuchsia-500 to-purple-600",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your skills, target role, and career goals.",
    icon: Target,
  },
  {
    step: "02",
    title: "Use AI-Powered Tools",
    description: "Access 8 specialized modules to build, practice, and optimize your career assets.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Land Your Dream Job",
    description: "Apply with confidence using your AI-optimized resume, skills, and interview prep.",
    icon: CheckCircle2,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white shadow-md shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight gradient-text">
              CareerOS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="gradient-bg text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-accent/8 blur-3xl animate-float-delayed" />
        <div className="absolute top-[40%] right-[30%] w-64 h-64 rounded-full bg-success/6 blur-3xl animate-float-slow" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Platform for Students
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] animate-slide-up">
            From Learning to Hiring.
            <br />
            <span className="gradient-text">All in One Place.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            AI-powered platform that takes students from learning → building →
            applying → interviewing → getting hired.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up delay-300">
            <Link
              href="/sign-up"
              className="gradient-bg text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl font-semibold text-lg border border-border hover:bg-muted transition-all duration-300 text-foreground"
            >
              View Demo
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-up delay-400">
            {[
              { value: "10,000+", label: "Students Helped" },
              { value: "5,000+", label: "Resumes Built" },
              { value: "8", label: "AI Modules" },
              { value: "85%", label: "Success Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="h-3.5 w-3.5" />
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Everything You Need to{" "}
              <span className="gradient-text">Land Your Dream Job</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              8 AI-powered modules designed to prepare you for every stage of
              your career journey.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 from-primary to-accent" />

                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center justify-center rounded-xl p-3 mb-4 bg-gradient-to-br ${feature.color} text-white shadow-sm`}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <Target className="h-3.5 w-3.5" />
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Three Steps to{" "}
              <span className="gradient-text">Career Success</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative text-center group">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="flex flex-col items-center">
                  {/* Step number */}
                  <div className="relative mb-6">
                    <div className="h-24 w-24 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:-translate-y-1 transition-all duration-300">
                      <step.icon className="h-10 w-10" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-card border-2 border-primary text-primary font-bold text-sm flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 sm:p-16 text-center text-white">
            {/* Decorative orbs */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Ready to Accelerate Your Career?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of students who&apos;ve already transformed their
                career preparation with AI-powered tools.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started for Free
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold gradient-text">CareerOS</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">
                How it Works
              </a>
              <Link href="/sign-in" className="hover:text-foreground transition-colors">
                Sign In
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CareerOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}