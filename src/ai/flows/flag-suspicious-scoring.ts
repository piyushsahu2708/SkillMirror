'use server';

/**
 * @fileOverview This file contains a Genkit flow for flagging suspicious scoring inconsistencies or patterns in candidate assessments.
 *
 * The flow analyzes candidate assessment data to identify potentially fraudulent or unreliable results, aiding admins in maintaining the integrity of the scoring system.
 *
 * @interface FlagSuspiciousScoringInput - Defines the input schema for the flagSuspiciousScoring flow.
 * @interface FlagSuspiciousScoringOutput - Defines the output schema for the flagSuspiciousScoring flow.
 * @function flagSuspiciousScoring - The main function that triggers the flow and returns the analysis result.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagSuspiciousScoringInputSchema = z.object({
  candidateId: z.string().describe('The unique identifier of the candidate.'),
  assessmentId: z.string().describe('The unique identifier of the assessment.'),
  assessmentData: z.string().describe('JSON string containing assessment data, including answers, timestamps, and scores.'),
});

export type FlagSuspiciousScoringInput = z.infer<typeof FlagSuspiciousScoringInputSchema>;

const FlagSuspiciousScoringOutputSchema = z.object({
  isSuspicious: z.boolean().describe('Whether the assessment is flagged as suspicious.'),
  reason: z.string().describe('The reason for flagging the assessment as suspicious.'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence score (0 to 1) of the suspicious activity.'),
});

export type FlagSuspiciousScoringOutput = z.infer<typeof FlagSuspiciousScoringOutputSchema>;

const flagSuspiciousScoringPrompt = ai.definePrompt({
  name: 'flagSuspiciousScoringPrompt',
  input: {schema: FlagSuspiciousScoringInputSchema},
  output: {schema: FlagSuspiciousScoringOutputSchema},
  prompt: `You are an AI assistant that specializes in identifying suspicious patterns and inconsistencies in candidate assessment data.

  Given the following information about a candidate's assessment, analyze the data and determine if the scoring is suspicious. Consider factors such as rapid completion times, unusually high scores, inconsistent answer patterns, and any other anomalies that might indicate fraudulent activity.

  Candidate ID: {{{candidateId}}}
  Assessment ID: {{{assessmentId}}}
  Assessment Data: {{{assessmentData}}}

  Based on your analysis, provide a clear and concise explanation of why the assessment is flagged as suspicious and provide a confidence score (0 to 1) for your assessment.

  Ensure your response is structured according to the defined output schema.
  Response:
  `,
});

const flagSuspiciousScoringFlow = ai.defineFlow(
  {
    name: 'flagSuspiciousScoringFlow',
    inputSchema: FlagSuspiciousScoringInputSchema,
    outputSchema: FlagSuspiciousScoringOutputSchema,
  },
  async input => {
    const {output} = await flagSuspiciousScoringPrompt(input);
    return output!;
  }
);

export async function flagSuspiciousScoring(input: FlagSuspiciousScoringInput): Promise<FlagSuspiciousScoringOutput> {
  return flagSuspiciousScoringFlow(input);
}
