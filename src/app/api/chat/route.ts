import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES, EXPERIENCES_DATA, CERTIFICATIONS_DATA } from "@/data/portfolioData";

export const runtime = "nodejs";

// Prepare comprehensive portfolio knowledge base for system instruction
const PORTFOLIO_KNOWLEDGE = `
YOU ARE: Aman Dubey's Official AI Portfolio Assistant ("Aman AI").
YOUR ROLE: Help recruiters, engineering leaders, clients, and visitors learn about Aman Dubey, his background, technical skills, projects, achievements, and contact information.

STRICT SCOPE & RULES:
1. ONLY answer questions related to Aman Dubey, his portfolio, projects, skills, education, certifications, milestones, and contact info.
2. If the user asks anything outside this scope (e.g. general coding help, recipes, news, unrelated subjects), politely reply:
   "I am specialized exclusively as Aman Dubey's portfolio assistant. I can help you with details about his projects, technical skills, SIH hackathon experience, or how to get in touch with him!"
3. NEVER invent or hallucinate skills, companies, experience, or fake metrics.
4. Keep answers concise, highly professional, polite, and well-structured using markdown bullets and bold text.
5. Provide relevant links (e.g., [Reader's HUB](https://reader-hub-library.vercel.app/), [GitHub](https://github.com/amandubey923), [LinkedIn](https://www.linkedin.com/in/aman-kr-dubey)) when discussing projects or contact.

AMAN DUBEY'S VERIFIED PORTFOLIO DATA:
- Name: ${PERSONAL_INFO.name} (${PERSONAL_INFO.formalName})
- Headline: ${PERSONAL_INFO.headline}
- Subheadline: ${PERSONAL_INFO.subheadline}
- Location: ${PERSONAL_INFO.location}
- Email: ${PERSONAL_INFO.email}
- Phone: ${PERSONAL_INFO.phone}
- Resume Link: ${PERSONAL_INFO.resumeUrl}
- Developer Dossier Page: /dossier
- Status: ${PERSONAL_INFO.status}
- Bio Summary: ${PERSONAL_INFO.bioDetailed}
- Social Profiles:
  * GitHub: ${PERSONAL_INFO.socials.github}
  * LinkedIn: ${PERSONAL_INFO.socials.linkedin}
  * LeetCode: ${PERSONAL_INFO.socials.leetcode} (250+ consecutive days streak)
  * GeeksforGeeks: ${PERSONAL_INFO.socials.geeksforgeeks}

CORE STATS & MILESTONES:
- 10+ Shipped Real-World Web Applications
- 500+ Algorithmic Problems Solved (LeetCode & GFG)
- 250+ Days LeetCode Problem Solving Consistency Badge
- Smart India Hackathon (SIH 2023 & 2024) National Finalist
- Core Stack: MERN & Next.js App Router, TypeScript, React.js, Node.js

TECHNICAL SKILLS (EXACT VERIFIED STACK):
${SKILL_CATEGORIES.map(
  (cat) => `* ${cat.title}: ${cat.skills.map((s) => `${s.name}${s.tag ? ` (${s.tag})` : ""}`).join(", ")}`
).join("\n")}

REAL PROJECTS (IN EXACT PRIORITY ORDER):
${PROJECTS_DATA.map(
  (p, i) => `
${i + 1}. ${p.title} ${p.featured ? "[FEATURED]" : ""}
- Category: ${p.category}
- Tagline: ${p.tagline}
- Description: ${p.description}
- Technologies: ${p.technologies.join(", ")}
- Key Features: ${p.features.join("; ")}
- Live Demo URL: ${p.liveUrl || "Source Code on GitHub"}
- GitHub Repository: ${p.githubUrl}
`
).join("\n")}

EXPERIENCE & MILESTONES:
${EXPERIENCES_DATA.map(
  (exp) => `* ${exp.role} @ ${exp.organization} (${exp.period}) [${exp.badge || exp.type}]: ${exp.highlights.join(" ")}`
).join("\n")}

CERTIFICATIONS:
${CERTIFICATIONS_DATA.map(
  (c) => `* ${c.title} by ${c.issuer}: ${c.description} (Skills: ${c.skillsGained.join(", ")})`
).join("\n")}
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If GEMINI_API_KEY is available, use Google GenAI SDK
    if (apiKey && apiKey.trim().length > 0) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        // Build conversation turns
        const formattedContents = [];

        // Add previous history if provided
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.content && (item.role === "user" || item.role === "model" || item.role === "assistant")) {
              formattedContents.push({
                role: item.role === "assistant" ? "model" : item.role,
                parts: [{ text: item.content }],
              });
            }
          }
        }

        // Add current user prompt
        formattedContents.push({
          role: "user",
          parts: [{ text: message.trim() }],
        });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: PORTFOLIO_KNOWLEDGE,
            temperature: 0.4,
            maxOutputTokens: 800,
          },
          contents: formattedContents,
        });

        const replyText = response.text || "I apologize, but I could not generate a response. Please try again.";

        return Response.json({ reply: replyText });
      } catch (geminiError: any) {
        console.error("Gemini API execution error (falling back to knowledge base handler):", geminiError?.message || geminiError);
        // Fall through to deterministic fallback if API is rate-limited or fails
      }
    }

    // High-fidelity fallback engine when API key is missing or rate-limited
    const lower = message.toLowerCase().trim();
    let fallbackReply = "";

    if (lower.includes("who is") || lower.includes("about") || lower.includes("tell me about") || lower.includes("introduce")) {
      fallbackReply = `**Aman Dubey** is a **Full-Stack Developer & Software Engineer** based in India. He specializes in building scalable web applications with **React.js, Next.js (App Router), Node.js, Express.js, TypeScript, and MongoDB/SQL**.\n\nHe is an **SIH National Finalist**, has shipped **10+ real-world production projects**, and maintains a **250+ days unbroken LeetCode streak**. You can view his resume at [Resume](${PERSONAL_INFO.resumeUrl}) or reach out via [Email](mailto:${PERSONAL_INFO.email}).`;
    } else if (lower.includes("project") || lower.includes("work") || lower.includes("app") || lower.includes("built")) {
      fallbackReply = `Here are Aman's top projects:\n\n1. **[Reader's HUB](https://reader-hub-library.vercel.app/)** (#1 Featured) — Next-Gen Digital Library & Reading Ecosystem with dynamic theme customization and Convex/Node backend.\n2. **[Transaction-Validator](https://transaction-validator-aman.vercel.app)** — High-throughput CSV stream parser and financial anomaly detection engine.\n3. **[Dentiva AI](https://dentiva-ai-aman.netlify.app)** — Conversational voice-enabled healthcare dental assistant and appointment scheduler.\n4. **[Productify SaaS](https://frontend-productify.vercel.app)** — Digital creator asset hosting & commerce platform.\n5. **[AI Image Generator](https://image-generator-studio.netlify.app)** — Neural image transformation SaaS platform.\n\nYou can inspect all 10 projects with full live demos in the **Projects** section!`;
    } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("language")) {
      fallbackReply = `Aman's core technical arsenal includes:\n\n* **Languages:** C++, JavaScript (ES6+), TypeScript\n* **Frameworks & Libraries:** React.js, Next.js (App Router), Node.js, Express.js, Tailwind CSS\n* **Databases:** MongoDB, PostgreSQL, Firebase, Convex, Neon (SQL)\n* **AI & Integrations:** Gemini AI, Vapi AI, Prisma ORM, Clerk Auth\n* **Tools & Platforms:** Git, GitHub, Vercel, Netlify, Render, Railway, VS Code\n* **Core CS:** Data Structures & Algorithms, OOP, Operating Systems, Web Development`;
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("hire") || lower.includes("reach") || lower.includes("message")) {
      fallbackReply = `You can connect with Aman Dubey directly:\n\n* 📧 **Email:** [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})\n* 📞 **Phone:** ${PERSONAL_INFO.phone}\n* 💼 **LinkedIn:** [linkedin.com/in/aman-kr-dubey](${PERSONAL_INFO.socials.linkedin})\n* 🐙 **GitHub:** [github.com/amandubey923](${PERSONAL_INFO.socials.github})\n* 📝 **Contact Form:** Use the interactive form at the bottom of the page!`;
    } else if (lower.includes("hackathon") || lower.includes("sih") || lower.includes("achievement") || lower.includes("experience")) {
      fallbackReply = `Aman is a **Smart India Hackathon (SIH 2023 & 2024) National Finalist**, where he designed technical system flows and architected prototypes under high-pressure real-world constraints. He has also built & deployed **10+ production web applications** with 100% uptime and holds a **250+ Days LeetCode Consistency Badge**.`;
    } else if (lower.includes("certif") || lower.includes("award") || lower.includes("credential")) {
      fallbackReply = `Aman's verified certifications include:\n\n* **LeetCode 100 Days Badge** (Consistent algorithmic problem solving)\n* **Next.js – Skill Up Certification** (GeeksforGeeks)\n* **Smart India Hackathon Recognition** (Ministry of Education / SIH)\n* **MongoDB Transactions Certification** (MongoDB University)\n* **MERN Stack Summer Training** (ASB Academy / CGC Landran)\n* **AWS Academy Graduate – Cloud Operations** (AWS)`;
    } else if (lower.includes("reader") || lower.includes("hub") || lower.includes("library")) {
      fallbackReply = `**Reader's HUB** is Aman's **#1 featured project**! It is a modern digital library platform engineered for discovering, exploring, reviewing, and managing world literature. It features real-time catalog search, an interactive multi-theme customizer, and full responsive design.\n\n🔗 **Live Demo:** [reader-hub-library.vercel.app](https://reader-hub-library.vercel.app/)\n📂 **GitHub:** [ReadersHUB-A-Digital-Library-Platform](https://github.com/amandubey923/ReadersHUB-A-Digital-Library-Platform)`;
    } else {
      fallbackReply = `Hello! I am **Aman AI**, Aman Dubey's portfolio assistant. I can answer anything about Aman's background, his **10+ full-stack projects** (like **Reader's HUB** and **Transaction Validator**), **technical skills**, **SIH hackathon milestones**, or **contact info**.\n\nFeel free to ask questions like:\n* *"What technologies does Aman use?"*\n* *"Tell me about Reader's HUB"* \n* *"How can I contact Aman?"*`;
    }

    return Response.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error("Chat API route error:", error?.message || error);
    return Response.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}

