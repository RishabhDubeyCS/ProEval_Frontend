import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata: Metadata = {
  title: "Submit Project",
  description: "Submit your project for evaluation",
}

export default function StudentSubmitPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Submit Project</h1>
        
        {/* Step 1: Project Info */}
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Project Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input id="projectTitle" placeholder="Enter project title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Project description" />
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Guide Confirmation */}
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Guide Confirmation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Confirm your guide: Dr. John Smith</p>
            <Button variant="outline">Confirm</Button>
          </CardContent>
        </Card>

        {/* Step 3: Upload Files */}
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report">Report</Label>
              <Input id="report" type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slides">Slides</Label>
              <Input id="slides" type="file" />
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Self-assessment Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Self-assessment Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="check1" />
              <Label htmlFor="check1">Code is well-documented</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check2" />
              <Label htmlFor="check2">Report is complete</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check3" />
              <Label htmlFor="check3">Slides are professional</Label>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Final Submit */}
        <Card>
          <CardHeader>
            <CardTitle>Step 5: Final Submit</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Review all information before submitting. Form will lock after submission.</p>
            <Button className="w-full">Submit Project</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}