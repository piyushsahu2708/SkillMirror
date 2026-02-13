'use server';

/**
 * @fileOverview This file contains a Genkit flow for generating AI-powered performance feedback after a candidate completes an assessment.
 *
 * @interface GeneratePerformanceFeedbackInput - Defines the input schema for the flow.
 * @interface GeneratePerformanceFeedbackOutput - Defines the output schema for the flow.
 * @function generatePerformanceFeedback - The main function that triggers the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePerformanceFeedbackInputSchema = z.object({
  assessmentTitle: z.string().describe('The title of the assessment taken.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the assessment.'),
  score: z.number().describe('The percentage score achieved by the candidate (0-100).'),
  totalQuestions: z.number().describe('The total number of questions in the assessment.'),
});

export type GeneratePerformanceFeedbackInput = z.infer<typeof GeneratePerformanceFeedbackInputSchema>;

const GeneratePerformanceFeedbackOutputSchema = z.object({
  strength: z.string().describe("A brief analysis of the candidate's strength areas based on their performance."),
  weakness: z.string().describe("A brief analysis of the candidate's weak areas that need improvement."),
  suggestion: z.string().describe("A specific, actionable suggestion for the candidate to improve their skills in the weak areas."),
  confidenceLevel: z.enum(['High', 'Medium', 'Low']).describe("The AI's confidence level in this feedback analysis."),
});

export type GeneratePerformanceFeedbackOutput = z.infer<typeof GeneratePerformanceFeedbackOutputSchema>;

const performanceFeedbackPrompt = ai.definePrompt({
  name: 'performanceFeedbackPrompt',
  input: {schema: GeneratePerformanceFeedbackInputSchema},
  output: {schema: GeneratePerformanceFeedbackOutputSchema},
  prompt: `You are an expert AI career coach specializing in technical skill development.
  A candidate has just completed a skills assessment. Analyze their performance and provide concise, constructive feedback.

  Assessment Details:
  - Title: {{{assessmentTitle}}}
  - Difficulty: {{{difficulty}}}
  - Score: {{{score}}}%
  - Total Questions: {{{totalQuestions}}}

  Based on these details, generate the following feedback:
  1.  **Strength**: Identify one key strength. If the score is high (>= 80%), praise their strong grasp. If the score is mid-range (50-79%), acknowledge their foundational knowledge. If the score is low (< 50%), find a positive aspect, e.g., "Attempted a challenging assessment."
  2.  **Weakness**: Identify the most likely area of weakness. If the score is high, the weakness might be about achieving mastery or speed. If the score is low, pinpoint a fundamental area they likely struggled with.
  3.  **Suggestion**: Provide a single, actionable suggestion for improvement directly related to the weakness. For example, "Focus on practicing with React Hooks like useEffect and useMemo to better manage state and performance."
  4.  **Confidence Level**: Based on the limited data, rate your confidence in this analysis as High, Medium, or Low.

  Your response must be structured according to the defined output schema. Be encouraging but realistic.`,
});

const generatePerformanceFeedbackFlow = ai.defineFlow(
  {
    name: 'generatePerformanceFeedbackFlow',
    inputSchema: GeneratePerformanceFeedbackInputSchema,
    outputSchema: GeneratePerformanceFeedbackOutputSchema,
  },
  async input => {
    const {output} = await performanceFeedbackPrompt(input);
    return output!;
  }
);

export async function generatePerformanceFeedback(input: GeneratePerformanceFeedbackInput): Promise<GeneratePerformanceFeedbackOutput> {
  return generatePerformanceFeedbackFlow(input);
}
