import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight mb-4">
        ProEval <span className="text-primary">AI</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-[600px] mb-8">
        The ultimate platform for project evaluation and student progress tracking. 
        Streamline your academic journey with AI-powered insights.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/login">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/student">Student Portal</Link>
        </Button>
      </div>
    </main>
  )
}
