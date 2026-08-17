"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/content/business";
import { residentialServices, commercialServices, allServices } from "@/content/services";

type Status = "idle" | "sending" | "sent" | "error";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [sentTo, setSentTo] = useState<{ name: string; email: string }>({ name: "", email: "" });
  const [service, setService] = useState("");

  /*
    Service pages link here as /contact/?service=Blocked%20Drains so the person
    doesn't re-pick what they just clicked. Read from window rather than
    useSearchParams — this page is statically rendered and useSearchParams would
    drag in a Suspense boundary for no benefit. Only accept an exact service
    title so a crafted URL can't inject arbitrary text into the email.
  */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    if (q && allServices.some((s) => s.title === q)) setService(q);
  }, []);

  const clearError = (name: string) =>
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      suburb: String(data.get("suburb") || "").trim(),
      service: String(data.get("service") || "").trim(),
      message: String(data.get("message") || "").trim(),
      company: String(data.get("company") || ""), // honeypot
    };

    // Light client-side check — the server validates authoritatively.
    const errs: Record<string, string> = {};
    if (!payload.name) errs.name = "Please tell us your name.";
    if (!isEmail(payload.email)) errs.email = "Enter a valid email so we can reply.";
    if (!payload.phone) errs.phone = "A contact number lets us call you back.";
    if (!payload.message) errs.message = "Let us know what you need done.";
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      setFormError("");
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    setFormError("");
    setFieldErrors({});

    try {
      // Trailing slash: the site is trailingSlash:true, so /api/enquiry/ is the
      // canonical path — hitting it directly avoids a 308 redirect per submit.
      const res = await fetch("/api/enquiry/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setSentTo({ name: payload.name, email: payload.email });
        setStatus("sent");
        form.reset();
        setService(""); // controlled, so reset() won't clear it
        return;
      }

      if (json?.fields && typeof json.fields === "object") setFieldErrors(json.fields);
      setFormError(json?.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We couldn't reach the server. Please try again, or call us.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="enquiry-panel enquiry-sent" role="status" aria-live="polite">
        <span className="enquiry-sent-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5 11-12" />
          </svg>
        </span>
        <h2>Thanks{sentTo.name ? `, ${sentTo.name.split(" ")[0]}` : ""}, that's with us.</h2>
        <p>
          We&rsquo;ll get back to you{sentTo.email ? <> at <b>{sentTo.email}</b></> : ""} or on the
          number you gave, usually the same day.
        </p>
        <p className="enquiry-sent-urgent">
          Need a plumber right now?{" "}
          <a href={business.phoneHref}>Call {business.phoneDisplay}</a>.
        </p>
        <button
          type="button"
          className="btn btn-line"
          onClick={() => {
            setStatus("idle");
            setSentTo({ name: "", email: "" });
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="enquiry-panel enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="enquiry-form-head">
        <h2>Send an enquiry</h2>
        <p>Tell us about the job and we&rsquo;ll come back to you with the next step.</p>
      </div>

      {/* Honeypot — hidden from people, catches bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="ef-service">What do you need?</label>
        <div className="field-select">
          <select
            id="ef-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">General enquiry</option>
            <optgroup label="Residential">
              {residentialServices.map((s) => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </optgroup>
            <optgroup label="Commercial">
              {commercialServices.map((s) => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </optgroup>
          </select>
          <svg className="field-caret" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="field-row">
        <Field
          id="ef-name" name="name" label="Your name" autoComplete="name"
          error={fieldErrors.name} onInput={() => clearError("name")}
        />
        <Field
          id="ef-phone" name="phone" label="Phone" type="tel" autoComplete="tel"
          error={fieldErrors.phone} onInput={() => clearError("phone")}
        />
      </div>

      <div className="field-row">
        <Field
          id="ef-email" name="email" label="Email" type="email" autoComplete="email"
          error={fieldErrors.email} onInput={() => clearError("email")}
        />
        <Field
          id="ef-suburb" name="suburb" label="Suburb" autoComplete="address-level2"
          optional error={fieldErrors.suburb} onInput={() => clearError("suburb")}
        />
      </div>

      <div className="field">
        <label htmlFor="ef-message">
          The job <span className="field-hint">(what&rsquo;s happening, and where)</span>
        </label>
        <textarea
          id="ef-message" name="message" rows={5}
          required
          aria-required="true"
          placeholder="e.g. Hot water system stopped overnight in Yanchep. Gas, about 8 years old."
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "ef-message-err" : undefined}
          onInput={() => clearError("message")}
        />
        {fieldErrors.message && (
          <span className="field-err" id="ef-message-err">{fieldErrors.message}</span>
        )}
      </div>

      {formError && (
        <p className="form-error" role="alert">
          {formError}{" "}
          <a href={`mailto:${business.email}`}>Email us</a> or{" "}
          <a href={business.phoneHref}>call {business.phoneDisplay}</a>.
        </p>
      )}

      <button type="submit" className="btn btn-fill enquiry-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="enquiry-fineprint">
        We use your details only to respond to this enquiry. No hot water?{" "}
        <a href={business.phoneHref}>Call {business.phoneDisplay}</a>. It&rsquo;s faster.
      </p>
    </form>
  );
}

function Field({
  id, name, label, type = "text", autoComplete, optional, error, onInput,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  error?: string;
  onInput?: () => void;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional && <span className="field-hint"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={!optional}
        aria-required={!optional}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        onInput={onInput}
      />
      {error && <span className="field-err" id={`${id}-err`}>{error}</span>}
    </div>
  );
}
