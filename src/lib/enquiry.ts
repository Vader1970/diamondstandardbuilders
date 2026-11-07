import { site } from "@/lib/site";

export type Enquiry = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export type EnquiryErrors = {
  name?: string;
  email?: string;
};

export const emptyEnquiry: Enquiry = {
  name: "",
  email: "",
  service: "",
  message: "",
};

export function validateEnquiry(form: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!form.name.trim()) errors.name = "Please tell us your name.";
  const email = form.email.trim();
  if (!email) errors.email = "Please add your email address so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That email address doesn't look quite right.";
  }
  return errors;
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export function enquiryMailto(form: Enquiry) {
  const subject = `Project enquiry from ${form.name.trim()}`;
  const body = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Project type: ${form.service || "Not specified"}`,
    "",
    form.message.trim() || "(No project details provided)",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function isEnquiry(value: unknown): value is Enquiry {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    typeof record.service === "string" &&
    typeof record.message === "string"
  );
}
