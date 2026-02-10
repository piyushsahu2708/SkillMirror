import { User, Assessment, Candidate } from '@/lib/definitions';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    role: 'candidate',
    avatarUrl: 'https://picsum.photos/seed/avatar1/200/200',
    headline: 'Frontend Developer | React, TypeScript',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'user-2',
    name: 'Samantha Bee',
    email: 'samantha.b@example.com',
    role: 'recruiter',
    avatarUrl: 'https://picsum.photos/seed/avatar2/200/200',
    headline: 'Senior Technical Recruiter @ TechCorp',
  },
  {
    id: 'user-3',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    role: 'admin',
    avatarUrl: 'https://picsum.photos/seed/avatar3/200/200',
    headline: 'Platform Administrator',
  },
  {
    id: 'user-4',
    name: 'Emily Carter',
    email: 'emily.c@example.com',
    role: 'candidate',
    avatarUrl: 'https://picsum.photos/seed/avatar4/200/200',
    headline: 'Full Stack Engineer | Node.js, Python',
    skills: ['Node.js', 'Express', 'MongoDB', 'Python', 'Django'],
  },
    {
    id: 'user-5',
    name: 'David Lee',
    email: 'david.l@example.com',
    role: 'candidate',
    avatarUrl: 'https://picsum.photos/seed/avatar5/200/200',
    headline: 'DevOps Specialist | AWS, Docker, K8s',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
];

export const assessments: Assessment[] = [
  {
    id: 'asmt-1',
    title: 'React Fundamentals',
    type: 'MCQ',
    duration: 30,
    questionCount: 20,
    difficulty: 'Easy',
    description: 'Test your knowledge of core React concepts like components, state, and props.',
  },
  {
    id: 'asmt-2',
    title: 'Advanced TypeScript',
    type: 'Mixed',
    duration: 60,
    questionCount: 15,
    difficulty: 'Medium',
    description: 'Assess your understanding of advanced TypeScript features including generics, decorators, and mapped types.',
  },
  {
    id: 'asmt-3',
    title: 'Node.js Backend Development',
    type: 'Coding',
    duration: 90,
    questionCount: 5,
    difficulty: 'Hard',
    description: 'Solve real-world backend problems using Node.js, Express, and database integration.',
  },
  {
    id: 'asmt-4',
    title: 'CSS Grid & Flexbox',
    type: 'MCQ',
    duration: 20,
    questionCount: 25,
    difficulty: 'Easy',
    description: 'A quick quiz on modern CSS layout techniques.',
  }
];


export const candidates: Candidate[] = [
  {
    ...(users.find(u => u.id === 'user-1' && u.role === 'candidate') as User & { role: 'candidate' }),
    assessments: [
      {
        assessmentId: 'asmt-1',
        candidateId: 'user-1',
        score: 92,
        credibilityScore: 88,
        status: 'Completed',
        completedAt: '2023-10-26T10:00:00Z',
        assessmentData: JSON.stringify({ completionTime: 1200, answers: [{ q: 1, a: 'A', correct: true }, { q: 2, a: 'C', correct: false }] }),
      },
      {
        assessmentId: 'asmt-2',
        candidateId: 'user-1',
        score: 78,
        credibilityScore: 75,
        status: 'Completed',
        completedAt: '2023-10-28T14:30:00Z',
        assessmentData: JSON.stringify({ completionTime: 2500, answers: [{ q: 1, a: 'B', correct: true }, { q: 2, a: 'D', correct: true }] }),
      }
    ],
  },
  {
    ...(users.find(u => u.id === 'user-4' && u.role === 'candidate') as User & { role: 'candidate' }),
    assessments: [
       {
        assessmentId: 'asmt-1',
        candidateId: 'user-4',
        score: 85,
        credibilityScore: 91,
        status: 'Completed',
        completedAt: '2023-10-27T11:00:00Z',
        assessmentData: JSON.stringify({ completionTime: 1300, answers: [{ q: 1, a: 'A', correct: true }, { q: 2, a: 'B', correct: true }] }),
      },
       {
        assessmentId: 'asmt-2',
        candidateId: 'user-4',
        score: 88,
        credibilityScore: 82,
        status: 'Completed',
        completedAt: '2023-10-29T15:00:00Z',
        assessmentData: JSON.stringify({ completionTime: 2400, answers: [{ q: 1, a: 'B', correct: true }, { q: 2, a: 'D', correct: true }] }),
      }
    ],
  },
  {
    ...(users.find(u => u.id === 'user-5' && u.role === 'candidate') as User & { role: 'candidate' }),
    assessments: [
      {
        assessmentId: 'asmt-4',
        candidateId: 'user-5',
        score: 100,
        credibilityScore: 99,
        status: 'Completed',
        completedAt: '2023-11-01T09:05:00Z',
        assessmentData: JSON.stringify({ completionTime: 180, answers: "All answers are correct, completed in record time." }),
      }
    ]
  }
];

export function findCandidateById(id: string): Candidate | undefined {
  return candidates.find(c => c.id === id);
}

export function findAssessmentById(id: string): Assessment | undefined {
  return assessments.find(a => a.id === id);
}
