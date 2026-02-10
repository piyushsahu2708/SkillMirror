"use client";

import { useState, useRef } from 'react';
import { users } from "@/lib/data"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, UserCircle, Camera } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  // In a real app, you'd get this from an auth hook/session.
  // Hardcoding "Samantha Bee" (recruiter) for demonstration.
  const user = users.find(u => u.id === 'user-2'); 

  if (!user) {
    notFound();
  }

  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-0 rounded-full h-8 w-8 bg-background/80 hover:bg-background"
              onClick={handleEditClick}
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change profile picture</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
          <p className="text-muted-foreground">{user.headline}</p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
                <UserCircle className="size-4 text-muted-foreground" />
                <Badge variant="outline" className="capitalize">{user.role}</Badge>
            </div>
          </div>
          {user.skills && user.skills.length > 0 && (
               <>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap justify-center gap-2">
                      {user.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                          {skill}
                          </Badge>
                      ))}
                  </div>
               </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
