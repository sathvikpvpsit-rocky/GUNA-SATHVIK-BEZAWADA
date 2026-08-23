
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, User, Code, Mail, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', icon: User },
    { label: 'Skills', href: '#skills', icon: Briefcase },
    { label: 'Projects', href: '#projects', icon: Code },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md border-b shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
          Connect<span className="text-accent">Folio</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/admin">
            <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white">
              <LayoutDashboard className="h-4 w-4" />
              Manage
            </Button>
          </Link>
        </div>

        {/* Mobile trigger could go here, keeping it simple for now */}
      </div>
    </nav>
  );
}
