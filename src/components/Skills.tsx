
"use client";

import { ProfileData } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

export function Skills({ data }: { data: ProfileData }) {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.skills.map((category) => (
            <div key={category.category} className="bg-white rounded-3xl p-8 shadow-sm border border-muted hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="h-1 w-6 bg-accent rounded-full" />
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-background text-foreground hover:bg-accent hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
