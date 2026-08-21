import Image from "next/image";

export default function CertificationsPage() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto py-32 px-6">
      {/* Heading */}
      <div className="mb-28">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          My <span className="text-primary">Certifications</span>
        </h2>
        <p className="mt-6 max-w-3xl text-muted-foreground leading-relaxed">
          A curated collection of certifications, achievements, and competitive
          recognitions that demonstrate my dedication to continuous learning,
          problem-solving, and real-world technical excellence.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* CARD TEMPLATE */}
        {[
          {
            title: "LeetCode 100 Days Badge",
            org: "LeetCode",
            desc:
              "Earned the 100 Days Badge by consistently solving problems over 100+ days, demonstrating discipline, DSA strength, and problem-solving mindset.",
            img: "/certifications/cert1.png",
          },
          {
            title: "Next.js – Skill Up",
            org: "GeeksforGeeks",
            desc:
              "Successfully completed the Next.js Skill Up program, gaining in-depth knowledge of App Router, layouts, routing, and performance-oriented frontend development.",
            img: "/certifications/cert2.png",
          },
          {
            title: "Smart India Hackathon",
            org: "SIH (2024 & 2025)",
            desc:
              "Participated in Smart India Hackathon multiple times, contributing to innovative problem statements, teamwork, coding, and presentation under real-world constraints.",
            img: "/certifications/cert3.png",
          },
          {
            title: "MongoDB Transactions",
            org: "MongoDB University",
            desc:
              "Completed MongoDB Transactions course, gaining strong understanding of database consistency, transactions, and production-ready database design.",
            img: "/certifications/cert4.png",
          },
          
          {
            title: "MERN Stack Summer Training",
            org: "ASB Academy / CGC Landran",
            desc:
              "Completed an intensive 4-week summer training program focused on MERN stack development with hands-on projects and evaluations.",
            img: "/certifications/cert5.png",
          },
          {
            title: "AWS Academy Graduate",
            org: "AWS Academy",
            desc:
              "Earned AWS Academy Cloud Operations certification, completing 40+ hours of structured cloud training and foundational AWS concepts.",
            img: "/certifications/cert6.png",
          },
          {
            title: "Latest Trends in IT",
            org: "ThinkNEXT Technologies",
            desc:
              "Attended a certified workshop on latest IT trends, gaining exposure to industry practices, innovation, and emerging technologies.",
            img: "/certifications/cert7.png",
          },
          {
            title: "MINDHACK Hackathon",
            org: "Phoenix Club, CEC",
            desc:
              "Recognized for successful participation in MINDHACK event, showcasing creativity, collaboration, and practical problem-solving skills.",
            img: "/certifications/cert8.png",
          },
        ].map((cert, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden transition-all hover:border-primary hover:shadow-[0_0_70px_var(--cyber-glow-primary)]"
          >
            {/* Image */}
            <div className="relative h-65 w-full overflow-hidden">
              <Image
                src={cert.img}
                alt={cert.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-10 space-y-5">
              <h3 className="text-2xl font-semibold">
                {cert.title}
              </h3>

              <p className="text-sm text-primary">
                {cert.org}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {cert.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
