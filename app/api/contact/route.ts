import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Configure the transporter with your Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aryantotrinasrullah77@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // Ensure this is set in .env.local
      },
    });

    const mailOptions = {
      from: email, // Set the sender address to the user's email
      to: "aryantotrinasrullah77@gmail.com", // Send to yourself
      replyTo: email, // This ensures hitting "Reply" sends to the user
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
