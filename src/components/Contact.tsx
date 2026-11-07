"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/ui/Logo";
import { AlertIcon, CheckIcon } from "@/components/ui/icons";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { SELECT_SERVICE_EVENT, projectTypes } from "@/lib/content";
import {
  emptyEnquiry,
  enquiryMailto,
  firstName,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { site } from "@/lib/site";

export function Contact() {
  const [form, setForm] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      setSent(false);
      setDelivered(false);
      setForm((current) => ({ ...current, service: value }));
      window.setTimeout(() => {
        document.getElementById("f-name")?.focus({ preventScroll: true });
      }, 900);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const update = (key: keyof Enquiry, value: string) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (attempted) setErrors(validateEnquiry(next));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateEnquiry(form);
    setAttempted(true);
    setErrors(nextErrors);
    const firstInvalid = nextErrors.name ? "f-name" : nextErrors.email ? "f-email" : null;
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    let wasDelivered = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(8000),
      });
      wasDelivered = response.ok;
    } catch {
      wasDelivered = false;
    }

    setDelivered(wasDelivered);
    setSent(true);
    if (!wasDelivered) window.location.href = enquiryMailto(form);
  };

  const reset = () => {
    setSent(false);
    setDelivered(false);
    setAttempted(false);
    setErrors({});
    setForm(emptyEnquiry);
  };

  return (
    <section id="contact" className="ds-section-contact">
      <div className="ds-wrap">
        <SectionKicker label="Start a conversation" index="07 / 07" />
        <div className="ds-intro ds-intro-contact">
          <div>
            <h2 data-reveal="up" className="ds-h2 ds-h2-contact">
              Have a Project in Mind? Let&apos;s Talk.
            </h2>
            <p data-reveal="up" data-delay="100" className="ds-lede ds-lede-contact">
              Whether you&apos;re planning something new, improving your home or simply exploring an idea, we&apos;d
              love to hear what you have in mind.
            </p>
            <dl className="ds-facts">
              <div className="ds-fact">
                <dt>Based in</dt>
                <dd>Woodend, North Canterbury</dd>
              </div>
              <div className="ds-fact">
                <dt>Email</dt>
                <dd>
                  <a className="ds-email" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal="up" data-delay="120" className="ds-panel">
            {sent ? (
              <div className="ds-success" role="status">
                <div className="ds-success-head">
                  <Logo tone="dark" height={36} />
                  <span className="ds-success-check">
                    <CheckIcon />
                  </span>
                </div>
                <h3>Thanks, {firstName(form.name)}. Your enquiry is ready.</h3>
                <dl className="ds-facts ds-facts-success">
                  <div className="ds-fact">
                    <dt>Reply to</dt>
                    <dd>{form.email}</dd>
                  </div>
                  <div className="ds-fact">
                    <dt>Project type</dt>
                    <dd>{form.service || "Not specified"}</dd>
                  </div>
                </dl>
                <p className="ds-success-note">
                  {delivered ? (
                    <>Your enquiry has been sent. We&apos;ll reply to {form.email}.</>
                  ) : (
                    <>
                      Design preview: nothing has been sent. Email delivery will be connected when the site is built
                      — until then, reach Scott at <a href={`mailto:${site.email}`}>{site.email}</a>.
                    </>
                  )}
                </p>
                <div className="ds-success-reset-wrap">
                  <button type="button" className="ds-success-reset" onClick={reset}>
                    Start a new enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="ds-form" noValidate aria-label="Project enquiry" onSubmit={onSubmit}>
                <div className="ds-form-head">
                  <span className="ds-form-title">Project enquiry</span>
                  <span className="ds-form-required">* Required</span>
                </div>
                <div className="ds-field">
                  <label className="ds-label" htmlFor="f-name">
                    Your name *
                  </label>
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={errors.name ? "ds-input is-invalid" : "ds-input"}
                    value={form.name}
                    aria-invalid={errors.name ? true : false}
                    aria-describedby={errors.name ? "f-name-err" : undefined}
                    onChange={(event) => update("name", event.target.value)}
                  />
                  {errors.name ? (
                    <p id="f-name-err" role="alert" className="ds-error">
                      <AlertIcon />
                      <span>{errors.name}</span>
                    </p>
                  ) : null}
                </div>
                <div className="ds-field">
                  <label className="ds-label" htmlFor="f-email">
                    Your email *
                  </label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className={errors.email ? "ds-input is-invalid" : "ds-input"}
                    value={form.email}
                    aria-invalid={errors.email ? true : false}
                    aria-describedby={errors.email ? "f-email-err" : undefined}
                    onChange={(event) => update("email", event.target.value)}
                  />
                  {errors.email ? (
                    <p id="f-email-err" role="alert" className="ds-error">
                      <AlertIcon />
                      <span>{errors.email}</span>
                    </p>
                  ) : null}
                </div>
                <fieldset className="ds-fieldset">
                  <legend className="ds-legend">Project type</legend>
                  <div className="ds-chips">
                    {projectTypes.map((type) => {
                      const selected = form.service === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          className={selected ? "ds-chip is-on" : "ds-chip"}
                          aria-pressed={selected}
                          onClick={() => update("service", selected ? "" : type)}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="ds-field">
                  <label className="ds-label" htmlFor="f-msg">
                    Project details
                  </label>
                  <textarea
                    id="f-msg"
                    name="message"
                    rows={5}
                    className="ds-textarea"
                    placeholder="Location, rough timing, what you have in mind…"
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                  />
                </div>
                <div className="ds-form-actions">
                  <AnimatedButton variant="submit" type="submit">
                    Send Enquiry
                  </AnimatedButton>
                  <p className="ds-form-note">
                    Design preview — this form doesn&apos;t send enquiries yet. To get in touch now, email{" "}
                    <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
