
"use client";

import { ProfileData } from '@/lib/store';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Projects({ data }: { data: ProfileData }) {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-black tracking-tight mb-6">Featured Creations</h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              A curated selection of my most impactful work, spanning AI applications, cloud infrastructure, and innovative web platforms.
            </p>
          </div>
          <Button variant="outline" size="lg" className="rounded-2xl gap-2 border-primary text-primary hover:bg-primary hover:text-white border-2 px-8 py-6 text-lg font-bold group">
            All Projects <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-none shadow-2xl bg-background rounded-[2.5rem] transition-all hover:-translate-y-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="software project"
                />
                <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6">
                  <Button size="icon" className="h-14 w-14 rounded-full bg-white text-primary hover:bg-accent hover:text-white transition-all scale-75 group-hover:scale-100 delay-75">
                    <ExternalLink className="h-6 w-6" />
                  </Button>
                  <Button size="icon" className="h-14 w-14 rounded-full bg-white text-primary hover:bg-accent hover:text-white transition-all scale-75 group-hover:scale-100 delay-150">
                    <Github className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-10 pb-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-accent/10 text-[10px] font-black uppercase tracking-widest text-accent border border-accent/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors">{project.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg line-clamp-3">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="p-10 pt-6">
                 <Link href={project.demoUrl} className="text-primary font-black text-lg inline-flex items-center gap-2 hover:gap-4 transition-all">
                    View Case Study <ArrowRight className="h-5 w-5" />
                 </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
