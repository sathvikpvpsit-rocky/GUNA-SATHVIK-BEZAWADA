
"use client";

import { ProfileData } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

export function AboutMe({ data }: { data: ProfileData }) {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Experience Section */}
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Briefcase className="h-7 w-7" />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Professional Journey</h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-md">
                A track record of delivering high-impact solutions across diverse technical landscapes.
              </p>
            </div>
            
            <div className="relative pl-8 space-y-12 border-l-2 border-primary/20">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[42px] top-1.5 h-5 w-5 rounded-full bg-accent border-4 border-background shadow-lg transition-transform group-hover:scale-125" />
                  <div className="space-y-3 p-6 rounded-3xl transition-colors hover:bg-muted/50">
                    <span className="text-sm font-bold text-accent uppercase tracking-widest">{exp.period}</span>
                    <h3 className="text-2xl font-black">{exp.role}</h3>
                    <p className="text-primary font-bold text-lg">{exp.company}</p>
                    <p className="text-muted-foreground leading-relaxed text-lg">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Values Section */}
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Education</h2>
              </div>
              
              <div className="grid gap-6">
                {data.education.map((edu) => (
                  <Card key={edu.id} className="border-none shadow-xl bg-card rounded-[2rem] overflow-hidden group hover:shadow-accent/5 transition-all">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-black text-2xl group-hover:text-primary transition-colors">{edu.school}</h3>
                        <span className="px-4 py-1.5 rounded-full bg-secondary text-sm font-bold">{edu.year}</span>
                      </div>
                      <p className="text-muted-foreground text-xl font-medium">{edu.degree}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-primary text-white space-y-6 relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <h3 className="text-3xl font-black flex items-center gap-3">
                My Philosophy <CheckCircle2 className="h-6 w-6 text-accent" />
              </h3>
              <p className="text-xl opacity-90 leading-relaxed italic font-medium">
                &quot;I believe that the true power of software lies in its ability to augment human capability. My mission is to build AI-driven tools that don&apos;t just automate tasks, but inspire innovation and simplify the complex.&quot;
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-1 w-20 bg-accent rounded-full" />
                <span className="font-bold tracking-widest uppercase text-accent text-sm">Design • Code • Scale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
