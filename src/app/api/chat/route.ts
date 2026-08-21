import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES, EXPERIENCES_DATA, CERTIFICATIONS_DATA } from "@/data/portfolioData";

export const runtime = "nodejs";

// Prepare comprehensive portfolio knowledge base for system instruction
const PORTFOLIO_KNOWLEDGE = `
YOU ARE: Aman Dubey's Official AI Portfolio Assistant ("Aman AI").
YOUR ROLE: Help recruiters, engineering leaders, clients, and visitors learn about Aman Dubey, his background, technical skills, projects, achievements, and contact information.

STRICT SCOPE & RULES:
1. ONLY answer questions related to Aman Dubey, his portfolio, projects, skills, education, certifications, milestones, and contact info.
2. If the user asks anything outside this scope (e.g. general coding help, celebrity info, recipes, weather, news, unrelated subjects), politely reply:
   "I am specialized exclusively as Aman Dubey's portfolio assistant. I can help you with details about his full-stack projects (like Reader's HUB and Dentiva AI), technical skills (Next.js, TypeScript, React, Node.js), algorithmic problem solving (250+ streak), or how to get in touch with him!"
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
- 8+ Shipped Real-World Web Applications
- 500+ Algorithmic Problems Solved (LeetCode & GFG)
- 250+ Days LeetCode Consistency Badge
- Smart India Hackathon (SIH) College Team Participant
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

    // Restrict off-topic questions in fallback engine
    if (
      lower.includes("weather") ||
      lower.includes("virat") ||
      lower.includes("kohli") ||
      lower.includes("recipe") ||
      lower.includes("python program") ||
      lower.includes("write a script") ||
      lower.includes("cricket") ||
      lower.includes("football") ||
      lower.includes("capital of") ||
      lower.includes("president") ||
      lower.includes("prime minister")
    ) {
      fallbackReply = `I am specialized exclusively as **Aman Dubey's Portfolio Assistant**. I can help you with details about his **full-stack projects** (like **Reader's HUB** and **Dentiva AI**), **technical skills** (Next.js, React, TypeScript, Node.js), **250+ days DSA streak**, or **how to contact him**!`;
    } else if (lower.includes("who is") || lower.includes("about") || lower.includes("tell me about aman") || lower.includes("introduce")) {
      fallbackReply = `**Aman Dubey** is a **Full-Stack Developer & Software Engineer** based in India. He builds responsive web applications with **React.js, Next.js (App Router), Node.js, Express.js, TypeScript, and MongoDB/PostgreSQL**.\n\nHe has shipped **8+ web applications**, participated in the **Smart India Hackathon**, and maintains an active **250+ days consistency streak on LeetCode**. You can inspect his [Developer Dossier](/dossier) or reach out via [Email](mailto:${PERSONAL_INFO.email}).`;
    } else if (lower.includes("project") || lower.includes("work") || lower.includes("app") || lower.includes("built")) {
      fallbackReply = `Here are Aman's top featured projects:\n\n1. **[Reader's HUB](https://reader-hub-library.vercel.app/)** ⭐ (#1 Featured) — Modern Digital Library Platform with catalog indexing, dynamic theme switching, and responsive design.\n2. **[Dentiva AI](https://dentiva-ai-aman.netlify.app)** — AI-powered healthcare platform with conversational voice consultation and doctor appointment scheduling.\n3. **[Transaction-Validator](https://transaction-validator-aman.vercel.app)** — CSV dataset validation tool with anomaly detection and clean export.\n4. **[AI Fitness Platform](https://ai-fitness-aman.netlify.app)** — Dynamic workout and dietary regimen generator.\n5. **[Video Calling Platform](https://video-calling-interview-plattform.netlify.app)** — Real-time WebRTC peer-to-peer technical interview workspace.\n\nYou can inspect all projects in the **Projects** section!`;
    } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("language")) {
      fallbackReply = `Aman's core technical arsenal includes:\n\n* **Languages:** C++, JavaScript (ES6+), TypeScript, HTML5 & CSS3\n* **Frontend & UI:** React.js, Next.js (App Router & SSR), Tailwind CSS\n* **Backend & APIs:** Node.js, Express.js, WebSockets\n* **Databases:** MongoDB, PostgreSQL, SQL\n* **AI & Integrations:** Gemini API, WebRTC\n* **Tools & Deployment:** Git, GitHub, Vercel, Netlify, VS Code, Postman\n* **Core CS:** Data Structures & Algorithms (250+ days), OOP, DBMS`;
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("hire") || lower.includes("reach") || lower.includes("message")) {
      fallbackReply = `You can connect with Aman Dubey directly:\n\n* 📧 **Email:** [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})\n* 📞 **Phone:** ${PERSONAL_INFO.phone}\n* 💼 **LinkedIn:** [linkedin.com/in/aman-kr-dubey](${PERSONAL_INFO.socials.linkedin})\n* 🐙 **GitHub:** [github.com/amandubey923](${PERSONAL_INFO.socials.github})\n* 📝 **Contact Form:** Use the interactive form at the bottom of the page!`;
    } else if (lower.includes("hackathon") || lower.includes("sih") || lower.includes("achievement") || lower.includes("experience")) {
      fallbackReply = `Aman participated in the **Smart India Hackathon (SIH)** where his college team developed full-stack web prototypes and presented structured technical solutions under tight deadlines. He has deployed **8+ web applications** across Vercel and Netlify and holds a **250+ Days LeetCode Consistency Badge**.`;
    } else if (lower.includes("certif") || lower.includes("award") || lower.includes("credential")) {
      fallbackReply = `Aman's verified certifications include:\n\n* **LeetCode 100 Days Badge** (Algorithmic problem solving consistency)\n* **Next.js – Skill Up Certification** (GeeksforGeeks)\n* **Smart India Hackathon Participation** (Ministry of Education / SIH)\n* **MongoDB Transactions Certification** (MongoDB University)\n* **MERN Stack Summer Training** (ASB Academy / CGC Landran)\n* **AWS Academy Graduate – Cloud Operations** (AWS)`;
    } else if (lower.includes("reader") || lower.includes("hub") || lower.includes("library")) {
      fallbackReply = `**Reader's HUB** is Aman's **#1 featured project**! It is a modern digital library platform engineered for discovering, exploring, reviewing, and managing world literature. It features real-time catalog search, an interactive multi-theme customizer, and full responsive design.\n\n🔗 **Live Demo:** [reader-hub-library.vercel.app](https://reader-hub-library.vercel.app/)\n📂 **GitHub:** [ReadersHUB-A-Digital-Library-Platform](https://github.com/amandubey923/ReadersHUB-A-Digital-Library-Platform)`;
    } else if (lower.includes("dentiva")) {
      fallbackReply = `**Dentiva AI** is an intelligent healthcare platform that integrates conversational voice AI for triage and dental care guidance, paired with appointment scheduling.\n\n🔗 **Live Demo:** [dentiva-ai-aman.netlify.app](https://dentiva-ai-aman.netlify.app)\n📂 **GitHub:** [dentiva-ai](https://github.com/amandubey923/dentiva-ai)`;
    } else {
      fallbackReply = `Hello! I am **Aman AI**, Aman Dubey's portfolio assistant. I can answer questions about Aman's background, his **projects** (like **Reader's HUB** and **Dentiva AI**), **technical skills**, **hackathon experiences**, or **how to contact him**.\n\nFeel free to ask questions like:\n* *"What technologies does Aman use?"*\n* *"Tell me about Reader's HUB"* \n* *"How can I contact Aman?"*`;
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
