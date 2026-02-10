import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight } from "lucide-react"
import { candidates } from "@/lib/data"

export default function CandidatesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Verified Candidates</CardTitle>
        <CardDescription>
          A list of candidates who have completed assessments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead className="hidden md:table-cell">Top Skills</TableHead>
              <TableHead className="text-center">Credibility Score</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-10 w-10 sm:flex">
                      <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {candidate.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {candidate.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                   <div className="flex gap-1 flex-wrap">
                    {(candidate.skills || []).slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                        <span className="font-medium text-lg">{candidate.assessments[0].credibilityScore}%</span>
                        <Progress value={candidate.assessments[0].credibilityScore} className="w-24 h-2"/>
                    </div>
                </TableCell>
                <TableCell>
                   <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/candidates/${candidate.id}`}>
                      View Profile <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
