"use client";

import { useState } from "react";
import { runSuspicionAnalysis } from "@/app/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { FlagSuspiciousScoringOutput } from "@/ai/flows/flag-suspicious-scoring";

type AnalysisState = {
  data: FlagSuspiciousScoringOutput | null;
  error: string | null;
  loading: boolean;
};

export function CandidateAnalysis({ candidateId, assessmentId }: { candidateId: string; assessmentId: string }) {
  const [state, setState] = useState<AnalysisState>({
    data: null,
    error: null,
    loading: false,
  });
  const { toast } = useToast();

  const handleAnalysis = async () => {
    setState({ data: null, error: null, loading: true });
    try {
      const result = await runSuspicionAnalysis(candidateId, assessmentId);
      if (result.error) {
         throw new Error(result.error);
      }
      setState({ data: result.data, error: null, loading: false });
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : "An unknown error occurred.";
      setState({ data: null, error: errorMsg, loading: false });
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMsg,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Bot className="size-5" />
          Credibility Analysis
        </CardTitle>
        <CardDescription>
          Use our AI tool to check for suspicious scoring patterns or inconsistencies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAnalysis} disabled={state.loading} className="w-full">
          {state.loading ? "Analyzing..." : "Run Suspicion Analysis"}
        </Button>

        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.data && (
          <div className="mt-4">
            {state.data.isSuspicious ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Suspicious Activity Flagged</AlertTitle>
                <AlertDescription>
                  <p className="font-semibold">Reason: {state.data.reason}</p>
                  <p>Confidence: {(state.data.confidenceScore * 100).toFixed(0)}%</p>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>No Suspicious Activity Found</AlertTitle>
                <AlertDescription>
                   <p>{state.data.reason}</p>
                   <p>Confidence: {(state.data.confidenceScore * 100).toFixed(0)}%</p>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
