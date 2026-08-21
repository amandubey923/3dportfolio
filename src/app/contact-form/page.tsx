"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <section className="relative z-10 max-w-4xl mx-auto py-32 px-6">

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 backdrop-blur-xl px-6 py-4 shadow-[0_0_40px_var(--cyber-glow-primary)] animate-fadeIn">
            <CheckCircle className="text-green-400 w-6 h-6" />
            <span className="text-sm font-medium text-foreground">
              Message sent successfully!
            </span>
          </div>
        </div>
      )}

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">
          Send Me a <span className="text-primary">Message</span>
        </h2>

        <p className="text-muted-foreground mt-4">
          Have an idea, opportunity, or just want to say hello?
          I'd love to hear from you.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-10 shadow-[0_0_80px_var(--cyber-glow-primary)]">

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);

            await fetch("/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
              }),
            });

            // SHOW SUCCESS MESSAGE
            setShowSuccess(true);

            setTimeout(() => {
              setShowSuccess(false);
            }, 3000);
          }}
          className="space-y-6"
        >
          
          {/* NAME */}
          <div>
            <label className="text-sm text-muted-foreground">
              Your Name
            </label>

            <input
              name="name"
              required
              placeholder="What's your good name?"
              className="mt-2 w-full rounded-lg border border-border bg-background/40 px-4 py-3 focus:border-primary outline-none transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-muted-foreground">
              Your Email
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="What's your email address?"
              className="mt-2 w-full rounded-lg border border-border bg-background/40 px-4 py-3 focus:border-primary outline-none transition"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm text-muted-foreground">
              Your Message
            </label>

            <textarea
              name="message"
              rows={6}
              required
              placeholder="What do you want to say?"
              className="mt-2 w-full rounded-lg border border-border bg-background/40 px-4 py-3 focus:border-primary outline-none transition resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.03]"
          >
            Send Message
          </button>

        </form>
      </div>
    </section>
  );
}