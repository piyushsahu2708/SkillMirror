"use server";

import { flagSuspiciousScoring, FlagSuspiciousScoringOutput } from "@/ai/flows/flag-suspicious-scoring";
import { generatePerformanceFeedback, GeneratePerformanceFeedbackOutput } from "@/ai/flows/generate-performance-feedback";
import { analyzeResume, AnalyzeResumeOutput } from "@/ai/flows/analyze-resume";
import { findCandidateById, findAssessmentById } from "@/lib/data";

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

export async function runPerformanceAnalysis(
  assessmentId: string,
  score: number,
  totalQuestions: number
): Promise<{ data: GeneratePerformanceFeedbackOutput | null; error: string | null }> {
  try {
    const assessment = findAssessmentById(assessmentId);
    if (!assessment) {
      throw new Error("Assessment details not found.");
    }
    
    // Simulate a slow network request for the loading state
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = await generatePerformanceFeedback({
      assessmentTitle: assessment.title,
      difficulty: assessment.difficulty,
      score: score,
      totalQuestions: totalQuestions,
    });

    return { data: result, error: null };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "An unexpected error occurred during AI analysis.";
    console.error("Performance analysis failed:", message);
    return { data: null, error: message };
  }
}

export async function runResumeAnalysis(
  resumeText: string,
  assessmentPerformance: string
): Promise<{ data: AnalyzeResumeOutput | null; error: string | null }> {
  try {
    // Simulate a slow network request
    await new Promise(resolve => setTimeout(resolve, 2500));

    const result = await analyzeResume({
      resumeText,
      assessmentPerformance,
    });

    return { data: result, error: null };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "An unexpected error occurred during resume analysis.";
    console.error("Resume analysis failed:", message);
    return { data: null, error: message };
  }
}
