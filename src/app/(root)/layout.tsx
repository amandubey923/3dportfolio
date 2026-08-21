import PageWrapper from "@/components/layout/PageWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
