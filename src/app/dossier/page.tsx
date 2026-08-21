import type { Metadata } from "next";
import DeveloperDossierView from "@/components/dossier/DeveloperDossierView";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: `Developer Dossier | ${PERSONAL_INFO.name} — Full-Stack Engineer Profile`,
  description: `Official Developer Dossier and technical resume profile of ${PERSONAL_INFO.name} (${PERSONAL_INFO.headline}). Explore verified technical skills matrix, 10+ production builds, 500+ DSA problem solutions, and SIH hackathon milestones.`,
  openGraph: {
    title: `Developer Dossier | ${PERSONAL_INFO.name}`,
    description: `Official Developer Dossier and technical resume profile of ${PERSONAL_INFO.name} (${PERSONAL_INFO.headline}).`,
    url: "https://aman-portfolio-next.netlify.app/dossier",
    images: [{ url: "/hero/hero3.png", width: 800, height: 800, alt: PERSONAL_INFO.name }],
  },
};

export default function DossierPage() {
  return <DeveloperDossierView />;
}

