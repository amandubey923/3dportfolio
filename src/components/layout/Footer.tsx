export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Aman Dubey
        </span>

        <span>
          Designing systems with clarity & long-term impact
        </span>
      </div>
    </footer>
  );
}
