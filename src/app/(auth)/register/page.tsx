"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      
      <Tabs defaultValue="signup" className="w-full max-w-md">

        {/* Centered Tabs */}
        

        {/* SIGNUP */}
        <TabsContent value="signup">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Student Signup</CardTitle>
              <CardDescription>
                Create your account by filling in the details
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>

              <div>
                <Label htmlFor="enrollment">Enrollment No</Label>
                <Input id="enrollment" placeholder="Enter enrollment number" />
              </div>

              <div>
                <Label htmlFor="programme">Programme</Label>
                <Input id="programme" placeholder="B.Tech / BCA / MCA..." />
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="CSE / IT / Mechanical..." />
              </div>

              <div>
                <Label htmlFor="batch">Batch</Label>
                <Input id="batch" placeholder="2022 - 2026" />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create password" />
              </div>

              <Button className="w-full">Sign Up</Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}

export default Page