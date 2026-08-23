'use server';
/**
 * @fileOverview An AI assistant for enhancing project descriptions for recruiters.
 *
 * - enhanceProjectDescription - A function that enhances a project description.
 * - EnhanceProjectDescriptionInput - The input type for the enhanceProjectDescription function.
 * - EnhanceProjectDescriptionOutput - The return type for the enhanceProjectDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EnhanceProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  currentDescription: z
    .string()
    .describe('The current description of the project to be enhanced.'),
  userGoal: z
    .string()
    .optional()
    .describe(
      'Optional specific goal for the enhancement (e.g., "make it more concise", "focus on technical achievements").'
    ),
});
export type EnhanceProjectDescriptionInput = z.infer<
  typeof EnhanceProjectDescriptionInputSchema
>;

const EnhanceProjectDescriptionOutputSchema = z.object({
  enhancedDescription: z
    .string()
    .describe('The AI-enhanced project description.'),
  suggestions: z
    .array(z.string())
    .optional()
    .describe('Optional suggestions for further improvement.'),
});
export type EnhanceProjectDescriptionOutput = z.infer<
  typeof EnhanceProjectDescriptionOutputSchema
>;

export async function enhanceProjectDescription(
  input: EnhanceProjectDescriptionInput
): Promise<EnhanceProjectDescriptionOutput> {
  return enhanceProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceProjectDescriptionPrompt',
  input: { schema: EnhanceProjectDescriptionInputSchema },
  output: { schema: EnhanceProjectDescriptionOutputSchema },
  prompt: `You are a professional copywriter specializing in crafting compelling project descriptions for tech recruiters and hiring managers. Your goal is to make the project stand out, highlight key achievements, and ensure clarity and conciseness.

Project Name: {{{projectName}}}

Current Description: {{{currentDescription}}}

{{#if userGoal}}
Specific Goal for Enhancement: {{{userGoal}}}

{{/if}}
Based on the above, provide an enhanced project description. Also, offer any additional suggestions for further improvement. Focus on action verbs, quantifiable results, and relevance to common tech roles.`,
});

const enhanceProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'enhanceProjectDescriptionFlow',
    inputSchema: EnhanceProjectDescriptionInputSchema,
    outputSchema: EnhanceProjectDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
