'use server';
/**
 * @fileOverview An AI assistant to help refine 'About Me' statements for conciseness, impact, and recruiter engagement.
 *
 * - optimizeAboutMeStatement - A function that handles the optimization of an 'About Me' statement.
 * - OptimizeAboutMeStatementInput - The input type for the optimizeAboutMeStatement function.
 * - OptimizeAboutMeStatementOutput - The return type for the optimizeAboutMeStatement function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OptimizeAboutMeStatementInputSchema = z.object({
  aboutMeStatement: z.string().describe("The user's current 'About Me' statement."),
});
export type OptimizeAboutMeStatementInput = z.infer<typeof OptimizeAboutMeStatementInputSchema>;

const OptimizeAboutMeStatementOutputSchema = z.object({
  optimizedStatement: z
    .string()
    .describe("The AI-optimized 'About Me' statement, refined for conciseness, impact, and recruiter engagement."),
});
export type OptimizeAboutMeStatementOutput = z.infer<typeof OptimizeAboutMeStatementOutputSchema>;

export async function optimizeAboutMeStatement(
  input: OptimizeAboutMeStatementInput
): Promise<OptimizeAboutMeStatementOutput> {
  return optimizeAboutMeStatementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeAboutMeStatementPrompt',
  input: { schema: OptimizeAboutMeStatementInputSchema },
  output: { schema: OptimizeAboutMeStatementOutputSchema },
  prompt: `You are an expert career coach specializing in optimizing personal statements for tech recruiters.

Your task is to take the provided 'About Me' statement and refine it to be more concise, impactful, and highly engaging for recruiters and tech professionals.
Focus on highlighting key skills, achievements, and career aspirations that align with typical tech roles. Ensure the tone is professional and confident.

Original 'About Me' Statement:
"""
{{{aboutMeStatement}}}
"""

Optimized 'About Me' Statement:`,
});

const optimizeAboutMeStatementFlow = ai.defineFlow(
  {
    name: 'optimizeAboutMeStatementFlow',
    inputSchema: OptimizeAboutMeStatementInputSchema,
    outputSchema: OptimizeAboutMeStatementOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
