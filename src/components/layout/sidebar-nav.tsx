"use client";

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, ClipboardList, Users, ShieldCheck, UserCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// In a real app, you'd get this from auth context
const useUserRole = () => {
    // Cycle through roles for demo purposes based on URL or other state
    const pathname = usePathname();
    if (pathname.includes('/admin')) return 'admin';
    if (pathname.includes('/candidates')) return 'recruiter';
    return 'candidate';
};


export function SidebarNav() {
  const pathname = usePathname();
  const role = useUserRole();

  const commonLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
  ];

  const roleLinks = {
    candidate: [
      { href: '/dashboard/assessments', label: 'Assessments', icon: ClipboardList, badge: '3' },
    ],
    recruiter: [
      { href: '/dashboard/candidates', label: 'Candidates', icon: Users },
      { href: '/dashboard/assessments/manage', label: 'Assessments', icon: ClipboardList },
    ],
    admin: [
      { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
      { href: '/dashboard/admin/assessments', label: 'Manage Assessments', icon: ShieldCheck },
      { href: '/dashboard/admin/settings', label: 'Platform Settings', icon: Settings },
    ],
  };

  const navLinks = [...commonLinks, ...(roleLinks[role] || [])];

  return (
    <SidebarMenu className="p-2">
      {navLinks.map((link) => {
        const isActive = link.href === '/dashboard' 
          ? pathname === link.href 
          : pathname.startsWith(link.href);
        
        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              className="w-full justify-start"
              isActive={isActive}
              tooltip={link.label}
            >
              <Link href={link.href}>
                <link.icon className="size-4 shrink-0" />
                <span className="truncate">{link.label}</span>
                {link.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
