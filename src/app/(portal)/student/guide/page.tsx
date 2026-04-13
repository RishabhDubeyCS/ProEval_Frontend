import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "Guide Profile",
  description: "View and contact your project guide",
}

export default function StudentGuidePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Guide Profile</h1>
        
        {/* Guide Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Dr. John Smith</CardTitle>
            <CardDescription>Associate Professor, Computer Science</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Dr. John Smith</p>
                <p className="text-sm text-muted-foreground">john.smith@university.edu</p>
                <p className="text-sm text-muted-foreground">Office: Room 301, CS Building</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Office Hours</h4>
              <p className="text-sm text-muted-foreground">
                Monday: 2-4 PM<br />
                Wednesday: 10 AM - 12 PM<br />
                Friday: 3-5 PM
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Send Email</Button>
            <Button variant="outline" className="w-full">Request Meeting</Button>
          </CardContent>
        </Card>

        {/* Past Meeting Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Past Meeting Notes</CardTitle>
            <CardDescription>Record notes from your meetings with the guide</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes from your last meeting..."
              className="min-h-[100px]"
            />
            <Button className="mt-4">Save Notes</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}