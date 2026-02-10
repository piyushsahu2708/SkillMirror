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
  {
    id: 21,
    assessmentId: 'asmt-2',
    question: "What is the purpose of generics in TypeScript?",
    options: [
      "To write reusable and type-safe code",
      "To convert JavaScript to TypeScript",
      "To improve runtime performance",
      "To style components",
    ],
    correctIndex: 0,
  },
  {
    id: 22,
    assessmentId: 'asmt-2',
    question: "Which symbol is used to define a generic type?",
    options: ["()", "[]", "<>", "{}"],
    correctIndex: 2,
  },
  {
    id: 23,
    assessmentId: 'asmt-2',
    question: "What does the 'unknown' type represent?",
    options: [
      "A type that can be assigned to anything without checks",
      "A safer alternative to any",
      "A type only for null values",
      "A deprecated type",
    ],
    correctIndex: 1,
  },
  {
    id: 24,
    assessmentId: 'asmt-2',
    question: "What is a mapped type in TypeScript?",
    options: [
      "A type that maps over keys of another type",
      "A function mapping values",
      "A runtime data structure",
      "A JSON mapping",
    ],
    correctIndex: 0,
  },
  {
    id: 25,
    assessmentId: 'asmt-2',
    question: "Which utility type makes all properties optional?",
    options: ["Readonly<T>", "Partial<T>", "Pick<T>", "Required<T>"],
    correctIndex: 1,
  },
  {
    id: 26,
    assessmentId: 'asmt-2',
    question: "What does the 'keyof' keyword do?",
    options: [
      "Returns all values of an object",
      "Returns a union of object keys",
      "Checks key existence at runtime",
      "Deletes object keys",
    ],
    correctIndex: 1,
  },
  {
    id: 27,
    assessmentId: 'asmt-2',
    question: "Which utility type selects specific properties from a type?",
    options: ["Omit<T>", "Exclude<T>", "Pick<T>", "Record<T>"],
    correctIndex: 2,
  },
  {
    id: 28,
    assessmentId: 'asmt-2',
    question: "What does 'as const' do?",
    options: [
      "Converts variables to constants",
      "Freezes object values and types",
      "Improves performance",
      "Creates readonly arrays only",
    ],
    correctIndex: 1,
  },
  {
    id: 29,
    assessmentId: 'asmt-2',
    question: "What is a conditional type?",
    options: [
      "A type that depends on a condition",
      "A runtime if-else",
      "A boolean type",
      "A deprecated feature",
    ],
    correctIndex: 0,
  },
  {
    id: 30,
    assessmentId: 'asmt-2',
    question: "Which keyword is used for type assertion?",
    options: ["assert", "as", "typeof", "instanceof"],
    correctIndex: 1,
  },
  {
    id: 31,
    assessmentId: 'asmt-2',
    question: "What does the Record<K, T> utility type do?",
    options: [
      "Creates an array of records",
      "Maps keys K to values of type T",
      "Stores runtime records",
      "Creates readonly objects",
    ],
    correctIndex: 1,
  },
  {
    id: 32,
    assessmentId: 'asmt-2',
    question: "What is function overloading in TypeScript?",
    options: [
      "Defining multiple implementations of a function",
      "Calling a function multiple times",
      "Multiple function signatures for one implementation",
      "Using async functions",
    ],
    correctIndex: 2,
  },
  {
    id: 33,
    assessmentId: 'asmt-2',
    question: "Which type removes null and undefined from a type?",
    options: ["Exclude<T>", "NonNullable<T>", "Required<T>", "Partial<T>"],
    correctIndex: 1,
  },
  {
    id: 34,
    assessmentId: 'asmt-2',
    question: "What is the main benefit of strict mode in TypeScript?",
    options: [
      "Faster compilation",
      "Better runtime performance",
      "Improved type safety",
      "Smaller bundle size",
    ],
    correctIndex: 2,
  },
  {
    id: 35,
    assessmentId: 'asmt-2',
    question: "Which feature allows extending interfaces?",
    options: ["implements", "extends", "inherits", "merge"],
    correctIndex: 1,
  },
  {
    id: 36,
    assessmentId: 'asmt-4',
    question: "Which CSS layout module is one-dimensional?",
    options: ["Grid", "Flexbox", "Float", "Position"],
    correctIndex: 1,
  },
  {
    id: 37,
    assessmentId: 'asmt-4',
    question: "Which CSS layout module is two-dimensional?",
    options: ["Flexbox", "Float", "Grid", "Inline"],
    correctIndex: 2,
  },
  {
    id: 38,
    assessmentId: 'asmt-4',
    question: "Which property enables Flexbox?",
    options: ["display: block", "display: grid", "display: flex", "display: inline"],
    correctIndex: 2,
  },
  {
    id: 39,
    assessmentId: 'asmt-4',
    question: "Which property defines the main axis direction in Flexbox?",
    options: ["align-items", "flex-wrap", "flex-direction", "justify-content"],
    correctIndex: 2,
  },
  {
    id: 40,
    assessmentId: 'asmt-4',
    question: "Which property aligns items along the main axis in Flexbox?",
    options: ["align-items", "justify-content", "align-content", "place-items"],
    correctIndex: 1,
  },
  {
    id: 41,
    assessmentId: 'asmt-4',
    question: "Which property aligns items along the cross axis in Flexbox?",
    options: ["justify-content", "align-items", "flex-grow", "order"],
    correctIndex: 1,
  },
  {
    id: 42,
    assessmentId: 'asmt-4',
    question: "Which property allows flex items to wrap onto multiple lines?",
    options: ["flex-flow", "flex-grow", "flex-wrap", "flex-shrink"],
    correctIndex: 2,
  },
  {
    id: 43,
    assessmentId: 'asmt-4',
    question: "Which shorthand property combines flex-direction and flex-wrap?",
    options: ["flex", "flex-align", "flex-flow", "flex-box"],
    correctIndex: 2,
  },
  {
    id: 44,
    assessmentId: 'asmt-4',
    question: "Which property controls the size growth of a flex item?",
    options: ["flex-basis", "flex-grow", "flex-shrink", "order"],
    correctIndex: 1,
  },
  {
    id: 45,
    assessmentId: 'asmt-4',
    question: "Which property defines the initial size of a flex item?",
    options: ["width", "flex-grow", "flex-basis", "max-width"],
    correctIndex: 2,
  },
  {
    id: 46,
    assessmentId: 'asmt-4',
    question: "Which property changes the order of flex items?",
    options: ["z-index", "position", "order", "float"],
    correctIndex: 2,
  },
  {
    id: 47,
    assessmentId: 'asmt-4',
    question: "Which property enables CSS Grid?",
    options: ["display: flex", "display: grid", "display: block", "display: table"],
    correctIndex: 1,
  },
  {
    id: 48,
    assessmentId: 'asmt-4',
    question: "Which property defines columns in CSS Grid?",
    options: ["grid-rows", "grid-template-rows", "grid-template-columns", "grid-column-gap"],
    correctIndex: 2,
  },
  {
    id: 49,
    assessmentId: 'asmt-4',
    question: "Which property defines rows in CSS Grid?",
    options: ["grid-template-rows", "grid-template-columns", "grid-auto-flow", "grid-gap"],
    correctIndex: 0,
  },
  {
    id: 50,
    assessmentId: 'asmt-4',
    question: "Which unit is commonly used for flexible Grid layouts?",
    options: ["px", "em", "fr", "%"],
    correctIndex: 2,
  },
  {
    id: 51,
    assessmentId: 'asmt-4',
    question: "Which property defines spacing between Grid items?",
    options: ["margin", "padding", "gap", "space-between"],
    correctIndex: 2,
  },
  {
    id: 52,
    assessmentId: 'asmt-4',
    question: "Which property places a grid item by column number?",
    options: ["grid-column", "grid-area", "grid-row", "grid-auto-columns"],
    correctIndex: 0,
  },
  {
    id: 53,
    assessmentId: 'asmt-4',
    question: "Which property places a grid item by row number?",
    options: ["grid-column", "grid-template", "grid-row", "grid-flow"],
    correctIndex: 2,
  },
  {
    id: 54,
    assessmentId: 'asmt-4',
    question: "Which property allows naming grid areas?",
    options: ["grid-area", "grid-template-areas", "grid-auto-flow", "grid-span"],
    correctIndex: 1,
  },
  {
    id: 55,
    assessmentId: 'asmt-4',
    question: "Which value centers items both horizontally and vertically in Flexbox?",
    options: [
      "justify-content: center; align-items: center;",
      "align-content: center;",
      "place-items: center;",
      "flex-align: center;",
    ],
    correctIndex: 0,
  },
  {
    id: 56,
    assessmentId: 'asmt-4',
    question: "Which value centers items in CSS Grid easily?",
    options: [
      "align-items: center",
      "justify-content: center",
      "place-items: center",
      "grid-align: center",
    ],
    correctIndex: 2,
  },
  {
    id: 57,
    assessmentId: 'asmt-4',
    question: "Which layout is best for page-level layouts?",
    options: ["Flexbox", "Grid", "Float", "Inline"],
    correctIndex: 1,
  },
  {
    id: 58,
    assessmentId: 'asmt-4',
    question: "Which layout is best for component-level alignment?",
    options: ["Grid", "Flexbox", "Float", "Table"],
    correctIndex: 1,
  },
  {
    id: 59,
    assessmentId: 'asmt-4',
    question: "What does grid-auto-flow control?",
    options: [
      "Item size",
      "Item placement direction",
      "Grid gap size",
      "Row height",
    ],
    correctIndex: 1,
  },
  {
    id: 60,
    assessmentId: 'asmt-4',
    question: "Which feature is unique to CSS Grid?",
    options: [
      "Two-dimensional layout",
      "One-dimensional layout",
      "Item wrapping",
      "Order control",
    ],
    correctIndex: 0,
  },
  {
    id: 61,
    assessmentId: 'asmt-3',
    question:
      "What is Node.js and why is it suitable for building scalable backend applications?",
    options: [
      "It is a frontend framework",
      "It runs JavaScript on the server using a non-blocking event-driven model",
      "It is only used for scripting",
      "It replaces databases",
    ],
    correctIndex: 1,
  },
  {
    id: 62,
    assessmentId: 'asmt-3',
    question:
      "Which Express.js method is used to handle HTTP GET requests?",
    options: ["app.post()", "app.get()", "app.use()", "app.listen()"],
    correctIndex: 1,
  },
  {
    id: 63,
    assessmentId: 'asmt-3',
    question:
      "How do you handle asynchronous operations in Node.js?",
    options: [
      "Using callbacks, promises, and async/await",
      "Using only loops",
      "Using threads only",
      "Using HTML events",
    ],
    correctIndex: 0,
  },
  {
    id: 64,
    assessmentId: 'asmt-3',
    question:
      "What does middleware do in Express.js?",
    options: [
      "Handles database storage",
      "Executes code between request and response",
      "Starts the server",
      "Compiles JavaScript",
    ],
    correctIndex: 1,
  },
  {
    id: 65,
    assessmentId: 'asmt-3',
    question:
      "Which status code should be returned for a successful resource creation?",
    options: ["200", "201", "400", "500"],
    correctIndex: 1,
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
