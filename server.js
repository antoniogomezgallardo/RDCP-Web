const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting - limit to 5 form submissions per 15 minutes per IP
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many form submissions. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', formLimiter, async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Basic validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Email template for therapist
    const therapistEmailHtml = `
      <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #6b73ff 0%, #9b59b6 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">From your psychology website</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #6b73ff; padding-bottom: 10px;">Contact Details</h2>
          
          <div style="margin: 20px 0;">
            <strong style="color: #6b73ff;">Name:</strong>
            <p style="margin: 5px 0; color: #2c3e50;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <strong style="color: #6b73ff;">Email:</strong>
            <p style="margin: 5px 0; color: #2c3e50;">${email}</p>
          </div>
          
          ${phone ? `
          <div style="margin: 20px 0;">
            <strong style="color: #6b73ff;">Phone:</strong>
            <p style="margin: 5px 0; color: #2c3e50;">${phone}</p>
          </div>
          ` : ''}
          
          <div style="margin: 20px 0;">
            <strong style="color: #6b73ff;">Service Requested:</strong>
            <p style="margin: 5px 0; color: #2c3e50; text-transform: capitalize;">${service.replace('-', ' ')}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <strong style="color: #6b73ff;">Message:</strong>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #6b73ff;">
              <p style="margin: 0; color: #2c3e50; line-height: 1.6;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #7f8c8d; font-size: 14px; margin: 0;">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
              <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #6b73ff;">${email}</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Email template for auto-reply to client
    const clientEmailHtml = `
      <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #6b73ff 0%, #9b59b6 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Reaching Out</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Dr. Sarah Martinez - Licensed Therapist</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50;">Hi ${name},</h2>
          
          <p style="color: #2c3e50; line-height: 1.6; margin: 20px 0;">
            Thank you for taking the first step towards better mental health. I have received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #6b73ff;">
            <h3 style="color: #6b73ff; margin: 0 0 10px 0;">What Happens Next?</h3>
            <ul style="color: #2c3e50; margin: 0; padding-left: 20px;">
              <li>I will review your message and service request</li>
              <li>I'll respond within 24 hours with available appointment times</li>
              <li>We can schedule a brief 15-minute consultation call if needed</li>
              <li>All communications are confidential and secure</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffeaa7;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>Important:</strong> If this is a mental health emergency, please call 988 (Suicide & Crisis Lifeline) or 911 immediately. This email system is not monitored 24/7.
            </p>
          </div>
          
          <p style="color: #2c3e50; line-height: 1.6; margin: 20px 0;">
            I look forward to supporting you on your mental health journey.
          </p>
          
          <p style="color: #2c3e50; margin: 20px 0 0 0;">
            Warm regards,<br>
            <strong style="color: #6b73ff;">Dr. Sarah Martinez</strong><br>
            Licensed Clinical Psychologist
          </p>
        </div>
      </div>
    `;

    // Email options for therapist
    const therapistMailOptions = {
      from: `"Psychology Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form: ${service.replace('-', ' ')} - ${name}`,
      html: therapistEmailHtml,
      text: `New contact form submission:
      
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service.replace('-', ' ')}
Message: ${message}

Submitted: ${new Date().toLocaleString()}`
    };

    // Email options for client auto-reply
    const clientMailOptions = {
      from: `"Dr. Sarah Martinez" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for contacting Dr. Sarah Martinez - Psychology Services',
      html: clientEmailHtml,
      text: `Hi ${name},

Thank you for taking the first step towards better mental health. I have received your message and will get back to you within 24 hours.

What Happens Next?
- I will review your message and service request
- I'll respond within 24 hours with available appointment times
- We can schedule a brief 15-minute consultation call if needed
- All communications are confidential and secure

Important: If this is a mental health emergency, please call 988 (Suicide & Crisis Lifeline) or 911 immediately. This email system is not monitored 24/7.

I look forward to supporting you on your mental health journey.

Warm regards,
Dr. Sarah Martinez
Licensed Clinical Psychologist`
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(therapistMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    console.log(`New contact form submission from ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Error sending email:', error);

    // Different error messages for different types of errors
    let errorMessage = 'There was an error sending your message. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email configuration error. Please contact the administrator.';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Network error. Please check your connection and try again.';
    }

    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email configured for: ${process.env.EMAIL_HOST || 'Not configured'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});