import { Resend } from "resend";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const RECIPIENT_EMAIL = "kumaraman19137@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, subject } = body;

    // Strict input validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return Response.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return Response.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const emailSubject = subject?.trim() || `Portfolio Inquiry from ${name.trim()}`;
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0c101d; color: #eaf2fb; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(0,240,255,0.2);">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 18px;">
          <h2 style="color: #00f0ff; margin: 0 0 4px 0; font-size: 20px;">⚡ New Portfolio Message</h2>
          <p style="color: #94a3b8; margin: 0; font-size: 13px;">Received via Aman Dubey 3D Portfolio Platform</p>
        </div>

        <div style="background-color: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.06);">
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #38bdf8;">Sender Name:</strong> ${name.trim()}</p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #38bdf8;">Sender Email:</strong> <a href="mailto:${email.trim()}" style="color: #00f0ff; text-decoration: none;">${email.trim()}</a></p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #38bdf8;">Subject:</strong> ${emailSubject}</p>
          <p style="margin: 0; font-size: 13px; color: #94a3b8;"><strong>Timestamp:</strong> ${timestamp} (IST)</p>
        </div>

        <div style="background-color: rgba(0,240,255,0.04); padding: 18px; border-radius: 8px; border-left: 4px solid #00f0ff; margin-bottom: 18px;">
          <h4 style="margin: 0 0 8px 0; color: #eaf2fb; font-size: 14px;">Message Body:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #f1f5f9;">${message.trim()}</p>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; font-size: 12px; color: #64748b; text-align: center;">
          <p style="margin: 0;">Hit "Reply" in your email client to respond directly to <strong>${email.trim()}</strong>.</p>
        </div>
      </div>
    `;

    const textContent = `
New Portfolio Message from Aman Dubey's 3D Portfolio
=====================================================
From: ${name.trim()} (${email.trim()})
Subject: ${emailSubject}
Timestamp: ${timestamp}
-----------------------------------------------------
Message:
${message.trim()}
=====================================================
    `;

    // 1. Try Resend Delivery if RESEND_API_KEY is available
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey.startsWith("re_")) {
      try {
        const resend = new Resend(resendApiKey);
        const { data, error } = await resend.emails.send({
          from: "Aman Portfolio <onboarding@resend.dev>",
          to: [RECIPIENT_EMAIL],
          replyTo: email.trim(),
          subject: emailSubject,
          html: htmlContent,
          text: textContent,
        });

        if (error) {
          console.error("Resend API returned error:", error);
          // Fall through to nodemailer backup
        } else if (data?.id) {
          return Response.json({
            success: true,
            provider: "resend",
            messageId: data.id,
          });
        }
      } catch (resendErr: any) {
        console.error("Resend delivery exception:", resendErr?.message || resendErr);
        // Fall through to nodemailer backup
      }
    }

    // 2. Backup SMTP delivery via Nodemailer if EMAIL_PASS is present
    const emailPass = process.env.EMAIL_PASS;
    if (emailPass && emailPass.trim().length > 0) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: RECIPIENT_EMAIL,
            pass: emailPass.trim(),
          },
        });

        await transporter.sendMail({
          from: `Portfolio Contact <${RECIPIENT_EMAIL}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email.trim(),
          subject: emailSubject,
          html: htmlContent,
          text: textContent,
        });

        return Response.json({
          success: true,
          provider: "smtp",
        });
      } catch (smtpErr: any) {
        console.error("SMTP backup exception:", smtpErr?.message || smtpErr);
      }
    }

    // If both failed or keys missing
    return Response.json(
      {
        success: false,
        error: "Email delivery services are currently unavailable. Please email directly at " + RECIPIENT_EMAIL,
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Contact API uncaught error:", error?.message || error);
    return Response.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
