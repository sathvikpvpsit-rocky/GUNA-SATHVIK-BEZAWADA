
"use client";

import { useProfileStore } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AboutMe } from '@/components/AboutMe';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { data, isLoaded } = useProfileStore();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero data={data} />
        <AboutMe data={data} />
        <Skills data={data} />
        <Projects data={data} />
        <Contact />
      </main>
      
      <footer className="bg-primary text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold">
            Connect<span className="text-accent">Folio</span>
          </div>
          <div className="text-sm text-white/50">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">GitHub</a>
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
