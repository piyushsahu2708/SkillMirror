"use client";

import { useState } from "react";
import { runResumeAnalysis } from "@/app/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, Upload, AlertTriangle, CheckCircle, FileText, Sparkles, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { AnalyzeResumeOutput } from "@/ai/flows/analyze-resume";
import { candidates, findAssessmentById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

type AnalysisState = {
  data: AnalyzeResumeOutput | null;
  error: string | null;
  loading: boolean;
};

const getBadgeVariantForMatch = (match: AnalyzeResumeOutput['skillGaps'][0]['match']) => {
    switch (match) {
        case 'Strong Match': return 'default';
        case 'Partial Match': return 'secondary';
        case 'Mismatch': return 'destructive';
        case 'Not Assessed': return 'outline';
    }
};

export function ResumeAnalyzer({ userId }: { userId: string }) {
    const [resumeText, setResumeText] = useState("");
    const [state, setState] = useState<AnalysisState>({
        data: null,
        error: null,
        loading: false,
    });
    
    const candidate = candidates.find(c => c.id === userId);
    const performanceData = candidate?.assessments.map(a => {
        const details = findAssessmentById(a.assessmentId);
        return { skill: details?.title, score: a.score };
    });

    const handleAnalysis = async () => {
        if (!resumeText.trim()) {
            setState({ data: null, error: "Please paste your resume text to be analyzed.", loading: false });
            return;
        }
        setState({ data: null, error: null, loading: true });
        
        try {
            const result = await runResumeAnalysis(resumeText, JSON.stringify(performanceData));
            if (result.error) {
                throw new Error(result.error);
            }
            setState({ data: result.data, error: null, loading: false });
        } catch (e: unknown) {
            const errorMsg = e instanceof Error ? e.message : "An unknown error occurred.";
            setState({ data: null, error: errorMsg, loading: false });
        }
    };

    const renderResults = (data: AnalyzeResumeOutput) => (
        <div className="space-y-6 mt-4">
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="size-4 text-primary" /> Overall Summary</h4>
                <p className="text-muted-foreground text-sm">{data.overallSummary}</p>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Extracted Skills</h4>
                 <div className="flex flex-wrap gap-2">
                    {data.extractedSkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
            </div>
             <div>
                <h4 className="font-semibold mb-2">Skill Gap Analysis</h4>
                <div className="space-y-3">
                    {data.skillGaps.map(gap => (
                        <div key={gap.skill} className="p-3 border rounded-lg bg-muted/30">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold text-base">{gap.skill}</p>
                                <Badge variant={getBadgeVariantForMatch(gap.match)}>{gap.match}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground"><strong className="text-foreground">Resume Claim:</strong> {gap.resumeClaim}</p>
                            <p className="text-xs text-muted-foreground"><strong className="text-foreground">Assessment Finding:</strong> {gap.assessmentFinding}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
    const renderLoading = () => (
         <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
            </div>
          </div>
           <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Bot className="size-5" /> AI Resume Analyzer</CardTitle>
                <CardDescription>Paste your resume text below and our AI will compare it against your verified skills from assessments.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Textarea 
                        placeholder="Paste your full resume text here..."
                        rows={8}
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        disabled={state.loading}
                    />
                </div>
                <Button onClick={handleAnalysis} disabled={state.loading} className="w-full mt-4">
                    {state.loading ? (
                        <>
                            <Wand2 className="mr-2 animate-pulse" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2" />
                            Analyze Resume
                        </>
                    )}
                </Button>

                {state.loading && renderLoading()}

                {state.error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Analysis Error</AlertTitle>
                        <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                )}

                {state.data && renderResults(state.data)}
            </CardContent>
        </Card>
    );
}
