export default function ExperiencePage() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto py-36 px-6">
      {/* ================= HEADING ================= */}
      <div className="mb-36">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          My <span className="text-primary">Experience</span>
        </h2>

        <p className="mt-6 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          A journey shaped by competitive environments, self-driven engineering,
          and disciplined long-term growth in modern software development.
        </p>

        <div className="mt-10 h-[2px] w-24 bg-primary/60" />
      </div>

      {/* ================= TIMELINE WRAPPER ================= */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-28">
        {/* CENTER LINE (DESKTOP) */}
        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] bg-border/40 -translate-x-1/2" />

        {/* LEFT MOBILE LINE */}
        <div className="lg:hidden absolute left-4 top-0 h-full w-[2px] bg-border/40" />

        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-40">
          {/* CARD 1 */}
          <ExperienceCard
            side="left"
            title="Smart India Hackathon (SIH)"
            subtitle="National Hackathon • 2023 – 2024"
            points={[
              "Core team member in SIH 2023 & 2024",
              "Cleared internal college evaluation rounds",
              "Worked on logic building, system design & PPTs",
              "Strengthened teamwork, pressure handling & time management",
            ]}
          />

          {/* CARD 3 */}
          <ExperienceCard
            side="left"
            title="Internship Experience"
            subtitle="Internship • Placeholder"
            points={[
              "Worked on real-world frontend & backend tasks",
              "Collaborated with seniors and mentors",
              "Followed structured development workflows",
              "Learned debugging, reviews & delivery discipline",
            ]}
          />

          {/* CARD 5 */}
          <ExperienceCard
            side="left"
            title="Open Source Contribution"
            subtitle="Open Source • Placeholder"
            points={[
              "Contributed to open repositories",
              "Improved readability and maintainability",
              "Worked with pull requests & reviews",
              "Learned collaboration using Git & GitHub",
            ]}
          />
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-40 pt-0 lg:pt-64">
          {/* CARD 2 */}
          <ExperienceCard
            side="right"
            title="Full-Stack Project Development"
            subtitle="Self-Driven • Ongoing"
            points={[
              "Built full-stack apps using Next.js & TypeScript",
              "Implemented auth, routing & API integrations",
              "Focused on clean architecture & scalability",
              "Deployed production apps on Vercel & Netlify",
            ]}
          />

          {/* CARD 4 */}
          <ExperienceCard
            side="right"
            title="Freelance Work"
            subtitle="Freelance • Placeholder"
            points={[
              "Delivered small-scale projects independently",
              "Converted requirements into clean solutions",
              "Handled deadlines & client communication",
              "Improved ownership and accountability",
            ]}
          />

          {/* CARD 6 */}
          <ExperienceCard
            side="right"
            title="Future Role"
            subtitle="Upcoming • Placeholder"
            points={[
              "Reserved for upcoming professional role",
              "Will reflect real industry experience",
              "Focused on impact-driven contributions",
              "Planned long-term growth trajectory",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ================= CARD COMPONENT ================= */

function ExperienceCard({
  title,
  subtitle,
  points,
  side,
}: {
  title: string;
  subtitle: string;
  points: string[];
  side: "left" | "right";
}) {
  const dotPosition =
    side === "left"
      ? "absolute left-2 lg:left-auto lg:right-[-56px]"
      : "absolute left-2 lg:left-[-56px]";

  return (
    <div className="relative pl-10 lg:pl-0">
      {/* DOT */}
      <div
        className={`${dotPosition} top-12 h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_var(--cyber-glow-primary)]`}
      />

      {/* CARD */}
      <div className="group relative h-[320px] rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-10 transition-all hover:border-primary hover:shadow-[0_0_70px_var(--cyber-glow-primary)]">
        {/* GLOW */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

        <h3 className="relative z-10 text-2xl font-semibold mb-2">
          {title}
        </h3>

        <p className="relative z-10 text-sm text-muted-foreground mb-6">
          {subtitle}
        </p>

        <ul className="relative z-10 space-y-3 text-muted-foreground leading-relaxed text-sm">
          {points.map((point, i) => (
            <li key={i}>• {point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
