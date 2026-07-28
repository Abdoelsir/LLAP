import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { email: userEmail, resetToken } = JSON.parse(event.body);
   const token = resetToken || Math.random().toString(36).substring(2);
    const resetLink = `https://llap-academy.com/reset-password?token=${token}`;

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

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Mailgun email dispatch error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}