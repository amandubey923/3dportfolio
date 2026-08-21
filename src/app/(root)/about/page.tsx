import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
      {/* subtle glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(99,102,241,0.12),transparent_45%)]" />

      {/* ================= HERO ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About{" "}
            <span className="text-primary drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
              Me
            </span>
          </h1>

          <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
            I’m a disciplined software engineer focused on building scalable,
            thoughtful systems with clarity, structure, and long-term impact.
            I emphasize strong fundamentals, thoughtful design, and writing
            code that remains reliable and maintainable over time.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[350px] rounded-xl overflow-hidden border border-border bg-card shadow-[0_0_40px_rgba(56,189,248,0.25)]">
            <Image
              src="/aman/image.png"
              alt="Aman Kumar"
              fill
              priority
              className="object-cover object-top"
            />
            {/* glow ring */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-primary/30" />
          </div>
        </div>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
        <div className="space-y-4">
          <h2 className="text-xl
font-bold
tracking-tight
text-primary
drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]
animate-pulse">
            Profile
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            My name is{" "}
            <span className="text-foreground font-medium">Aman Kumar</span>, an
            Information Technology undergraduate with a strong focus on
            real-world problem solving and system-level thinking.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            I prefer discipline, patience, and long-term quality over shortcuts.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl
font-bold
tracking-tight
text-primary
drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]
animate-pulse">
            Approach
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            I view technology as part of a larger ecosystem involving human
            behavior, psychology, and design.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            This helps me build products that are intuitive, scalable, and easy
            to maintain.
          </p>
        </div>
      </div>

      {/* ================= FOCUS AREAS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Mindset",
            text: "Long-term thinking, consistency, and resilience under pressure.",
          },
          {
            title: "Interests",
            text: "Software architecture, philosophy, fitness, and systems thinking.",
          },
          {
            title: "Growth",
            text: "Learning German to improve structure and global exposure.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group relative rounded-lg border border-border bg-card/60 p-6 transition-all duration-300 hover:border-primary hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]"
          >
            <h3 className="text-xl
font-bold
tracking-tight
text-primary
drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]
animate-pulse">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.text}
            </p>

            {/* hover glow */}
            <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ring-1 ring-primary/40" />
          </div>
        ))}
      </div>
    </section>
  );
}
