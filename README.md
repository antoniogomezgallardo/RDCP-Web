# PsicoWeb - Psychology Website with Email Functionality

A modern, professional psychology website for Dr. Sarah Martinez with a fully functional contact form that sends emails.

## Features

✨ **Modern Design**
- Responsive, mobile-first design
- Professional gradient color scheme
- Smooth animations and transitions
- Clean, accessible interface

📧 **Email Functionality**
- Contact form sends emails to therapist
- Auto-reply confirmation to clients
- Beautiful HTML email templates
- Rate limiting for security
- Form validation and error handling

🛡️ **Security Features**
- CORS protection
- Helmet security headers
- Rate limiting (5 submissions per 15 minutes)
- Input validation and sanitization
- Environment variable protection

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

Copy the example environment file:
```bash
copy .env.example .env
```

Edit `.env` with your email settings:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=therapist@example.com

# Server Configuration
PORT=3000
NODE_ENV=production
```

### 3. Gmail Setup (Recommended)

For Gmail accounts:
1. Enable 2-factor authentication
2. Go to Google Account settings
3. Generate an "App Password" for this application
4. Use the app password in `EMAIL_PASS` (not your regular password)

### 4. Start the Server

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

The website will be available at `http://localhost:3000`

## Email Providers

### Gmail
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

### Custom SMTP
Use your hosting provider's SMTP settings.

## File Structure

```
PsicoWeb/
├── index.html          # Main website
├── styles.css          # All CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js backend server
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md           # This file
```

## API Endpoints

### POST `/api/contact`
Submit contact form data
- Rate limited to 5 requests per 15 minutes per IP
- Validates required fields
- Sends email to therapist and auto-reply to client

### GET `/api/health`
Health check endpoint
- Returns server status and configuration info

## Email Templates

The system sends two emails for each form submission:

1. **To Therapist**: Professional notification with all form data
2. **To Client**: Friendly auto-reply with next steps and emergency resources

Both emails use responsive HTML templates with the website's branding.

## Security Considerations

- Never commit `.env` file to version control
- Use app passwords, not regular passwords
- Configure firewall rules for production
- Monitor email usage to prevent abuse
- Consider adding CAPTCHA for additional protection

## Deployment

### Local Development
```bash
npm run dev
```

### Production
1. Set `NODE_ENV=production` in `.env`
2. Configure proper SMTP settings
3. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name "psicoweb"
```

### Hosting Platforms
- **Heroku**: Add environment variables in dashboard
- **DigitalOcean**: Use App Platform or Droplet
- **Netlify**: Use Netlify Functions for serverless
- **Vercel**: Deploy with Vercel CLI

## Troubleshooting

### Email Not Sending
1. Check `.env` file configuration
2. Verify SMTP credentials
3. Check server logs for specific errors
4. Test with Gmail app password first

### Form Submission Errors
1. Check browser console for JavaScript errors
2. Verify server is running on correct port
3. Check network connectivity
4. Review rate limiting (wait 15 minutes if exceeded)

### 403/CORS Errors
- Ensure the frontend is served from the same domain as the API
- Check CORS configuration if serving from different domains

## Customization

### Changing Therapist Information
Edit the content in `index.html`:
- Therapist name, credentials, and bio
- Services offered
- Contact information and hours
- Pricing

### Email Templates
Modify the HTML templates in `server.js`:
- `therapistEmailHtml` - Email to therapist
- `clientEmailHtml` - Auto-reply to client

### Styling
Update `styles.css`:
- Color scheme (CSS variables at top)
- Layout and spacing
- Responsive breakpoints
- Animations

### Functionality
Extend `script.js`:
- Form validation rules
- Additional animations
- New interactive features

## Support

For issues and questions:
1. Check this README first
2. Review server logs for error details
3. Test email configuration with a simple tool
4. Verify all environment variables are set correctly

## License

MIT License - feel free to customize for your needs.