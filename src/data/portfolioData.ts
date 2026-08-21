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
  subheadline: "Architecting scalable cloud systems, intuitive modern user experiences, and intelligent AI applications.",
  bioShort: "Disciplined software engineer focused on building clean, scalable, and high-performance web applications with modern technologies and system-level thinking.",
  bioDetailed: `I am an Information Technology engineer driven by system-level thinking, deep fundamentals, and a dedication to long-term software quality. I build full-stack web applications, AI-integrated platforms, and scalable services with a strong focus on clean architecture, performance, and user intuition. Beyond engineering, I actively solve algorithmic challenges (100+ LeetCode streak) and learn German to enhance cognitive structure and global collaboration.`,
  status: "Available for Roles & Opportunities",
  statusColor: "emerald",
  email: "kumaraman19137@gmail.com",
  phone: "+91 8969230625",
  location: "India",
  resumeUrl: "/resume/Resume2.pdf",
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
    { label: "Real-World Projects Built", value: "8+" },
    { label: "LeetCode Consistency", value: "100+ Days" },
    { label: "National Hackathons", value: "SIH Finalist" },
    { label: "Technical Domains", value: "Full Stack & AI" },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "readers-hub",
    title: "Reader's HUB",
    tagline: "Next-Gen Digital Library & Reading Ecosystem Platform",
    description: "A comprehensive modern digital library platform engineered for discovering, exploring, reviewing, and managing world literature with high-performance responsive UI and theme customization.",
    longDescription: "Reader's HUB is an advanced digital reading ecosystem and library platform. Built with modern web architecture, it provides fast client-side book discovery, literary catalog searches, interactive reading customizers, dynamic theme switching, and comprehensive review management.",
    image: "/projects/readershub.png",
    category: "Full Stack",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React.js", "Node.js / Convex", "Theme Engine"],
    features: [
      "Advanced real-time library catalog indexing and instant title/author search",
      "Interactive multi-theme visual selector with instant live preview and persistence",
      "Dynamic book review curation, rating workflows, and user collection management",
      "Ultra-fast, accessible editorial user experience across all screen sizes",
    ],
    liveUrl: "https://reader-hub-library.vercel.app/",
    githubUrl: "https://github.com/amandubey923/ReadersHUB-A-Digital-Library-Platform",
    featured: true,
    metrics: "#1 Featured Platform",
  },
  {
    id: "transaction-validator",
    title: "Transaction-Validator",
    tagline: "High-throughput Transaction Validation & Stream Processing Platform",
    description: "Upload transaction CSV datasets, validate records against financial rules, clean corrupt entries, detect anomalies, and export clean processed data in real time.",
    longDescription: "A mission-critical financial utility platform engineered to ingest large CSV transaction datasets, execute synchronous and asynchronous rule validations, detect syntax or value anomalies, rectify schema discrepancies, and stream structured clean datasets for export.",
    image: "/projects/project10.png",
    category: "Full Stack",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CSV Stream Parser", "Data Processing Engine"],
    features: [
      "Real-time CSV file stream parsing & multi-tier schema validation",
      "Anomaly detection with visual error highlighting & detailed logs",
      "One-click sanitized dataset export in standardized format",
      "Responsive, accessible cyber-inspired analytics dashboard",
    ],
    liveUrl: "https://transaction-validator-aman.vercel.app",
    githubUrl: "https://github.com/amandubey923/transaction-validator",
    featured: true,
    metrics: "Production Ready",
  },
  {
    id: "dentiva-ai",
    title: "Dentiva AI Dental-Health",
    tagline: "AI-Powered Dental Assistant, Voice Consultation & Smart Booking",
    description: "An intelligent healthcare web platform providing conversational AI voice dental consultations, symptom assessments, and instant doctor appointment management.",
    longDescription: "Dentiva AI bridges dental health inquiries and clinical appointments using conversational voice AI. Patients can consult an interactive AI voice assistant for triage and dental care guidance, schedule confirmed doctor appointments, and manage consultations securely.",
    image: "/projects/project7.png",
    category: "AI & ML",
    technologies: ["React.js", "Voice AI Engine", "Tailwind CSS", "REST API", "Appointment Scheduler"],
    features: [
      "Conversational voice-enabled AI triage for rapid symptom assessment",
      "Interactive doctor scheduling with calendar slot reservation",
      "Comprehensive patient records and dental care guidance hub",
      "Mobile-optimized, ultra-responsive healthcare interface",
    ],
    liveUrl: "https://dentiva-ai-aman.netlify.app",
    githubUrl: "https://github.com/amandubey923/dentiva-ai",
    featured: true,
    metrics: "AI Voice Integrated",
  },
  {
    id: "ai-fitness",
    title: "AI Fitness Platform",
    tagline: "Personalized Workout & Dietary Regimen Generator",
    description: "An intelligent fitness web application that synthesizes user body metrics, goals, and dietary preferences to generate tailored workouts and nutritional plans.",
    longDescription: "An AI-guided fitness companion that creates bespoke, science-backed workout splits and diet plans. Built with modular component architecture and responsive visual tracking.",
    image: "/projects/project1.png",
    category: "AI & ML",
    technologies: ["React.js", "Gemini / AI API", "Tailwind CSS", "JavaScript", "Responsive UI"],
    features: [
      "Custom routine generation tailored to physical metrics and targets",
      "Dynamic diet and calorie distribution calculations",
      "Interactive day-by-day exercise progression logging",
      "Sleek dark-mode wellness visual dashboard",
    ],
    liveUrl: "https://ai-fitness-aman.netlify.app",
    githubUrl: "https://github.com/amandubey923/ai-fitness",
    featured: true,
    metrics: "Dynamic AI Plans",
  },
  {
    id: "ai-image-generator",
    title: "AI Image Generator Studio",
    tagline: "Full-Stack SaaS for Neural Artistic Image Transformation",
    description: "A full-stack creative SaaS application that empowers users to upload photos and transform them into distinct artistic styles with fluid modern interactions.",
    longDescription: "A generative art SaaS platform leveraging generative visual neural models. Features user image uploads, configurable aesthetic style filters, real-time generation previews, and asset management.",
    image: "/projects/project9.png",
    category: "AI & ML",
    technologies: ["React.js", "Node.js", "Express", "AI Image API", "Tailwind CSS"],
    features: [
      "Instant image upload with live client-side preview",
      "Multi-style generative transformation pipelines",
      "High-resolution download and history caching",
      "Polished, responsive SaaS user experience",
    ],
    liveUrl: "https://image-generator-studio.netlify.app",
    githubUrl: "https://github.com/amandubey923/image-generator",
    featured: true,
    metrics: "SaaS Workflow",
  },
  {
    id: "productify",
    title: "Productify SaaS",
    tagline: "Creator Digital Product Hosting & Commerce Management Platform",
    description: "A full-stack SaaS platform enabling digital creators to securely upload, manage, showcase, and distribute digital products with a scalable backend.",
    longDescription: "Productify delivers an end-to-end commerce ecosystem for independent digital creators. Built with a scalable Node/Express backend, MongoDB persistence, and an intuitive Next.js frontend.",
    image: "/projects/project8.png",
    category: "Full Stack",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Cloud Storage"],
    features: [
      "Creator dashboard for uploading and configuring digital goods",
      "Secured asset access management and authenticated downloads",
      "Public-facing storefront with catalog search and filters",
      "Scalable RESTful API architecture with MongoDB database",
    ],
    liveUrl: "https://frontend-productify.vercel.app",
    githubUrl: "https://github.com/amandubey923/productify",
    featured: true,
    metrics: "Scalable MERN Backend",
  },
  {
    id: "video-interview-platform",
    title: "Video Calling Interview Platform",
    tagline: "Low-Latency Real-Time Video & Code Interview Workspace",
    description: "A real-time WebRTC video calling platform tailored for conducting remote technical interviews with high-fidelity peer-to-peer audio and video.",
    longDescription: "Engineered to facilitate technical hiring, this platform delivers direct WebRTC peer connections coordinated via Socket.io signaling. Enables real-time two-way video communication between candidate and interviewer with minimal latency.",
    image: "/projects/project2.png",
    category: "Full Stack",
    technologies: ["React.js", "WebRTC", "Socket.io", "Node.js", "Tailwind CSS"],
    features: [
      "Direct peer-to-peer low-latency WebRTC video and audio streaming",
      "Room creation with shareable unique access tokens",
      "In-call control bar for mic, video, and screen toggle",
      "Optimized fallback signaling server infrastructure",
    ],
    liveUrl: "https://video-calling-interview-plattform.netlify.app",
    githubUrl: "https://github.com/amandubey923/Interview-video-calling-platform",
    featured: false,
    metrics: "Real-Time WebRTC",
  },
  {
    id: "book-store-app",
    title: "Book Suggestion & Review App",
    tagline: "Full-Stack Literary Review & Recommendation Community",
    description: "A full-stack book community platform where readers upload cover photography, write comprehensive reviews, rate titles, and discover recommendations.",
    longDescription: "A comprehensive MERN stack platform designed for bibliophiles. Provides CRUD capabilities for user reviews, cover image storage, dynamic rating metrics, and curated book discovery lists.",
    image: "/projects/project5.png",
    category: "Full Stack",
    technologies: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js"],
    features: [
      "Full CRUD operations for book entries and community ratings",
      "Image upload support for custom book covers and photos",
      "Dynamic filtering by rating, author, and literary genre",
      "Secure backend API with MongoDB document schemas",
    ],
    githubUrl: "https://github.com/amandubey923/book-store-app",
    featured: false,
    metrics: "MERN Stack CRUD",
  },
  {
    id: "library-book",
    title: "Library Book Explorer",
    tagline: "Interactive Digital Reading & Literary Catalog Hub",
    description: "A responsive web application allowing users to search, explore, and preview world-famous literature with an intuitive reading interface.",
    longDescription: "A curated digital library client built with vanilla modern JavaScript and responsive layouts to search global titles, preview synopses, and explore authors.",
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
  {
    id: "text-workspace",
    title: "TextWorkspace Utility App",
    tagline: "Productivity-Focused Text Transformation & String Analytics Utility",
    description: "A fast, client-side text manipulation workspace built with React to analyze word density, reformat casings, sanitize spaces, and streamline copy workflows.",
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
    metrics: "Zero-Latency Client Tool",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Foundational & strongly typed languages for systems and modern web applications.",
    icon: "Code2",
    skills: [
      { name: "C", tag: "System Fundamentals" },
      { name: "C++", tag: "DSA & OOP" },
      { name: "JavaScript (ES6+)", tag: "Modern Web Core" },
      { name: "TypeScript", tag: "Type-Safe Architecture" },
      { name: "HTML5 & CSS3", tag: "Semantic Markup" },
    ],
  },
  {
    title: "Frontend Engineering",
    description: "Component-driven, responsive architectures built for high performance and visual fidelity.",
    icon: "Layout",
    skills: [
      { name: "React.js", tag: "Hooks & State" },
      { name: "Next.js (App Router)", tag: "SSR & Server Components" },
      { name: "Tailwind CSS", tag: "Utility-First Styling" },
      { name: "Three.js / WebGL", tag: "3D & Shaders" },
      { name: "Framer Motion", tag: "Cinematic Micro-Interactions" },
      { name: "Shadcn UI", tag: "Accessible Components" },
    ],
  },
  {
    title: "Backend & Systems",
    description: "Robust server-side pipelines, REST APIs, real-time protocols, and secure auth.",
    icon: "Server",
    skills: [
      { name: "Node.js", tag: "Asynchronous Runtime" },
      { name: "Express.js", tag: "REST API Microservices" },
      { name: "RESTful APIs", tag: "Endpoint Architecture" },
      { name: "WebRTC", tag: "Peer-to-Peer Video" },
      { name: "Socket.io", tag: "Real-time Event Streaming" },
      { name: "Postman", tag: "API Testing & Docs" },
    ],
  },
  {
    title: "Databases & Storage",
    description: "Relational, document, and reactive databases designed for consistency and scale.",
    icon: "Database",
    skills: [
      { name: "MongoDB", tag: "NoSQL & Aggregations" },
      { name: "MySQL", tag: "Relational Queries" },
      { name: "Convex", tag: "Reactive Realtime DB" },
      { name: "ACID Transactions", tag: "Data Integrity" },
    ],
  },
  {
    title: "Cloud & Dev Tooling",
    description: "CI/CD, deployment platforms, version control, and developer utilities.",
    icon: "Cloud",
    skills: [
      { name: "Git", tag: "Version Control" },
      { name: "GitHub", tag: "Collaboration & PRs" },
      { name: "Vercel", tag: "Edge & Serverless" },
      { name: "Netlify", tag: "Jamstack Hosting" },
      { name: "AWS Cloud Basics", tag: "Cloud Operations" },
      { name: "Adobe Suite", tag: "Asset Design" },
    ],
  },
  {
    title: "Engineering Practices",
    description: "Core methodologies for shipping durable, maintainable production software.",
    icon: "Cpu",
    skills: [
      { name: "Clean Architecture", tag: "Separation of Concerns" },
      { name: "Component-Driven UI", tag: "Atomic Design" },
      { name: "API-First Design", tag: "Contracts & Schema" },
      { name: "Performance & CWV", tag: "LCP & Sub-100ms INP" },
      { name: "SEO & Accessibility", tag: "Semantic Standards" },
    ],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "sih-hackathon",
    role: "Core Team Member & System Designer",
    organization: "Smart India Hackathon (SIH 2023 & 2024)",
    period: "2023 – 2024",
    type: "Hackathon",
    location: "National Level, India",
    badge: "National Finalist",
    highlights: [
      "Selected as core technical team member in nationwide SIH hackathon editions (2023 & 2024).",
      "Cleared competitive internal college evaluation rounds through rigorous problem formulation.",
      "Architected logic flows, technical system designs, and delivered persuasive executive presentations under strict real-world constraints.",
      "Demonstrated resilience, high-pressure execution, and cross-functional collaborative leadership.",
    ],
  },
  {
    id: "fullstack-production",
    role: "Full-Stack Application Development & Deployment",
    organization: "Independent Engineering & Production Systems",
    period: "2023 – Present",
    type: "Development",
    badge: "8+ Shipped Apps",
    highlights: [
      "Engineered and shipped 8+ production web applications including SaaS products, AI healthcare assistants, and transaction validation engines.",
      "Implemented full-lifecycle authentication, reactive database models, CSV stream parsing, and WebRTC streaming.",
      "Maintained 100% live uptime on deployments across Vercel and Netlify platforms.",
      "Focused on clean code modularity, TypeScript type guarantees, and fluid responsive design across all viewports.",
    ],
  },
  {
    id: "dsa-competitive",
    role: "Algorithmic Problem Solving & Data Structures",
    organization: "LeetCode & GeeksforGeeks",
    period: "Ongoing Discipline",
    type: "Problem Solving",
    badge: "100+ Days Badge",
    highlights: [
      "Earned the LeetCode 100 Days Badge through consistent, unbroken daily algorithmic problem solving.",
      "Strengthened mastery in arrays, trees, dynamic programming, graph traversals, and complexity optimization in C++ and JavaScript.",
      "Active participant in competitive coding contests with focused emphasis on time/space trade-offs.",
    ],
  },
  {
    id: "open-source-contribution",
    role: "Open Source Collaboration & Code Reviews",
    organization: "GitHub Community",
    period: "Ongoing",
    type: "Open Source",
    badge: "Community",
    highlights: [
      "Contributed to open source repositories with clean commits, structured pull requests, and documentation improvements.",
      "Reviewed and maintained standard linting rules, component reusability, and continuous integration workflows.",
    ],
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "leetcode-100",
    title: "LeetCode 100 Days Badge",
    issuer: "LeetCode",
    image: "/certifications/cert1.png",
    description: "Awarded for completing 100+ consecutive days of rigorous algorithmic problem solving, demonstrating relentless consistency, algorithmic proficiency, and analytical stamina.",
    skillsGained: ["Data Structures", "Algorithms", "Time/Space Complexity", "C++"],
  },
  {
    id: "nextjs-gfg",
    title: "Next.js – Skill Up Certification",
    issuer: "GeeksforGeeks",
    image: "/certifications/cert2.png",
    description: "Comprehensive mastery of Next.js App Router, React Server Components, server-side data fetching strategies (SSR/SSG/ISR), and performance optimization.",
    skillsGained: ["Next.js App Router", "Server Components", "Layouts & Routing", "SSR / SSG"],
  },
  {
    id: "sih-cert",
    title: "Smart India Hackathon Recognition",
    issuer: "Ministry of Education / SIH",
    image: "/certifications/cert3.png",
    description: "National recognition for participating in the Smart India Hackathon, contributing innovative software solutions, system architecture, and rapid prototyping under high pressure.",
    skillsGained: ["System Design", "Rapid Prototyping", "Team Leadership", "Innovation"],
  },
  {
    id: "mongodb-transactions",
    title: "MongoDB Transactions Certification",
    issuer: "MongoDB University",
    image: "/certifications/cert4.png",
    description: "Certified expertise in multi-document ACID transactions, distributed database consistency models, isolation levels, and enterprise MongoDB schema architecture.",
    skillsGained: ["MongoDB", "ACID Transactions", "Replica Sets", "Database Reliability"],
  },
  {
    id: "mern-summer-training",
    title: "MERN Stack Summer Training",
    issuer: "ASB Academy / CGC Landran",
    image: "/certifications/cert5.png",
    description: "Rigorous 4-week full-stack engineering program covering end-to-end MERN architecture, RESTful API development, JWT security, and production deployment.",
    skillsGained: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
  },
  {
    id: "aws-academy",
    title: "AWS Academy Graduate – Cloud Operations",
    issuer: "Amazon Web Services (AWS)",
    image: "/certifications/cert6.png",
    description: "Completed 40+ hours of structured cloud training covering AWS architecture, IAM security, compute (EC2/Lambda), storage (S3), VPC networking, and cloud operational excellence.",
    skillsGained: ["AWS Architecture", "Cloud Operations", "IAM & S3", "Networking"],
  },
  {
    id: "trends-in-it",
    title: "Latest Trends in IT Workshop",
    issuer: "ThinkNEXT Technologies",
    image: "/certifications/cert7.png",
    description: "Certified industry workshop focused on emerging IT paradigms, modern engineering pipelines, agile delivery, and next-generation software development.",
    skillsGained: ["Industry Trends", "Agile Methodologies", "Modern Tooling"],
  },
  {
    id: "mindhack",
    title: "MINDHACK Hackathon Award",
    issuer: "Phoenix Club, CEC",
    image: "/certifications/cert8.png",
    description: "Recognized for high-impact participation and practical problem-solving in the MINDHACK competitive engineering hackathon.",
    skillsGained: ["Competitive Engineering", "Problem Solving", "Hackathon Delivery"],
  },
];

