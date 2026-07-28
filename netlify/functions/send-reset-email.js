const formData = require('form-data');
const Mailgun = require('mailgun.js');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const userEmail = body.email;

    if (!userEmail) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Email address is required.' })
      };
    }

    const apiKey = process.env.MAILGUN_API_KEY;
    if (!apiKey) {
      console.error('CRITICAL: MAILGUN_API_KEY environment variable is missing.');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Server configuration error: Missing API key.' })
      };
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: apiKey,
    });

    const token = Math.random().toString(36).substring(2);
    const resetLink = `https://www.llap-academy.com/reset-password?token=${token}`;

    const data = await mg.messages.create('mg.llap-academy.com', {
      from: 'LLAP Academy <support@mg.llap-academy.com>',
      to: [userEmail],
      subject: 'Secure Password Reset Instructions - LLAP',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password for your LLAP academy account.</p>
          <p>Click the secure button below to choose a new password:</p>
          <a href="${resetLink}" style="background-color: #0056b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br><strong>LLAP Academy Team</strong></p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Mailgun dispatch execution error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: error.message || 'Internal server error.' }),
    };
  }
};