"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentTeamPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    contribution: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);

    // Reset form
    setForm({
      name: "",
      email: "",
      role: "",
      contribution: "",
    });
  };

  return (
    <main className="container mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold">Team Management</h1>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Current team composition</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar><AvatarFallback>JS</AvatarFallback></Avatar>
              <div>
                <p className="font-medium">John Smith</p>
                <Badge>Leader</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Planning</p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <div className="relative rounded-2xl border p-1 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-20 blur-xl rounded-2xl"></div>

        <div className="relative bg-background rounded-2xl p-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Team Member</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Role</Label>
                  <Select onValueChange={(val) => setForm({ ...form, role: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leader">Leader</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Contribution</Label>
                  <Textarea
                    value={form.contribution}
                    onChange={(e) =>
                      setForm({ ...form, contribution: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Member
                </Button>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}