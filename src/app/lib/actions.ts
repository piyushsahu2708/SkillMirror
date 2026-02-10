"use server";

import { flagSuspiciousScoring, FlagSuspiciousScoringOutput } from "@/ai/flows/flag-suspicious-scoring";
import { findCandidateById } from "@/lib/data";

export async function runSuspicionAnalysis(
  candidateId: string,
  assessmentId: string
): Promise<{ data: FlagSuspiciousScoringOutput | null; error: string | null }> {
  try {
    const candidate = findCandidateById(candidateId);
    if (!candidate) {
      throw new Error("Candidate not found.");
    }

    const candidateAssessment = candidate.assessments.find(
      (a) => a.assessmentId === assessmentId
    );

    if (!candidateAssessment) {
      throw new Error("Assessment data for this candidate not found.");
    }
    
    // Simulate a slow network request for the loading state
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = await flagSuspiciousScoring({
      candidateId: candidateId,
      assessmentId: assessmentId,
      assessmentData: candidateAssessment.assessmentData,
    });

    return { data: result, error: null };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "An unexpected error occurred during analysis.";
    console.error("Suspicion analysis failed:", message);
    return { data: null, error: message };
  }
}
