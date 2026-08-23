
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin, Github, Send, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Let&apos;s build something <span className="text-accent">extraordinary</span> together.</h2>
            <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-md">
              Whether you have a question or just want to say hi, my inbox is always open. Let&apos;s discuss your next project!
            </p>

            <div className="space-y-6">
              <a href="mailto:alex@example.com" className="flex items-center gap-4 group">
                <div className="p-4 rounded-2xl bg-white/10 group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/50 font-medium">Email Me</p>
                  <p className="text-xl font-bold">hello@connectfolio.com</p>
                </div>
              </a>
              <div className="flex gap-4 pt-6">
                <Button variant="outline" size="lg" className="rounded-2xl border-white/20 hover:bg-white/10 text-white gap-2">
                  <Linkedin className="h-5 w-5" /> LinkedIn
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl border-white/20 hover:bg-white/10 text-white gap-2">
                  <FileText className="h-5 w-5" /> Download Resume
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 text-foreground shadow-2xl">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Name</label>
                  <Input placeholder="John Doe" className="rounded-xl border-muted bg-background focus:ring-accent" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email</label>
                  <Input type="email" placeholder="john@example.com" className="rounded-xl border-muted bg-background focus:ring-accent" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Subject</label>
                <Input placeholder="Project Inquiry" className="rounded-xl border-muted bg-background focus:ring-accent" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Message</label>
                <Textarea placeholder="Tell me about your project..." className="rounded-xl min-h-[120px] border-muted bg-background focus:ring-accent" required />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white h-12 rounded-xl gap-2 font-bold">
                Send Message <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
