export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  image: string;
  category: "Full Stack" | "AI & ML" | "Frontend & Tools";
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  metrics?: string;
}

export interface SkillItem {
  name: string;
  iconName?: string;
  level?: "Core" | "Advanced" | "Proficient";
  category: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: { name: string; tag?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "Hackathon" | "Development" | "Problem Solving" | "Open Source";
  location?: string;
  highlights: string[];
  badge?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  image: string;
  description: string;
  skillsGained: string[];
  credentialUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Aman Dubey",
  formalName: "Aman Kumar Dubey",
  headline: "Full-Stack Developer & Software Engineer",
  subheadline: "Building modern responsive web applications, robust full-stack software, and clean user interfaces.",
  bioShort: "Disciplined software engineer focused on building clean, reliable, and responsive web applications with modern web technologies.",
  bioDetailed: `I am an Information Technology student and full-stack developer with strong foundations in data structures, algorithms, and web technologies. I build full-stack web applications using React, Next.js, Node.js, Express, and MongoDB/SQL with a strong emphasis on clean code, modular architecture, and responsive user experiences. Beyond software development, I actively practice algorithmic problem solving (250+ days consistency) and enjoy continuous learning.`,
  status: "Available for Roles & Opportunities",
  statusColor: "emerald",
  email: "kumaraman19137@gmail.com",
  phone: "+91 8969230625",
  location: "Mohali, Punjab, India",
  resumeUrl: "/resume/Aman_Dubey_Resume923.pdf",
  avatarImage: "/images/aman.png",
  portraitImage: "/hero/hero3.png",
  heroImage: "/hero/hero3.png",
  socials: {
    github: "https://github.com/amandubey923",
    linkedin: "https://www.linkedin.com/in/aman-kr-dubey",
    leetcode: "https://leetcode.com/u/aman_dubey923",
    geeksforgeeks: "https://www.geeksforgeeks.org/profile/kumaramag0dt",
  },
  stats: [
    { label: "Full-Stack Projects", value: "8+ Shipped" },
    { label: "DSA Problem Solving", value: "500+ Solved" },
    { label: "Hackathons", value: "SIH Participant" },
    { label: "Core Technical Stack", value: "MERN & Next.js" },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "readers-hub",
    title: "Reader's HUB",
    tagline: "Digital Library & Interactive Study Platform",
    description: "A responsive digital reading and study platform featuring 360+ curated books, an interactive PDF reader with annotations, and Gemini AI contextual translation.",
    longDescription: "Reader's HUB is a responsive digital reading and study platform featuring 360+ curated books across diverse genres with fast search, an interactive PDF reader with dual-page spread view, freehand vector annotations, local reading progress tracking, and Google Gemini API contextual page translation into Hindi and Hinglish.",
    image: "/projects/readershub-preview.jpg",
    category: "Full Stack",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PDF.js", "Google Gemini API", "Web Audio API", "LocalStorage"],
    features: [
      "360+ curated books across diverse genres with fast search and instant category filtering",
      "Interactive PDF reader with dual-page spread view, vector annotations, and notes",
      "Contextual page translation into Hindi and Hinglish powered by Google Gemini API",
      "15-minute daily reading streak system and local reading progress tracking",
    ],
    liveUrl: "https://reader-hub-library.vercel.app/",
    githubUrl: "https://github.com/amandubey923/library-optimized",
    featured: true,
    metrics: "#1 Featured Platform",
  },
  {
    id: "dentiva-ai",
    title: "Dentiva AI – Dental Healthcare",
    tagline: "AI Voice Consultation, Clinical Triage & Appointment Scheduling",
    description: "An AI-assisted dental healthcare platform featuring real-time clinical appointment scheduling, doctor selection, Vapi Voice AI consultations, and admin dashboard.",
    longDescription: "Dentiva AI is an AI-assisted dental healthcare platform featuring real-time clinical appointment scheduling, doctor selection, and patient triage. Integrated conversational Voice AI using Vapi AI SDK (@vapi-ai/web) and Gemini AI for live patient voice consultations, backed by PostgreSQL and Prisma ORM.",
    image: "/projects/dentiva-ai-preview.jpg",
    category: "AI & ML",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma ORM", "Clerk Auth", "Vapi AI"],
    features: [
      "Conversational Voice AI consultations using Vapi AI SDK and Gemini AI for live symptom triage",
      "Real-time clinical appointment scheduling with doctor selection and slot reservation",
      "Admin management dashboard backed by PostgreSQL and Prisma ORM to monitor bookings",
      "Analytics visualizations with Recharts and automated email notifications via Resend",
    ],
    liveUrl: "https://dentiva-ai-aman.netlify.app/",
    githubUrl: "https://github.com/amandubey923/dentiva-ai",
    featured: true,
    metrics: "AI Voice Integrated",
  },
  {
    id: "transaction-validator",
    title: "Transaction-Validator",
    tagline: "CSV Transaction Validation & Anomaly Detection Tool",
    description: "Upload transaction CSV datasets, validate records against financial rules, detect corrupt entries, identify anomalies, and export clean processed data.",
    longDescription: "A financial data utility platform designed to ingest CSV transaction datasets, execute rule-based schema validations, detect anomalies, and export cleaned datasets in standardized formats.",
    image: "/projects/transaction_validator_thumbnail_1789323633722.jpg",
    category: "Full Stack",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CSV Stream Parser", "Data Validation Engine"],
    features: [
      "Real-time CSV file stream parsing and multi-tier schema validation",
      "Visual anomaly highlighting with detailed parsing and error logs",
      "One-click sanitized dataset export in standardized CSV format",
      "Responsive cyber-inspired analytics dashboard",
    ],
    liveUrl: "https://transaction-validator-aman.vercel.app",
    githubUrl: "https://github.com/amandubey923/transaction-validator",
    featured: true,
    metrics: "CSV Validation Engine",
  },
  {
    id: "ai-fitness",
    title: "AI Fitness Platform (FitPilot AI)",
    tagline: "Personalized Workout & Dietary Plan Generator",
    description: "Personalized fitness application that calculates user BMR/TDEE caloric targets and generates customized multi-day workout and diet plans using Gemini AI and Convex.",
    longDescription: "FitPilot AI calculates user BMR/TDEE caloric targets and generates customized multi-day workout and diet plans. Integrated Google Gemini API with structured JSON output and Groq fallback, backed by real-time Convex schemas and Clerk authentication.",
    image: "/projects/fitpilot-ai-preview.jpg",
    category: "AI & ML",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Convex", "Clerk Auth", "Google Gemini API", "Resend"],
    features: [
      "Calculates user BMR/TDEE caloric targets and customized multi-day workout & meal plans",
      "Google Gemini API with structured JSON output and Groq fallback for reliable generation",
      "Real-time data synchronization using Convex backend schemas and mutations",
      "Secure user authentication and profile management via Clerk Auth",
    ],
    liveUrl: "https://fit-pilot-ai.vercel.app/",
    githubUrl: "https://github.com/amandubey923/ai-fitness",
    featured: true,
    metrics: "Dynamic AI Plans",
  },
  {
    id: "video-interview-platform",
    title: "Video Calling Interview Platform",
    tagline: "Real-Time Peer-to-Peer Video & Technical Interview Workspace",
    description: "A real-time WebRTC video calling platform tailored for remote technical interviews with peer-to-peer audio/video connections and Socket.io signaling.",
    longDescription: "Engineered to facilitate remote technical interviews, this platform connects candidates and interviewers with direct WebRTC peer streams coordinated through Socket.io signaling.",
    image: "/projects/video_interview_thumbnail_1789323688762.jpg",
    category: "Full Stack",
    technologies: ["React.js", "WebRTC", "Socket.io", "Node.js", "Tailwind CSS"],
    features: [
      "Direct peer-to-peer WebRTC video and audio streaming",
      "Room creation with shareable unique access tokens",
      "In-call control bar for mic, video, and screen toggle",
      "Signaling server infrastructure built with Node and Socket.io",
    ],
    liveUrl: "https://video-calling-interview-plattform.netlify.app",
    githubUrl: "https://github.com/amandubey923/Interview-video-calling-platform",
    featured: true,
    metrics: "Real-Time WebRTC",
  },
  {
    id: "productify",
    title: "Productify SaaS",
    tagline: "Creator Digital Product Hosting & Management Platform",
    description: "A full-stack web platform enabling creators to upload, manage, showcase, and distribute digital products with a Node/Express backend and MongoDB database.",
    longDescription: "Productify delivers an end-to-end commerce interface for independent digital creators. Built with a Node/Express backend, MongoDB persistence, and an intuitive Next.js frontend.",
    image: "/projects/project8.png",
    category: "Full Stack",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST API"],
    features: [
      "Creator dashboard for uploading and configuring digital goods",
      "Secured asset access management and authenticated downloads",
      "Public-facing storefront with catalog search and filters",
      "RESTful API architecture with MongoDB database",
    ],
    liveUrl: "https://frontend-productify.vercel.app",
    githubUrl: "https://github.com/amandubey923/productify",
    featured: false,
    metrics: "MERN Stack",
  },
  {
    id: "ai-image-generator",
    title: "AI Image Generator Studio",
    tagline: "Full-Stack Web App for Neural Image Style Transformations",
    description: "A full-stack creative web application that allows users to upload photos and transform them into distinct artistic styles with modern UI interactions.",
    longDescription: "A generative art web platform leveraging visual neural APIs. Features image uploads, aesthetic style filters, real-time generation previews, and asset management.",
    image: "/projects/project9.png",
    category: "AI & ML",
    technologies: ["React.js", "Node.js", "Express.js", "AI Image API", "Tailwind CSS"],
    features: [
      "Instant image upload with live client-side preview",
      "Multi-style generative transformation options",
      "High-resolution download and history caching",
      "Responsive modern user experience",
    ],
    liveUrl: "https://image-generator-studio.netlify.app",
    githubUrl: "https://github.com/amandubey923/image-generator",
    featured: false,
    metrics: "AI API Integration",
  },
  {
    id: "text-workspace",
    title: "TextWorkspace Utility App",
    tagline: "Client-Side Text Transformation & String Analytics Utility",
    description: "A fast client-side text manipulation workspace built with React to analyze word density, reformat casings, clean whitespace, and copy results.",
    longDescription: "A developer and writer utility designed for rapid text processing. Features instant word/character counts, case conversions (camel, snake, upper, lower), whitespace cleaning, and clipboard operations.",
    image: "/projects/project4.png",
    category: "Frontend & Tools",
    technologies: ["React.js", "Tailwind CSS", "JavaScript Regex", "Clipboard API"],
    features: [
      "Real-time word, character, sentence, and reading-time metrics",
      "Multi-mode case transformations and regex text sanitizer",
      "Instant one-click copy and clean workspace reset",
    ],
    liveUrl: "https://text-workspace.vercel.app",
    githubUrl: "https://github.com/amandubey923/TextWorkspace",
    featured: false,
    metrics: "Client-Side Utility",
  },
  {
    id: "book-store-app",
    title: "Book Suggestion & Review App",
    tagline: "Full-Stack Literary Review & Community CRUD Platform",
    description: "A full-stack book community platform where readers upload cover photography, write reviews, rate titles, and discover community recommendations.",
    longDescription: "A MERN stack platform designed for book enthusiasts. Provides CRUD capabilities for user reviews, cover image storage, dynamic rating metrics, and curated book discovery lists.",
    image: "/projects/project5.png",
    category: "Full Stack",
    technologies: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js"],
    features: [
      "Full CRUD operations for book entries and community ratings",
      "Image upload support for custom book covers and photos",
      "Dynamic filtering by rating, author, and literary genre",
      "Backend API with MongoDB document schemas",
    ],
    githubUrl: "https://github.com/amandubey923/book-store-app",
    featured: false,
    metrics: "MERN CRUD",
  },
  {
    id: "library-book",
    title: "Library Book Explorer",
    tagline: "Interactive Digital Reading & Literary Catalog Hub",
    description: "A responsive web application allowing users to search, explore, and preview book summaries with an intuitive reading interface.",
    longDescription: "A curated digital library client built with modern JavaScript and responsive layouts to search global titles, preview synopses, and explore authors.",
    image: "/projects/project3.png",
    category: "Frontend & Tools",
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Book API Integration"],
    features: [
      "Fast client-side search across book titles and authors",
      "Clean responsive card layouts with book detail modal views",
      "Cross-browser compatible semantic web implementation",
    ],
    liveUrl: "https://library-book1.netlify.app/index.html",
    githubUrl: "https://github.com/amandubey923/LIBRARY-BOOK",
    featured: false,
    metrics: "Pure JS / DOM",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    description: "Strong foundation in typed languages for algorithmic problem solving and web systems.",
    icon: "Code2",
    skills: [
      { name: "C++", tag: "DSA & Problem Solving" },
      { name: "JavaScript", tag: "ES6+ Core" },
      { name: "TypeScript", tag: "Type Safety" },
      { name: "SQL", tag: "Relational Queries" },
      { name: "HTML5 & CSS3", tag: "Semantic & Responsive" },
    ],
  },
  {
    title: "Frontend & UI",
    description: "Component-driven, responsive user interfaces built with modern standards.",
    icon: "Layout",
    skills: [
      { name: "React.js", tag: "Components & State" },
      { name: "Next.js", tag: "App Router & SSR" },
      { name: "Tailwind CSS", tag: "Modern Styling" },
      { name: "PDF.js", tag: "Document Rendering" },
      { name: "HTML5 Canvas", tag: "Interactive Graphics" },
    ],
  },
  {
    title: "Backend & APIs",
    description: "Server-side logic, RESTful APIs, and real-time streaming services.",
    icon: "Server",
    skills: [
      { name: "Node.js", tag: "Async Runtime" },
      { name: "Express.js", tag: "REST APIs" },
      { name: "WebSockets", tag: "Real-Time / Socket.io" },
    ],
  },
  {
    title: "Databases & State",
    description: "Document and relational database modeling, schemas, and cloud data stores.",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", tag: "Relational SQL" },
      { name: "MongoDB", tag: "NoSQL & Mongoose" },
      { name: "Convex", tag: "Real-Time Backend" },
      { name: "Prisma ORM", tag: "Type-Safe DB Client" },
      { name: "Neon (SQL)", tag: "Serverless Postgres" },
    ],
  },
  {
    title: "AI & Integrations",
    description: "Practical generative AI, conversational voice SDKs, and platform integrations.",
    icon: "Cpu",
    skills: [
      { name: "Google Gemini API", tag: "LLM Integration" },
      { name: "Vapi AI", tag: "Conversational Voice" },
      { name: "Clerk Auth", tag: "Authentication" },
      { name: "Resend", tag: "Transactional Email" },
      { name: "WebRTC", tag: "P2P Video & Audio" },
    ],
  },
  {
    title: "Tools & Deployment",
    description: "Development environments, version control, and cloud hosting platforms.",
    icon: "Cloud",
    skills: [
      { name: "Git", tag: "Version Control" },
      { name: "GitHub", tag: "Collaboration" },
      { name: "Vercel", tag: "Web Deployment" },
      { name: "Netlify", tag: "Hosting & CI/CD" },
      { name: "Render", tag: "Cloud Services" },
      { name: "Railway", tag: "Infrastructure" },
      { name: "VS Code", tag: "Primary Editor" },
      { name: "Postman", tag: "API Testing" },
    ],
  },
  {
    title: "Core Computer Science",
    description: "Computer science fundamentals, operating systems, and algorithmic problem solving.",
    icon: "Server",
    skills: [
      { name: "Data Structures & Algorithms", tag: "500+ Solved" },
      { name: "Object-Oriented Programming (OOP)", tag: "Modular Design" },
      { name: "Operating Systems", tag: "OS Fundamentals" },
      { name: "Web Architecture", tag: "System Design" },
    ],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "sih-hackathon",
    role: "Team Member & Full-Stack Contributor",
    organization: "Smart India Hackathon (College Level / SIH)",
    period: "2023 – 2024",
    type: "Hackathon",
    location: "Punjab, India",
    badge: "SIH Participant",
    highlights: [
      "Represented college team in Smart India Hackathon internal evaluation problem statement tracks.",
      "Developed full-stack web prototypes and presented structured technical solutions under tight timelines.",
      "Collaborated in agile team settings with focus on problem formulation and rapid prototyping.",
    ],
  },
  {
    id: "fullstack-production",
    role: "Full-Stack Application Development",
    organization: "Independent Projects & Deployments",
    period: "2023 – Present",
    type: "Development",
    badge: "8+ Shipped Apps",
    highlights: [
      "Engineered and deployed responsive web applications including SaaS tools, digital libraries, and validation utilities.",
      "Implemented authentication, MongoDB schemas, CSV data parsing, and WebRTC streaming.",
      "Deployed and maintained applications across Vercel and Netlify.",
      "Focused on clean modular code, TypeScript type safety, and responsive design across all devices.",
    ],
  },
  {
    id: "dsa-competitive",
    role: "Algorithmic Problem Solving & Data Structures",
    organization: "LeetCode & GeeksforGeeks",
    period: "Ongoing Discipline",
    type: "Problem Solving",
    badge: "250+ Days Badge",
    highlights: [
      "Achieved 250+ consecutive days of unbroken algorithmic problem solving on LeetCode.",
      "Practiced arrays, strings, trees, dynamic programming, and complexity optimization in C++ and JavaScript.",
      "Focused on writing clean, optimal code with attention to time and space complexity.",
    ],
  },
  {
    id: "open-source-contribution",
    role: "Open Source Collaboration",
    organization: "GitHub Community",
    period: "Ongoing",
    type: "Open Source",
    badge: "Community",
    highlights: [
      "Maintained public code repositories with descriptive commits, clean README documentation, and structured branches.",
      "Practiced component reusability, semantic HTML, and accessibility best practices.",
    ],
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "sih-cert",
    title: "Smart India Hackathon Participation",
    issuer: "Ministry of Education / SIH",
    issueDate: "2024",
    image: "/certifications/cert3.png",
    description: "Certificate of participation in Smart India Hackathon internal college evaluation, contributing software solutions and rapid prototyping.",
    skillsGained: ["System Design", "Rapid Prototyping", "Teamwork", "Problem Solving"],
  },
  {
    id: "aws-academy",
    title: "AWS Academy Graduate – Cloud Operations",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2024",
    image: "/certifications/cert6.png",
    description: "Completed structured cloud training covering core AWS cloud services, IAM security, compute (EC2), storage (S3), and networking basics.",
    skillsGained: ["AWS Fundamentals", "Cloud Operations", "IAM & S3", "Networking"],
  },
  {
    id: "mongodb-transactions",
    title: "MongoDB Transactions Certification",
    issuer: "MongoDB University",
    issueDate: "2024",
    image: "/certifications/cert4.png",
    description: "Certified proficiency in MongoDB multi-document transactions, data modeling, indexing strategies, and database reliability in full-stack applications.",
    skillsGained: ["MongoDB", "Transactions", "Schema Design", "Database Reliability"],
  },
  {
    id: "leetcode-100",
    title: "LeetCode 100 Days Badge",
    issuer: "LeetCode",
    issueDate: "2023",
    image: "/certifications/cert1.png",
    description: "Awarded for completing 100+ consecutive days of algorithmic problem solving, demonstrating consistency and data structure proficiency.",
    skillsGained: ["Data Structures", "Algorithms", "Time/Space Complexity", "C++"],
  },
  {
    id: "nextjs-gfg",
    title: "Next.js – Skill Up Certification",
    issuer: "GeeksforGeeks",
    issueDate: "2024",
    image: "/certifications/cert2.png",
    description: "Training covering Next.js App Router, React Server Components, server-side data fetching strategies (SSR/SSG), and route handlers.",
    skillsGained: ["Next.js App Router", "Server Components", "Layouts & Routing", "SSR / SSG"],
  },
  {
    id: "mern-summer-training",
    title: "MERN Stack Summer Training",
    issuer: "ASB Academy / CGC Landran",
    issueDate: "2023",
    image: "/certifications/cert5.png",
    description: "Full-stack engineering program covering end-to-end MERN architecture, RESTful API development, user authentication, and deployment.",
    skillsGained: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
  },
  {
    id: "mindhack",
    title: "MINDHACK Hackathon Award",
    issuer: "Phoenix Club, CEC",
    issueDate: "2023",
    image: "/certifications/cert8.png",
    description: "Recognized for active participation and practical problem-solving in the MINDHACK engineering hackathon.",
    skillsGained: ["Engineering Collaboration", "Problem Solving", "Hackathon Delivery"],
  },
  {
    id: "trends-in-it",
    title: "Latest Trends in IT Workshop",
    issuer: "ThinkNEXT Technologies",
    issueDate: "2023",
    image: "/certifications/cert7.png",
    description: "Industry workshop focused on modern software engineering workflows, agile delivery methodologies, and web development tooling.",
    skillsGained: ["Industry Practices", "Agile Methodologies", "Modern Tooling"],
  },
];
