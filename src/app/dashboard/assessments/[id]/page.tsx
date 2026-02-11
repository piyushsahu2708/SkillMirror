"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { findAssessmentById, findQuestionsForAssessment } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Clock, CameraOff, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import type { AssessmentQuestion } from '@/lib/definitions';

export default function AssessmentTakingPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const assessment = findAssessmentById(id as string);
  const questions = findQuestionsForAssessment(id as string);
  
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState({ score: 0, correctCount: 0, totalQuestions: 0 });

  const currentQuestion: AssessmentQuestion | undefined = questions[currentQuestionIndex];

  const stopCameraStream = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const getCameraPermission = useCallback(async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support the necessary features for proctoring.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera/audio:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera & Mic Access Denied',
          description: 'Please enable camera and microphone permissions in your browser settings to start the assessment.',
        });
      }
  }, [toast]);


  useEffect(() => {
    if (!isSubmitted) {
      getCameraPermission();
    } else {
      stopCameraStream();
    }
    
    // Cleanup function to stop the stream on unmount
    return () => {
      stopCameraStream();
    };
  }, [isSubmitted, getCameraPermission, stopCameraStream]);


  const saveCurrentAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    return newAnswers;
  }

  const handleNext = () => {
    const newAnswers = saveCurrentAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(newAnswers[currentQuestionIndex + 1] ?? null);
    }
  };

  const handlePrevious = () => {
    const newAnswers = saveCurrentAnswer();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(newAnswers[currentQuestionIndex - 1] ?? null);
    }
  };

  const handleSubmit = () => {
    const finalAnswers = saveCurrentAnswer();
    
    let correctCount = 0;
    questions.forEach((q, index) => {
        if (finalAnswers[index] === q.correctIndex) {
            correctCount++;
        }
    });

    const calculatedScore = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    
    setResults({
        score: calculatedScore,
        correctCount: correctCount,
        totalQuestions: questions.length,
    });
    
    toast({
      title: "Assessment Submitted!",
      description: `You scored ${calculatedScore}%. Your responses have been recorded.`,
    });
    setIsSubmitted(true);
    stopCameraStream();
  };

  const handleRetake = () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setIsSubmitted(false);
      setResults({ score: 0, correctCount: 0, totalQuestions: 0 });
      // The useEffect will call getCameraPermission again since isSubmitted is now false
  };

  const handleCancel = () => {
    stopCameraStream();
    router.push('/dashboard/assessments');
  };


  if (!assessment) {
    notFound();
  }

  const renderResults = () => (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Assessment Results</CardTitle>
        <CardDescription>Here is your performance for the "{assessment.title}" assessment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
          <div className="text-center flex flex-col items-center gap-2">
              <span className="text-muted-foreground">Your Score</span>
              <h3 className="text-7xl font-bold text-primary">{results.score}%</h3>
              <Progress value={results.score} className="h-3 w-full max-w-sm mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3 rounded-lg border p-4 bg-muted/20">
                  <CheckCircle className="size-8 text-green-500 mt-1 shrink-0" />
                  <div>
                      <p className="font-bold text-2xl">{results.correctCount}</p>
                      <p className="text-muted-foreground">Correct Answers</p>
                  </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4 bg-muted/20">
                  <XCircle className="size-8 text-destructive mt-1 shrink-0" />
                  <div>
                      <p className="font-bold text-2xl">{results.totalQuestions - results.correctCount}</p>
                      <p className="text-muted-foreground">Incorrect Answers</p>
                  </div>
              </div>
          </div>
          
          <div className="flex justify-center gap-4 pt-4">
              <Button onClick={handleRetake} size="lg">Retake Assessment</Button>
              <Button variant="outline" size="lg" asChild>
                  <Link href="/dashboard/assessments">Back to Assessments</Link>
              </Button>
          </div>
      </CardContent>
    </Card>
  );

  const renderAssessment = () => (
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-headline text-2xl">{assessment.title}</CardTitle>
              <Badge variant={assessment.difficulty === 'Easy' ? 'secondary' : assessment.difficulty === 'Medium' ? 'outline' : 'default'}>
                  {assessment.difficulty}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-2">
              <Clock className="size-4" /> 
              <span>{assessment.duration} minutes remaining</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                <p>{assessment.description}</p>
                
                {questions.length > 0 && currentQuestion ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
                        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
                        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
                    </div>
                    <RadioGroup
                        value={selectedAnswer !== null ? String(selectedAnswer) : ''}
                        onValueChange={(value) => setSelectedAnswer(Number(value))}
                        className="space-y-3"
                    >
                        {currentQuestion.options.map((option, index) => (
                            <Label
                                key={index}
                                htmlFor={`option-${index}`}
                                className="flex items-center space-x-3 p-4 border rounded-md hover:bg-muted/50 has-[:checked]:bg-accent has-[:checked]:border-primary transition-all cursor-pointer"
                            >
                                <RadioGroupItem value={String(index)} id={`option-${index}`} />
                                <span>{option}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-8 h-96 flex items-center justify-center">
                      <p className="text-muted-foreground">Assessment questions will appear here.</p>
                  </div>
                )}
                
                 <div className="flex justify-between gap-2">
                    <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</Button>
                    <Button onClick={handleNext} disabled={selectedAnswer === null || currentQuestionIndex >= questions.length - 1}>Next</Button>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {isSubmitted ? renderResults() : renderAssessment()}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Proctoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {!isSubmitted && hasCameraPermission === false && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
                        <CameraOff className="size-12 text-destructive mb-4" />
                        <h3 className="text-lg font-semibold text-destructive-foreground">Camera Not Available</h3>
                        <p className="text-sm text-muted-foreground">Please grant camera and microphone access.</p>
                    </div>
                )}
                 {!isSubmitted && hasCameraPermission === null && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
                        <p className="text-sm text-muted-foreground">Requesting camera access...</p>
                    </div>
                 )}
                 {isSubmitted && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
                        <CheckCircle className="size-12 text-green-400 mb-4" />
                        <h3 className="text-lg font-semibold text-background">Proctoring Complete</h3>
                        <p className="text-sm text-muted-foreground">Your session has ended.</p>
                    </div>
                 )}
            </div>
            {hasCameraPermission === false && !isSubmitted &&(
                <Alert variant="destructive" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Action Required</AlertTitle>
                    <AlertDescription>
                    Camera and microphone access is required for proctored assessments. Please enable permissions in your browser settings and refresh the page.
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
         <div className="flex flex-col gap-2">
            <Button disabled={!hasCameraPermission || currentQuestionIndex < questions.length - 1 || isSubmitted} size="lg" onClick={handleSubmit}>Submit Assessment</Button>
            <Button variant="destructive" onClick={handleCancel}>
                Cancel
            </Button>
        </div>
      </div>
    </div>
  );
}
