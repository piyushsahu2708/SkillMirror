# **App Name**: SkillMirror

## Core Features:

- User Authentication: Secure user registration, login, and profile management with role-based access control (candidate, recruiter, admin).
- Skill Assessment Module: Skill-wise tests (MCQs, coding tasks) with time-bound assessments and auto-evaluation for objective questions. Manual evaluation option for coding tasks.
- Credibility Scoring System: Dynamic score based on test accuracy, skill difficulty level, and consistency across attempts. Recruiters can filter candidates by credibility score. A reasoning AI tool will flag any suspicious scoring inconsistencies or patterns for human review, incorporating these patterns into future assessments.
- Recruiter Dashboard: View verified candidates, filter by skills & credibility score, candidate profile overview, and assessment performance breakdown.
- Admin Panel: Manage users, create & manage skill tests, monitor platform usage, and handle reports & misuse.
- Data Storage: Persistent data storage with MongoDB to store collections such as Users, Assessments, and Scores
- REST API Endpoints: Comprehensive set of RESTful API endpoints for Authentication, Assessment, and Recruiter functionalities.

## Style Guidelines:

- Primary color: HSL values of 210, 70%, and 45% (approximately #228BDB), a vibrant and trustworthy blue that instills confidence in users and provides a strong focal point for interactive elements.
- Background color: HSL values of 210, 20%, and 95% (approximately #F0F8FF), creating a clean and unobtrusive backdrop that enhances readability and minimizes distractions.
- Accent color: HSL values of 180, 60%, and 40% (approximately #34A7A7), an energetic teal tone used for secondary actions and highlighting key metrics to draw the user's attention without overwhelming the interface.
- Headline font: 'Space Grotesk' sans-serif, for headlines and shorter text portions. Body font: 'Inter', sans-serif.
- Consistent and professional icon set for skills, assessment types, and user roles, providing clear visual cues to aid navigation.
- Clean, modular layout with a clear hierarchy for presenting user profiles, assessment results, and recruiter tools. Optimize for readability and ease of navigation.
- Subtle transitions and loading animations to provide feedback and maintain user engagement during assessments and data loading.