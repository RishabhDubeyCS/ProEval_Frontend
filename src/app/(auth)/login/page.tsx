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

      <Tabs defaultValue="login" className="w-full max-w-md">

        {/* Tabs Header */}
      
        {/* Login Tab */}
        <TabsContent value="login" className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login as Student or Faculty using your credentials
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Role Selection */}
              <div>
                <Label htmlFor="role">Login As</Label>
                <select
                  id="role"
                  className="w-full border rounded-md p-2"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="you@example.com" />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>

              {/* Button */}
              <Button className="w-full">Login</Button>

            </CardContent>
          </Card>

        </TabsContent>

      </Tabs>
    </div>
  )
}

export default Page