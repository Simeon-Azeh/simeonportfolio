import nodemailer from 'nodemailer';

// Brevo SMTP Configuration
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: '9ee24b001@smtp-brevo.com',
    pass: '8s61gNDBqdKaGtXh'
  }
});

// Email templates
const getAdminNotificationTemplate = (type, data) => {
  if (type === 'contact') {
    return {
      subject: `New Contact Form Submission: ${data.subject || 'No Subject'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
            .value { font-size: 16px; color: #1f2937; padding: 12px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #8b5cf6; }
            .message-box { background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 3px solid #8b5cf6; }
            .footer { padding: 20px; text-align: center; background-color: #f9fafb; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${data.email}" style="color: #8b5cf6; text-decoration: none;">${data.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${data.subject || 'No subject provided'}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
              <p>This message was sent from your portfolio contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  } else if (type === 'chat') {
    return {
      subject: `New Chat Message from ${data.name || data.email || 'Visitor'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
            .value { font-size: 16px; color: #1f2937; padding: 12px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #8b5cf6; }
            .message-box { background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 3px solid #8b5cf6; }
            .footer { padding: 20px; text-align: center; background-color: #f9fafb; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 New Chat Message</h1>
            </div>
            <div class="content">
              ${data.name ? `
              <div class="field">
                <div class="label">From</div>
                <div class="value">${data.name}</div>
              </div>
              ` : ''}
              ${data.email ? `
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${data.email}" style="color: #8b5cf6; text-decoration: none;">${data.email}</a></div>
              </div>
              ` : ''}
              ${data.phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${data.phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ${data.chatId ? `
              <div class="field">
                <div class="label">Chat ID</div>
                <div class="value" style="font-family: monospace; font-size: 12px;">${data.chatId}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
              <p>Reply to this visitor from your admin dashboard.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }
};

const getConfirmationTemplate = (type, data) => {
  return {
    subject: type === 'contact' 
      ? "Thanks for reaching out! I've received your message" 
      : "Thanks for your message! I'll get back to you soon",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0 0 10px 0; font-size: 28px; }
          .header p { color: rgba(255,255,255,0.9); margin: 0; font-size: 16px; }
          .content { padding: 40px 30px; text-align: center; }
          .content h2 { color: #1f2937; margin: 0 0 15px 0; font-size: 22px; }
          .content p { color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; }
          .summary { background-color: #f9fafb; padding: 25px; border-radius: 12px; text-align: left; margin: 25px 0; }
          .summary-title { font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; }
          .summary-item { margin-bottom: 12px; }
          .summary-label { font-size: 12px; color: #9ca3af; }
          .summary-value { font-size: 14px; color: #1f2937; }
          .cta { margin: 30px 0; }
          .cta a { display: inline-block; padding: 14px 30px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { padding: 25px; text-align: center; background-color: #f9fafb; }
          .footer p { color: #6b7280; font-size: 12px; margin: 5px 0; }
          .social-links { margin-top: 15px; }
          .social-links a { display: inline-block; margin: 0 8px; color: #8b5cf6; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Message Received!</h1>
            <p>Thank you for getting in touch</p>
          </div>
          <div class="content">
            <h2>Hi ${data.name || 'there'}! 👋</h2>
            <p>
              Thank you for reaching out! I've received your ${type === 'contact' ? 'message' : 'chat message'} and will get back to you as soon as possible, typically within 24-48 hours.
            </p>
            
            <div class="summary">
              <div class="summary-title">Your Message Summary</div>
              ${type === 'contact' && data.subject ? `
              <div class="summary-item">
                <div class="summary-label">Subject</div>
                <div class="summary-value">${data.subject}</div>
              </div>
              ` : ''}
              <div class="summary-item">
                <div class="summary-label">Message</div>
                <div class="summary-value">${data.message.length > 150 ? data.message.substring(0, 150) + '...' : data.message}</div>
              </div>
            </div>

            <p style="font-size: 14px;">
              In the meantime, feel free to explore my portfolio or check out my latest projects!
            </p>

            <div class="cta">
              <a href="https://simeonazeh.com/portfolio">View My Portfolio</a>
            </div>
          </div>
          <div class="footer">
            <p><strong>Simeon Azeh</strong></p>
            <p>Full Stack Developer & Designer</p>
            <p>Bumbogo, Kigali, Rwanda</p>
            <div class="social-links">
              <a href="https://github.com/Simeon-Azeh">GitHub</a> •
              <a href="https://linkedin.com/in/simeonazeh">LinkedIn</a> •
              <a href="https://simeonazeh.com">Website</a>
            </div>
            <p style="margin-top: 20px; font-size: 11px; color: #9ca3af;">
              This is an automated confirmation email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Missing type or data' });
    }

    if (!data.email && !data.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get email templates
    const adminTemplate = getAdminNotificationTemplate(type, data);
    const confirmationTemplate = getConfirmationTemplate(type, data);

    // Send notification email to admin
    await transporter.sendMail({
      from: '"Portfolio Contact" <hello@simeonazeh.me>',
      to: 's.kongnyuy@alustudent.com',
      subject: adminTemplate.subject,
      html: adminTemplate.html
    });

    // Send confirmation email to user (only if they provided an email)
    if (data.email) {
      await transporter.sendMail({
        from: '"Simeon Azeh" <hello@simeonazeh.me>',
        to: data.email,
        subject: confirmationTemplate.subject,
        html: confirmationTemplate.html
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}
