import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async sendResetPasswordEmail(email: string, token: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Here is the token you should use to reset your password: ${token}</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}