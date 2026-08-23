
"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Linkedin, Github, Sparkles } from 'lucide-react';
import { ProfileData } from '@/lib/store';

export function Hero({ data }: { data: ProfileData }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden hero-gradient">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-primary/5 rounded-bl-[200px] blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/2 bg-accent/5 rounded-tr-[150px] blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-accent/15 text-accent text-sm font-bold tracking-wide uppercase border border-accent/20">
            <Sparkles className="h-4 w-4" />
            Empowering Business with Intelligent Software
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
            I&apos;m <span className="gradient-text">{data.name}</span>.
            <br />
            <span className="text-foreground/90">{data.title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-medium">
            {data.aboutMe}
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 h-14 px-10 text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Hire Me <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/5 gap-2 h-14 px-10 text-lg rounded-2xl border-2 transition-all hover:scale-105 active:scale-95">
              <Download className="h-5 w-5" /> Resume
            </Button>
            
            <div className="flex gap-4 ml-2 items-center border-l pl-8 border-muted">
              <a href={`https://${data.linkedIn}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-accent/10 hover:text-accent transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Button>
              </a>
              <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-accent/10 hover:text-accent transition-colors">
                  <Github className="h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
