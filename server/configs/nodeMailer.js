import nodemailer from 'nodemailer';

// create a transpoter object using the SMTP settings
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async ({ to, subject, body }) => {
    const response = await transporter.sendMail({
        from: process.env.SMTP_SENDER,
        to,
        subject,
        html: body,
    })
    return response;
}

export default sendEmail;