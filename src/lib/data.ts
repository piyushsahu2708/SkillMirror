import { User, Assessment, Candidate, AssessmentQuestion } from '@/lib/definitions';

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

export const assessmentQuestions: AssessmentQuestion[] = [
  { id: 1, assessmentId: 'asmt-1', question: "What is React?", options: [ "A backend framework", "A JavaScript library for building user interfaces", "A database", "A CSS framework", ], correctIndex: 1, },
  { id: 2, assessmentId: 'asmt-1', question: "What is JSX?", options: [ "A JavaScript syntax extension", "A database query language", "A CSS preprocessor", "A browser API", ], correctIndex: 0, },
  { id: 3, assessmentId: 'asmt-1', question: "Which hook is used to manage state in a functional component?", options: ["useEffect", "useRef", "useState", "useMemo"], correctIndex: 2, },
  { id: 4, assessmentId: 'asmt-1', question: "Props in React are __________.", options: [ "Mutable", "Used for styling", "Read-only", "Used only in class components", ], correctIndex: 2, },
  { id: 5, assessmentId: 'asmt-1', question: "What causes a React component to re-render?", options: [ "Changing props or state", "Calling console.log", "Using JSX", "Importing a component", ], correctIndex: 0, },
  {
    id: 6,
    assessmentId: 'asmt-1',
    question: "Which hook is used to perform side effects in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctIndex: 1,
  },
  {
    id: 7,
    assessmentId: 'asmt-1',
    question: "What is the default behavior of React when state changes?",
    options: [
      "Only the changed component updates",
      "The whole page reloads",
      "The component re-renders",
      "The browser refreshes",
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    assessmentId: 'asmt-1',
    question: "What is the virtual DOM?",
    options: [
      "A copy of the real DOM kept in memory",
      "A database for UI",
      "A browser API",
      "A CSS model",
    ],
    correctIndex: 0,
  },
  {
    id: 9,
    assessmentId: 'asmt-1',
    question: "Which of the following is used to pass data to a component?",
    options: ["State", "Props", "Hooks", "Context"],
    correctIndex: 1,
  },
  {
    id: 10,
    assessmentId: 'asmt-1',
    question: "Which hook is used to access context values?",
    options: ["useState", "useEffect", "useContext", "useRef"],
    correctIndex: 2,
  },
  {
    id: 11,
    assessmentId: 'asmt-1',
    question: "Keys in React lists are used to:",
    options: [
      "Style list items",
      "Identify elements uniquely",
      "Improve SEO",
      "Store state",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    assessmentId: 'asmt-1',
    question: "What does useRef return?",
    options: [
      "A state value",
      "A mutable object with a current property",
      "A DOM event",
      "A new component",
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    assessmentId: 'asmt-1',
    question: "Which hook is best for performance optimization?",
    options: ["useMemo", "useState", "useEffect", "useContext"],
    correctIndex: 0,
  },
  {
    id: 14,
    assessmentId: 'asmt-1',
    question: "How can you prevent a component from re-rendering unnecessarily?",
    options: [
      "Using useEffect",
      "Using React.memo",
      "Using JSX",
      "Using props",
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    assessmentId: 'asmt-1',
    question: "Which method is used to handle events in React?",
    options: [
      "addEventListener",
      "onClick handler",
      "handleEvent()",
      "attachEvent()",
    ],
    correctIndex: 1,
  },
  {
    id: 16,
    assessmentId: 'asmt-1',
    question: "React components should be:",
    options: [
      "Large and complex",
      "Reusable and modular",
      "Tightly coupled",
      "Database dependent",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    assessmentId: 'asmt-1',
    question: "What is lifting state up in React?",
    options: [
      "Using Redux",
      "Moving state to a parent component",
      "Deleting state",
      "Using context API",
    ],
    correctIndex: 1,
  },
  {
    id: 18,
    assessmentId: 'asmt-1',
    question: "Which hook is used to manage complex state logic?",
    options: ["useState", "useEffect", "useReducer", "useMemo"],
    correctIndex: 2,
  },
  {
    id: 19,
    assessmentId: 'asmt-1',
    question: "What does React.StrictMode do?",
    options: [
      "Improves performance",
      "Highlights potential problems",
      "Minifies code",
      "Prevents re-renders",
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    assessmentId: 'asmt-1',
    question: "Which lifecycle phase does useEffect replace?",
    options: [
      "componentDidMount & componentDidUpdate",
      "componentWillUnmount only",
      "render",
      "constructor",
    ],
    correctIndex: 0,
  },
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
        credibilityBreakdown: { accuracy: 95, consistency: 85, difficulty: 70 },
        certificate: { id: 'cert-v89sdd', verified: true, downloadUrl: '#' }
      },
      {
        assessmentId: 'asmt-2',
        candidateId: 'user-1',
        score: 78,
        credibilityScore: 75,
        status: 'Completed',
        completedAt: '2023-10-28T14:30:00Z',
        assessmentData: JSON.stringify({ completionTime: 2500, answers: [{ q: 1, a: 'B', correct: true }, { q: 2, a: 'D', correct: true }] }),
        credibilityBreakdown: { accuracy: 80, consistency: 70, difficulty: 85 },
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
        credibilityBreakdown: { accuracy: 90, consistency: 95, difficulty: 65 },
      },
       {
        assessmentId: 'asmt-3',
        candidateId: 'user-4',
        score: 88,
        credibilityScore: 82,
        status: 'Completed',
        completedAt: '2023-10-29T15:00:00Z',
        assessmentData: JSON.stringify({ completionTime: 2400, answers: [{ q: 1, a: 'B', correct: true }, { q: 2, a: 'D', correct: true }] }),
        credibilityBreakdown: { accuracy: 85, consistency: 75, difficulty: 90 },
        certificate: { id: 'cert-jklm34', verified: true, downloadUrl: '#' }
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
        credibilityBreakdown: { accuracy: 100, consistency: 100, difficulty: 40 },
        certificate: { id: 'cert-90uio1', verified: true, downloadUrl: '#' }
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

export function findQuestionsForAssessment(assessmentId: string): AssessmentQuestion[] {
  return assessmentQuestions.filter(q => q.assessmentId === assessmentId);
}
