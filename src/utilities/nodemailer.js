import nodemailer from 'nodemailer'
import crypto from 'crypto'

export const nodeMailer = async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.APP_PASSWORD,
        },
    });
    let otp = crypto.randomInt(100000, 999999)

    const info = await transporter.sendMail({
        from: `"Arabseed" <${process.env.EMAIL}>`,
        to: req.body.email,
        subject: "Hello",
        text: `Hello ${req.body.name}`,
        html: `<b>Hello ${req.body.name} the otp code is ${otp}</b>`,
    });

    console.log("Message sent:", info.messageId);
    next()
};

