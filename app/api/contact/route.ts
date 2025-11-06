import { NextRequest } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = (body?.name as string)?.trim()
    const email = (body?.email as string)?.trim()
    const company = (body?.company as string)?.trim() ?? ""
    const service = (body?.service as string)?.trim() ?? ""
    const message = (body?.message as string)?.trim()

    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 })
    }

    const isGmail = (process.env.EMAIL_SERVICE || "").toLowerCase() === "gmail"
    const requiredEnv = isGmail
      ? ["EMAIL_USER", "EMAIL_PASS"]
      : ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS"]

    const missing = requiredEnv.filter((key) => !process.env[key])
    if (missing.length > 0) {
      return new Response(`Missing server configuration: ${missing.join(", ")}`, { status: 500 })
    }

    const recipient = process.env.EMAIL_TO ?? "connect@sarathi.studio"

    const emailService = (process.env.EMAIL_SERVICE || "").toLowerCase()
    const port = Number(process.env.EMAIL_PORT ?? 587)
    const secure = process.env.EMAIL_SECURE ? process.env.EMAIL_SECURE === "true" : port === 465

    const transporter =
      emailService === "gmail"
        ? nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          })
        : nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port,
            secure,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          })

    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error("contact_form_smtp_unreachable", verifyError)
      return new Response("SMTP credentials rejected. Please double-check EMAIL_* values.", { status: 500 })
    }

    const subject = `New inquiry${service ? ` – ${service}` : ""} | Sarathi Studio`
    const htmlBody = `
      <h2>New website inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Service:</strong> ${service || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipient,
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\n\nMessage:\n${message}`,
      html: htmlBody,
    })

    return Response.json({ ok: true })
  } catch (error: any) {
    console.error("contact_form_error", error)

    if (error?.code === "EAUTH") {
      return new Response("SMTP authentication failed. Update EMAIL_USER/EMAIL_PASS.", { status: 401 })
    }

    return new Response("Failed to send message", { status: 500 })
  }
}


