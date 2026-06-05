"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Something went wrong.");
      }

      setState("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="contact-form contact-form-success">
        <CheckCircle size={40} style={{ color: "var(--accent)" }} />
        <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>Message sent!</p>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button className="button" type="button" onClick={() => setState("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" placeholder="Your Name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="field full">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" placeholder="Write your message here..." required />
      </div>
      {state === "error" && (
        <p style={{ color: "#f87171", fontSize: "0.88rem" }}>{errorMsg}</p>
      )}
      <button className="button primary" type="submit" disabled={state === "loading"}>
        {state === "loading" ? (
          <>
            <Loader2 size={16} className="spin" /> Sending...
          </>
        ) : (
          <>
            Send message <ArrowUpRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
