"use client";

import { useState, useEffect } from "react";
import { runPerformanceAnalysis } from "@/app/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, Lightbulb, AlertTriangle, ChevronsUp, ChevronsDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneratePerformanceFeedbackOutput } from "@/ai/flows/generate-performance-feedback";
import type { Assessment } from "@/lib/definitions";

type AnalysisState = {
  data: GeneratePerformanceFeedbackOutput | null;
  error: string | null;
  loading: boolean;
};

interface AIPerformanceFeedbackProps {
  assessmentId: string;
  score: number;
  totalQuestions: number;
  difficulty: Assessment['difficulty'];
}

export function AIPerformanceFeedback({ assessmentId, score, totalQuestions, difficulty }: AIPerformanceFeedbackProps) {
  const [state, setState] = useState<AnalysisState>({
    data: null,
    error: null,
    loading: true, // Start loading immediately
  });

  useEffect(() => {
    const getFeedback = async () => {
      setState({ data: null, error: null, loading: true });
      try {
        const result = await runPerformanceAnalysis(assessmentId, score, totalQuestions);
        if (result.error) {
           throw new Error(result.error);
        }
        setState({ data: result.data, error: null, loading: false });
      } catch (e: unknown) {
        const errorMsg = e instanceof Error ? e.message : "An unknown error occurred.";
        setState({ data: null, error: errorMsg, loading: false });
      }
    };

    getFeedback();
  }, [assessmentId, score, totalQuestions]);

  if (state.loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Bot className="size-5" />
            AI Performance Feedback
          </CardTitle>
          <CardDescription>
            Analyzing your results to provide personalized feedback...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state.error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>AI Analysis Error</AlertTitle>
        <AlertDescription>{state.error}</AlertDescription>
      </Alert>
    );
  }

  if (state.data) {
    return (
       <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Bot className="size-5 text-primary" />
            AI Performance Feedback
          </CardTitle>
          <CardDescription>
            Here is an AI-generated summary of your performance. Confidence: {state.data.confidenceLevel}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 size-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <ChevronsUp className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                    <h4 className="font-semibold">Strength</h4>
                    <p className="text-muted-foreground">{state.data.strength}</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <div className="flex-shrink-0 size-8 rounded-full bg-red-100 dark:bg-destructive/20 flex items-center justify-center">
                    <ChevronsDown className="size-5 text-destructive" />
                </div>
                <div>
                    <h4 className="font-semibold">Weakness</h4>
                    <p className="text-muted-foreground">{state.data.weakness}</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <div className="flex-shrink-0 size-8 rounded-full bg-blue-100 dark:bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="size-5 text-primary" />
                </div>
                <div>
                    <h4 className="font-semibold">Suggestion</h4>
                    <p className="text-muted-foreground">{state.data.suggestion}</p>
                </div>
            </div>
        </CardContent>
      </Card>
    )
  }
  
  return null;
}
