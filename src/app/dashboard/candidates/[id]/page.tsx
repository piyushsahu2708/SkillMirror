import { findCandidateById, findAssessmentById } from "@/lib/data"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Star, Mail, Briefcase, Download, Award, Target, BarChart3, Clock } from "lucide-react"
import { CandidateAnalysis } from "@/components/dashboard/candidate-analysis"

const getBadgeForScore = (score: number): 'Beginner' | 'Intermediate' | 'Expert' => {
    if (score >= 90) return 'Expert';
    if (score >= 75) return 'Intermediate';
    return 'Beginner';
}

const getBadgeVariant = (badge: 'Beginner' | 'Intermediate' | 'Expert') => {
    switch (badge) {
        case 'Expert': return 'default';
        case 'Intermediate': return 'secondary';
        case 'Beginner': return 'outline';
    }
}

export default function CandidateProfilePage({ params }: { params: { id: string } }) {
  const candidate = findCandidateById(params.id)

  if (!candidate) {
    notFound()
  }

  const overallCredibility = candidate.assessments.length > 0
    ? Math.round(candidate.assessments.reduce((acc, a) => acc + a.credibilityScore, 0) / candidate.assessments.length)
    : 0;

  const profileCompletion = 75; // Hardcoded for now

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold font-headline">{candidate.name}</h1>
                <p className="text-muted-foreground">{candidate.headline}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Mail className="size-4" />
                    <span>{candidate.email}</span>
                </div>
                 <Badge variant="outline" className="capitalize mt-2">{candidate.role}</Badge>
            </div>

            <Separator className="my-4" />

             <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm font-bold text-primary">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
             </div>
            
            <Separator className="my-4" />
            
            <h3 className="text-sm font-semibold mb-2">Top Skills</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {(candidate.skills || []).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Overall Credibility</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-center gap-2">
                    <span className="text-6xl font-bold text-primary">{overallCredibility}</span>
                    <span className="text-2xl text-muted-foreground">%</span>
                </div>
                <Progress value={overallCredibility} className="h-2 mt-4" />
                <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-muted-foreground"><Target className="size-4" /> Accuracy</span>
                        <span className="font-medium">High</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-muted-foreground"><Clock className="size-4" /> Consistency</span>
                        <span className="font-medium">Good</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-muted-foreground"><BarChart3 className="size-4" /> Difficulty</span>
                        <span className="font-medium">Medium</span>
                    </div>
                </div>
            </CardContent>
        </Card>

        <CandidateAnalysis candidateId={candidate.id} assessmentId={candidate.assessments[0].assessmentId}/>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Verified Skills</CardTitle>
            <CardDescription>Breakdown of completed assessments and scores.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {candidate.assessments.map((assessmentResult) => {
              const assessmentDetails = findAssessmentById(assessmentResult.assessmentId)
              if (!assessmentDetails) return null;
              
              const skillBadge = getBadgeForScore(assessmentResult.score);

              return (
                <Card key={assessmentResult.assessmentId} className="hover:bg-muted/50 transition-colors">
                  <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{assessmentDetails.title}</CardTitle>
                        <Badge variant={getBadgeVariant(skillBadge)}>{skillBadge}</Badge>
                      </div>
                      <CardDescription>{new Date(assessmentResult.completedAt).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm text-center">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-muted-foreground">Score</p>
                            <p className="font-bold text-xl text-primary">{assessmentResult.score}%</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-muted-foreground">Credibility</p>
                            <p className="font-bold text-xl text-accent">{assessmentResult.credibilityScore}%</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-muted-foreground">Difficulty</p>
                            <Badge variant={assessmentDetails.difficulty === 'Hard' ? 'destructive' : assessmentDetails.difficulty === 'Medium' ? 'outline' : 'secondary'}>
                                {assessmentDetails.difficulty}
                            </Badge>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Award className="size-5 text-amber-500" />
                    Certificates
                </CardTitle>
                <CardDescription>Download and verify official certificates of achievement.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {candidate.assessments.filter(a => a.certificate).map(assessmentResult => {
                        const assessmentDetails = findAssessmentById(assessmentResult.assessmentId);
                        return (
                            <div key={assessmentResult.certificate!.id} className="flex justify-between items-center p-3 border rounded-lg">
                                <div>
                                    <p className="font-semibold">{assessmentDetails?.title} Specialist</p>
                                    <p className="text-xs text-muted-foreground">Verification ID: {assessmentResult.certificate!.id}</p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={assessmentResult.certificate!.downloadUrl} download>
                                        <Download className="mr-2 size-4"/>
                                        Download
                                    </a>
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
