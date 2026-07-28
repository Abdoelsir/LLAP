import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

export async function sendPasswordResetEmail(userEmail, resetToken) {
  const resetLink = `https://llap-academy.com/reset-password?token=${resetToken}`;

  try {
    const data = await mg.messages.create('mg.llap-academy.com', {
      from: 'LLAP Academy <support@mg.llap-academy.com>',
      to: [userEmail],
      subject: 'Secure Password Reset Instructions - LLAP',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password for your LLAP account.</p>
          <p>Click the secure button below to choose a new password:</p>
          <a href="${resetLink}" style="background-color: #0056b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br><strong>LLAP Academy Team</strong></p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Mailgun email dispatch error:', error);
    return { success: false, error: error.message };
  }
}