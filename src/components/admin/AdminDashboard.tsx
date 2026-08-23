
"use client";

import { useState } from 'react';
import { useProfileStore, ProfileData, Project } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Sparkles, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { optimizeAboutMeStatement } from '@/ai/flows/optimize-about-me-statement-flow';
import { enhanceProjectDescription } from '@/ai/flows/enhance-project-description-flow';

export function AdminDashboard() {
  const { data, updateData, isLoaded } = useProfileStore();
  const { toast } = useToast();
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isLoaded) return <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin" /></div>;

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    updateData({
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      aboutMe: formData.get('aboutMe') as string,
    });
    toast({ title: "Profile updated successfully!" });
  };

  const handleOptimizeAboutMe = async () => {
    setIsAiLoading(true);
    try {
      const result = await optimizeAboutMeStatement({ aboutMeStatement: data.aboutMe });
      updateData({ aboutMe: result.optimizedStatement });
      toast({ title: "AI Enhancement complete!" });
    } catch (err) {
      toast({ title: "AI Enhancement failed", variant: "destructive" });
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleEnhanceProject = async (id: string) => {
    const project = data.projects.find(p => p.id === id);
    if (!project) return;

    setIsAiLoading(true);
    try {
      const result = await enhanceProjectDescription({
        projectName: project.name,
        currentDescription: project.description
      });
      const updatedProjects = data.projects.map(p => 
        p.id === id ? { ...p, description: result.enhancedDescription } : p
      );
      updateData({ projects: updatedProjects });
      toast({ title: "Project enhanced by AI!" });
    } catch (err) {
      toast({ title: "AI Enhancement failed", variant: "destructive" });
    } finally {
      setIsAiLoading(false);
    }
  };

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Project",
      description: "Description of your amazing work",
      imageUrl: "https://picsum.photos/seed/new/800/600",
      demoUrl: "#",
      githubUrl: "#",
      techStack: ["React"]
    };
    updateData({ projects: [...data.projects, newProject] });
  };

  const deleteProject = (id: string) => {
    updateData({ projects: data.projects.filter(p => p.id !== id) });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">ConnectFolio Admin</h1>
          <p className="text-muted-foreground">Manage your portfolio content and use AI to enhance your profile.</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Site
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="bg-muted p-1 rounded-xl">
          <TabsTrigger value="profile" className="rounded-lg px-8">General Profile</TabsTrigger>
          <TabsTrigger value="projects" className="rounded-lg px-8">Projects Portfolio</TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg px-8">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Update your personal details and professional summary.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input name="name" defaultValue={data.name} required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Professional Title</Label>
                    <Input name="title" defaultValue={data.title} required className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>About Me Statement</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleOptimizeAboutMe}
                      disabled={isAiLoading}
                      className="text-accent hover:text-accent hover:bg-accent/10 gap-2"
                    >
                      {isAiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      Optimize with AI
                    </Button>
                  </div>
                  <Textarea 
                    name="aboutMe" 
                    value={data.aboutMe} 
                    onChange={(e) => updateData({ aboutMe: e.target.value })}
                    className="rounded-xl min-h-[150px]" 
                  />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Projects</h2>
            <Button onClick={addProject} className="bg-accent hover:bg-accent/90 rounded-xl gap-2">
              <Plus className="h-4 w-4" /> Add Project
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((project) => (
              <Card key={project.id} className="rounded-3xl border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Project Details</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input 
                      value={project.name} 
                      onChange={(e) => {
                        const updated = data.projects.map(p => p.id === project.id ? { ...p, name: e.target.value } : p);
                        updateData({ projects: updated });
                      }}
                      className="rounded-xl" 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Description</Label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEnhanceProject(project.id)}
                        disabled={isAiLoading}
                        className="text-accent gap-2"
                      >
                         <Sparkles className="h-4 w-4" /> Enhance
                      </Button>
                    </div>
                    <Textarea 
                      value={project.description} 
                      onChange={(e) => {
                        const updated = data.projects.map(p => p.id === project.id ? { ...p, description: e.target.value } : p);
                        updateData({ projects: updated });
                      }}
                      className="rounded-xl min-h-[100px]" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Demo URL</Label>
                      <Input value={project.demoUrl} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input value={project.githubUrl} className="rounded-xl" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills">
           <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Skills & Proficiency</CardTitle>
              <CardDescription>Categorize your technical expertise.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic mb-4">Skill editing interface placeholder. You can manage your categorized skills here.</p>
              {data.skills.map(cat => (
                <div key={cat.category} className="mb-6 p-4 rounded-xl bg-muted/20">
                  <h4 className="font-bold text-primary mb-2">{cat.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map(item => (
                      <span key={item} className="px-3 py-1 bg-white border rounded-full text-xs font-medium">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
