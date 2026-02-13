'use server';

/**
 * @fileOverview This file contains a Genkit flow for analyzing a candidate's resume against their assessment performance.
 *
 * @interface AnalyzeResumeInput - Defines the input schema for the analyzeResume flow.
 * @interface AnalyzeResumeOutput - Defines the output schema for the analyzeResume flow.
 * @function analyzeResume - The main function that triggers the flow and returns the analysis result.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeText: z.string().describe("The full text content of a user's resume."),
  assessmentPerformance: z.string().describe('A JSON string representing the user\'s performance in various skill assessments. e.g., `[{"skill": "React", "score": 92}, {"skill": "TypeScript", "score": 78}]`'),
});

export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  extractedSkills: z.array(z.string()).describe('A list of technical skills extracted from the resume text.'),
  skillGaps: z
    .array(
      z.object({
        skill: z.string(),
        resumeClaim: z.string().describe("What the resume claims about the user's proficiency in this skill (e.g., 'Advanced', 'Proficient', 'Experience with')."),
        assessmentFinding: z.string().describe("What the assessment data suggests about the user's proficiency based on their score."),
        match: z.enum(['Strong Match', 'Partial Match', 'Mismatch', 'Not Assessed']).describe('The level of match between the resume and assessments for this skill.'),
      })
    )
    .describe('An analysis of the gap between skills claimed on the resume and performance in assessments.'),
  overallSummary: z.string().describe('A brief overall summary of the comparison between the resume and the skill assessments.'),
});

export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

const analyzeResumePrompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert technical recruiter and skills analyst. Your task is to analyze a candidate's resume and compare the skills mentioned against their performance in technical assessments.

    **Candidate Resume Text:**
    {{{resumeText}}}

    **Candidate Assessment Performance:**
    {{{assessmentPerformance}}}

    **Your Analysis:**
    1.  First, carefully read the resume and extract all technical skills mentioned (e.g., React, Python, Docker, etc.).
    2.  Next, for each key extracted skill, compare it against the provided assessment performance data.
    3.  Identify any gaps or mismatches. For instance, if the resume claims "Expert in TypeScript" but the assessment score for a related skill is 68%, this is a 'Mismatch'. If a skill is on the resume but not in the assessment data, mark it as 'Not Assessed'. If the resume and assessment align (e.g., "React" on resume and a 92% score), it's a 'Strong Match'.
    4.  Provide a final, concise summary of your findings, highlighting the key takeaways.

    Structure your response according to the defined output schema. Be professional and objective in your analysis.
    `,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumePrompt(input);
    return output!;
  }
);

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}
