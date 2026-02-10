export type UserRole = 'candidate' | 'recruiter' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  headline?: string;
  skills?: string[];
};

export type Assessment = {
  id:string;
  title: string;
  type: 'MCQ' | 'Coding' | 'Mixed';
  duration: number; // in minutes
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
};

export type AssessmentQuestion = {
  id: string;
  assessmentId: string;
  question: string;
  type: 'MCQ';
  options: string[];
  correctAnswer: string;
};

export type CandidateAssessment = {
  assessmentId: string;
  candidateId: string;
  score: number;
  credibilityScore: number;
  status: 'Completed' | 'In Progress';
  completedAt: string;
  assessmentData: string; // JSON string of answers and timestamps
  credibilityBreakdown: {
    accuracy: number;
    consistency: number;
    difficulty: number;
  };
  certificate?: {
    id: string;
    verified: boolean;
    downloadUrl: string;
  };
};

export type Candidate = User & {
  role: 'candidate';
  assessments: CandidateAssessment[];
};
