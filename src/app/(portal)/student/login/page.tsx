"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentLoginPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Login</CardTitle>
                <CardDescription>Enter your email and password to access the portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Enter Your Email</Label>
                  <Input id="login-email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" placeholder="Enter password" />
                </div>
                <Button className="w-full">Login</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Signup</CardTitle>
                <CardDescription>
                  Create your account by filling in the details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollment">Enrollment No</Label>
                  <Input id="enrollment" placeholder="Enter enrollment number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="programme">Programme</Label>
                  <Input id="programme" placeholder="B.Tech / BCA / MCA..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="CSE / IT / Mechanical..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch</Label>
                  <Input id="batch" placeholder="2022 - 2026" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create password" />
                </div>
                <Button className="w-full">Sign Up</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}