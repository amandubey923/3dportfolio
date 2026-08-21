import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kumaraman19137@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: "Portfolio Contact <kumaraman19137@gmail.com>",
      to: "kumaraman19137@gmail.com",
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: message,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
}