import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Ensure Node runtime (important for Nodemailer)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // ✅ Configure transporter (use App Password, not Gmail password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // ✅ Compose email
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER, // where you’ll receive messages
      subject: `Website Message ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Message from Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
