"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    assessmentAlerts: true,
    twoFactorAuth: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <Label htmlFor="dark-mode" className="font-medium">
              Dark Mode
            </Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={() => toggleSetting("darkMode")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Control how you receive notifications from SkillMirror.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between p-4 border rounded-lg">
            <Label htmlFor="email-notifications" className="font-medium">
              Email Notifications
            </Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => toggleSetting("emailNotifications")}
            />
          </div>
           <div className="flex items-center justify-between p-4 border rounded-lg">
            <Label htmlFor="assessment-alerts" className="font-medium">
              Assessment Alerts
            </Label>
            <Switch
              id="assessment-alerts"
              checked={settings.assessmentAlerts}
              onCheckedChange={() => toggleSetting("assessmentAlerts")}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your account security settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <Label htmlFor="two-factor-auth" className="font-medium">
              Two-Factor Authentication (2FA)
            </Label>
            <Switch
              id="two-factor-auth"
              checked={settings.twoFactorAuth}
              onCheckedChange={() => toggleSetting("twoFactorAuth")}
            />
          </div>
          <Separator />
           <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg">
              <div>
                <Label className="font-medium">Logout From All Devices</Label>
                <p className="text-sm text-muted-foreground">This will sign you out of all other active sessions.</p>
              </div>
              <Button variant="destructive" >
                Logout
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
