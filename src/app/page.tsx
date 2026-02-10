import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, ClipboardList, TrendingUp, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/icons";

export default function Home() {
  const features = [
    {
      icon: <ClipboardList className="size-8 text-primary" />,
      title: "Targeted Assessments",
      description: "Create and assign role-based tests with MCQs and real-world coding challenges.",
    },
    {
      icon: <TrendingUp className="size-8 text-primary" />,
      title: "Credibility Scoring",
      description: "Go beyond scores with our AI-powered credibility metric, analyzing consistency and accuracy.",
    },
    {
      icon: <Users className="size-8 text-primary" />,
      title: "Recruiter Dashboard",
      description: "Efficiently filter, sort, and view verified candidates based on skills and credibility.",
    },
    {
      icon: <ShieldCheck className="size-8 text-primary" />,
      title: "Secure & Fair",
      description: "Ensure test integrity with time limits, secure authentication, and AI-driven proctoring.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Logo className="size-6 text-primary" />
          <span className="text-lg font-semibold font-headline">SkillMirror</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Verify Skills, Hire with Confidence
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    SkillMirror is the ultimate platform for verifying the real-world technical abilities of your candidates. Move beyond resumes and identify top talent with structured assessments and AI-powered credibility scoring.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Access Dashboard</Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="#">View Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="absolute inset-8 bg-accent/10 rounded-full blur-3xl animation-delay-2000"></div>
                  <Logo className="relative w-full h-full text-primary/80" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose SkillMirror?</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed from the ground up to provide a fair, transparent, and efficient way to evaluate technical talent.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to Revolutionize Your Hiring?
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join leading companies who trust SkillMirror to build world-class teams.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild className="w-full" size="lg">
                <Link href="/dashboard">Sign Up for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-foreground/60">&copy; {new Date().getFullYear()} SkillMirror. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
