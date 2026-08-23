
"use client";

import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  techStack: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface ProfileData {
  name: string;
  title: string;
  aboutMe: string;
  email: string;
  linkedIn: string;
  github: string;
  resumeUrl: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

const DEFAULT_DATA: ProfileData = {
  name: "Guna Sathvik Bezawada",
  title: "Software Engineer & AI Specialist",
  aboutMe: "I am a dedicated software engineer focused on building intelligent, scalable systems. With a strong foundation in full-stack development and a passion for Generative AI, I transform complex requirements into seamless user experiences. I specialize in modern web technologies and cloud-native architectures.",
  email: "guna.sathvik@example.com",
  linkedIn: "linkedin.com/in/gunasathvikbezawada",
  github: "github.com/gunasathvik",
  resumeUrl: "#",
  skills: [
    { category: "Core Development", items: ["Java", "Python", "TypeScript", "React", "Next.js"] },
    { category: "AI & Data", items: ["Genkit", "TensorFlow", "NLP", "Vector Databases", "LangChain"] },
    { category: "Infrastructure", items: ["AWS", "Docker", "Kubernetes", "Firebase", "CI/CD"] }
  ],
  experience: [
    {
      id: "1",
      company: "Innovate AI Labs",
      role: "Lead Software Developer",
      period: "2022 - Present",
      description: "Spearheading the development of AI-driven automation tools. Reduced manual processing time by 60% through custom LLM implementations."
    },
    {
      id: "2",
      company: "FutureTech Solutions",
      role: "Software Engineer",
      period: "2020 - 2022",
      description: "Built and scaled high-traffic web applications using React and Node.js. Implemented real-time data visualization dashboards for enterprise clients."
    }
  ],
  education: [
    {
      id: "1",
      school: "Indian Institute of Information Technology",
      degree: "B.Tech in Computer Science",
      year: "2020"
    }
  ],
  projects: [
    {
      id: "1",
      name: "AI Talent Analyzer",
      description: "An AI-powered tool that analyzes resumes and provides architectural recommendations for tech stacks based on job descriptions.",
      imageUrl: "https://picsum.photos/seed/guna1/800/600",
      demoUrl: "#",
      githubUrl: "#",
      techStack: ["Next.js", "Genkit", "Tailwind"]
    },
    {
      id: "2",
      name: "CloudOps Orchestrator",
      description: "A centralized dashboard for managing multi-cloud resources with automated cost optimization alerts.",
      imageUrl: "https://picsum.photos/seed/guna2/800/600",
      demoUrl: "#",
      githubUrl: "#",
      techStack: ["React", "AWS SDK", "Go"]
    },
    {
      id: "3",
      name: "Nexus Social",
      description: "A secure, decentralized social platform focusing on privacy and developer community engagement.",
      imageUrl: "https://picsum.photos/seed/guna3/800/600",
      demoUrl: "#",
      githubUrl: "#",
      techStack: ["Solidity", "TypeScript", "Ether.js"]
    }
  ]
};

export function useProfileStore() {
  const [data, setData] = useState<ProfileData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('connectfolio_data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: Partial<ProfileData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('connectfolio_data', JSON.stringify(updated));
  };

  return { data, updateData, isLoaded };
}
