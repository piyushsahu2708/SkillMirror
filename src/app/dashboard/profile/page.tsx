
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Samantha Bee",
    headline: "Senior Technical Recruiter @ TechCorp",
    role: "Recruiter",
    company: "TechCorp",
    email: "samantha.b@example.com",
    bio: "Experienced recruiter specializing in sourcing and hiring top-tier talent for fast-growing technology companies. Passionate about connecting people with opportunities.",
    skills: "Technical Recruiting, Talent Sourcing, Candidate Experience, React, Node.js",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, you would make an API call to save the profile data.
    setIsEditing(false);
    // You might also show a toast notification for success.
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline">My Profile</CardTitle>
            <CardDescription>Manage your personal and professional information.</CardDescription>
          </div>
          <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            name="headline"
            value={profile.headline}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="e.g. Full Stack Developer | React, Node.js"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={profile.role}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company / College</Label>
              <Input
                id="company"
                name="company"
                value={profile.company}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={profile.email}
            disabled
            className="cursor-not-allowed opacity-70"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            disabled={!isEditing}
            rows={4}
            placeholder="Tell us a little about yourself"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="e.g. React, TypeScript, Project Management"
          />
          <p className="text-xs text-muted-foreground">
            Separate skills with commas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
