import { assessments } from "@/lib/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, HelpCircle, BarChart } from "lucide-react"

export default function AssessmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Available Assessments</h1>
        <p className="text-muted-foreground">
          Prove your skills and boost your credibility score by completing these assessments.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">{assessment.title}</CardTitle>
                <Badge variant={assessment.difficulty === 'Easy' ? 'secondary' : assessment.difficulty === 'Medium' ? 'outline' : 'default'}>
                  {assessment.difficulty}
                </Badge>
              </div>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{assessment.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <HelpCircle className="size-4" />
                  <span>{assessment.questionCount} questions</span>
                </div>
                 <div className="flex items-center gap-1">
                  <BarChart className="size-4" />
                  <span>{assessment.type}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Assessment</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
