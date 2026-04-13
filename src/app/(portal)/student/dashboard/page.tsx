import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Student dashboard with phase status and current progress",
}

export default function StudentDashboardPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Phase Status Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Phase Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Phase 1</span>
                <span className="text-green-600">Done</span>
              </div>
              <Progress value={100} />
              
              <div className="flex items-center justify-between">
                <span>Phase 2</span>
                <span className="text-blue-600">Active</span>
              </div>
              <Progress value={60} />
              
              <div className="flex items-center justify-between">
                <span>Phase 3</span>
                <span className="text-gray-500">Locked</span>
              </div>
              <Progress value={0} />
            </div>
          </CardContent>
        </Card>

        {/* Current Score and Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">85/100</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Dr. John Smith</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Deadline</CardTitle>
            </CardHeader>
            <CardContent>
              <p>3 days left</p>
            </CardContent>
          </Card>
        </div>

        {/* Latest Feedback Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Great work on the project structure. Consider improving the documentation for better clarity.
            </p>
          </CardContent>
        </Card>

        {/* Quick Submit Button */}
        <div className="flex justify-center">
          <Button size="lg">Quick Submit</Button>
        </div>
      </div>
    </main>
  )
}