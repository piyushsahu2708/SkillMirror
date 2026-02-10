import { findCandidateById, findAssessmentById } from "@/lib/data"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Star, Mail, Briefcase } from "lucide-react"
import { CandidateAnalysis } from "@/components/dashboard/candidate-analysis"

export default function CandidateProfilePage({ params }: { params: { id: string } }) {
  const candidate = findCandidateById(params.id)

  if (!candidate) {
    notFound()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
              <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold font-headline">{candidate.name}</h1>
            <p className="text-muted-foreground">{candidate.headline}</p>
            <div className="flex items-center gap-2 mt-2">
                <Mail className="size-4 text-muted-foreground" />
                <span className="text-sm">{candidate.email}</span>
            </div>
            <Separator className="my-4" />
             <div className="flex flex-wrap justify-center gap-2">
              {(candidate.skills || []).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <CandidateAnalysis candidateId={candidate.id} assessmentId={candidate.assessments[0].assessmentId}/>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Assessment History</CardTitle>
            <CardDescription>Breakdown of completed assessments and scores.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {candidate.assessments.map((assessmentResult) => {
              const assessmentDetails = findAssessmentById(assessmentResult.assessmentId)
              if (!assessmentDetails) return null

              return (
                <div key={assessmentResult.assessmentId} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{assessmentDetails.title}</h3>
                    <Badge variant="outline">{assessmentResult.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(assessmentResult.completedAt).toLocaleDateString()}</p>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-5 text-green-500" />
                      <div>
                        <p className="text-muted-foreground">Score</p>
                        <p className="font-semibold">{assessmentResult.score}%</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-2">
                      <Star className="size-5 text-yellow-500" />
                      <div>
                        <p className="text-muted-foreground">Credibility</p>
                        <p className="font-semibold">{assessmentResult.credibilityScore}%</p>
                      </div>
                    </div>
                  </div>
                   <Progress value={assessmentResult.credibilityScore} className="mt-3 h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
