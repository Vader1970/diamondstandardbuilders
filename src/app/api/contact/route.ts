import { NextResponse } from "next/server";
import { isEnquiry, validateEnquiry } from "@/lib/enquiry";

/**
 * Enquiry endpoint prepared for Resend.
 * Without RESEND_API_KEY the route reports `unconfigured` and the form
 * opens a mailto draft instead of claiming the message was sent.
 * With a key present, delivery is still `not-implemented` until the
 * Resend call is added here — do not report success before that exists.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, delivery: "invalid" }, { status: 400 });
  }

  if (!isEnquiry(payload)) {
    return NextResponse.json({ ok: false, delivery: "invalid" }, { status: 400 });
  }

  if (payload.message.length > 8000) {
    return NextResponse.json({ ok: false, delivery: "invalid" }, { status: 400 });
  }

  const errors = validateEnquiry(payload);
  if (errors.name || errors.email) {
    return NextResponse.json({ ok: false, delivery: "invalid", errors }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, delivery: "unconfigured" }, { status: 503 });
  }

  return NextResponse.json({ ok: false, delivery: "not-implemented" }, { status: 501 });
}
