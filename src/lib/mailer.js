import bcryptjs from "bcryptjs"
import prisma from "../prisma/index"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const mailer = async ( email, mailType, userId ) => {
    try {
        const hashedToken = await bcryptjs.hash(userId, 10);
        const encodedToken = encodeURIComponent(hashedToken);
        const expairyDate = new Date (Date.now() + 36000000);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (user) {
            let subjectVar = "";
            let htmlVar= ""
            if (mailType === "VERIFY") {
                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        verifyToken: hashedToken,
                        verifyExpairy: expairyDate
                    },
                });
                subjectVar = "Verify your email address";
                htmlVar = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Account Verification</title>
                            </head>
                            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
                                <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                    <div style="text-align: center; margin-bottom: 20px;">
                                        <h1 style="margin: 0; font-size: 24px; color: #4CAF50;">Welcome to aroundME</h1>
                                    </div>
                                    <div style="line-height: 1.6;">
                                        <p>Please verify your account by clicking on the following link:</p>
                                        <a href="http://localhost:3000/login/verifying/account/${encodedToken}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Verify your account</a>
                                        <p>If it doesn't work, please copy the following link and paste it in your web browser:</p>
                                        <p><a href="http://localhost:3000/login/verifying/account/${encodedToken}" style="color: #4CAF50;">http://localhost:3000/login/verifying/account/${encodedToken}</a></p>
                                    </div>
                                    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
                                        <p>Thank you!<br>Your aroundME Team</p>
                                    </div>
                                </div>
                            </body>
                            </html>
                    `
            } else if (mailType === "RESET") {
                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        passwordResetToken: hashedToken,
                        passwordResetExpairy: expairyDate
                    },
                });
                subjectVar = "Reset your password";
                htmlVar = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Reset Password</title>
                            </head>
                            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
                                <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                    <div style="text-align: center; margin-bottom: 20px;">
                                        <h1 style="margin: 0; font-size: 24px; color: #4CAF50;">Reset your password in aroundME</h1>
                                    </div>
                                    <div style="line-height: 1.6;">
                                        <p>To reset your password click on the following link:</p>
                                        <a href="http://localhost:3000/login/password/new/${encodedToken}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset password</a>
                                        <p>If it doesn't work, please copy the following link and paste it in your web browser:</p>
                                        <p><a href="http://localhost:3000/login/password/new/${encodedToken}" style="color: #4CAF50;">http://localhost:3000/login/password/new/${encodedToken}</a></p>
                                    </div>
                                    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
                                        <p>Thank you!<br>Your aroundME Team</p>
                                    </div>
                                </div>
                            </body>
                            </html>
                    `
            }
            const mailOptions = {
                    from: 'info@aroundME.com',
                    to: email,
                    subject: subjectVar,
                    html: htmlVar        
            }
            const mailResponse = await transporter.sendMail(mailOptions);
             
            return mailResponse;
        }

    } catch (error) {
        console.log(error)
    }
}