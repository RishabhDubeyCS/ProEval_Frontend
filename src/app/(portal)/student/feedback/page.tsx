import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Feedback",
  description: "View AI-generated feedback and scores",
}

export default function StudentFeedbackPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Feedback</h1>
        
        <Tabs defaultValue="phase1" className="w-full">
          <TabsList>
            <TabsTrigger value="phase1">Phase 1</TabsTrigger>
            <TabsTrigger value="phase2">Phase 2</TabsTrigger>
            <TabsTrigger value="phase3">Phase 3</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phase1" className="space-y-6">
            {/* AI Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>AI Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Technical Skills</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Documentation</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Presentation</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} />
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Excellent code structure</li>
                  <li>Clear documentation</li>
                  <li>Good use of best practices</li>
                </ul>
              </CardContent>
            </Card>

            {/* Areas to Improve */}
            <Card>
              <CardHeader>
                <CardTitle>Areas to Improve Before Next Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Add more detailed comments</li>
                  <li>Improve error handling</li>
                  <li>Enhance UI/UX</li>
                </ul>
              </CardContent>
            </Card>

            {/* AI-generated Viva Questions */}
            <Card>
              <CardHeader>
                <CardTitle>AI-generated Viva Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p>What is the purpose of your project?</p>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Easy</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>Explain the algorithm you used.</p>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>How would you optimize this for production?</p>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Hard</span>
                </div>
              </CardContent>
            </Card>

            {/* Growth Bonus */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Bonus</CardTitle>
              </CardHeader>
              <CardContent>
                <p>You've shown significant improvement from Phase 1. +5 points bonus awarded for growth.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="phase2">
            <p>Phase 2 feedback will be available after submission.</p>
          </TabsContent>
          
          <TabsContent value="phase3">
            <p>Phase 3 feedback will be available after submission.</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}