# VISION79 Website

A modern, responsive website for VISION79 built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Mobile navigation, smooth scrolling, and form validation
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized assets and efficient code

## File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Sections

1. **Navigation**: Fixed header with smooth scrolling navigation
2. **Hero Section**: Eye-catching landing area with call-to-action buttons
3. **About Section**: Company mission, vision, and statistics
4. **Services Section**: Six service offerings with icons and descriptions
5. **Contact Section**: Contact form and company information
6. **Footer**: Social links, quick links, and copyright information

## Customization

### Business Information
- **Company Name**: VISION79
- **Email**: vision79slu@gmail.com
- **Phone**: 17587260035
- **Location**: Gros-Islet St.Lucia

### Colors
- Primary Blue: `#2563eb`
- Secondary Blue: `#3b82f6`
- Dark Gray: `#1f2937`
- Light Gray: `#f8fafc`

### Fonts
- Primary: Inter (Google Fonts)
- Icons: Font Awesome 6.0

## Deployment

### Option 1: Static Hosting (Recommended)
1. Upload all files to your web hosting provider
2. Point your domain (v79sl.com) to the hosting directory
3. Ensure `index.html` is in the root directory

### Option 2: GitHub Pages
1. Create a GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Set custom domain to v79sl.com

### Option 3: Netlify/Vercel
1. Connect your repository to Netlify or Vercel
2. Deploy automatically on code changes
3. Set custom domain to v79sl.com

## Domain Configuration

To connect your domain v79sl.com:

1. **DNS Settings**: Point your domain to your hosting provider's nameservers
2. **A Record**: Add an A record pointing to your hosting IP
3. **CNAME Record**: Add a CNAME record for www.v79sl.com pointing to v79sl.com

## Customization Guide

### Changing Business Information
Edit the following in `index.html`:
- Company name: Search for "VISION79" and replace
- Email: Search for "vision79slu@gmail.com" and replace
- Phone: Search for "17587260035" and replace
- Services: Modify the service cards in the services section

### Changing Colors
Edit `styles.css`:
- Primary color: Search for `#2563eb` and replace
- Secondary color: Search for `#3b82f6` and replace
- Background colors: Search for `#f8fafc` and replace

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS in `styles.css`
3. Add any JavaScript functionality in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Images are optimized and use Font Awesome icons
- CSS and JavaScript are minified-ready
- Fonts are loaded from Google Fonts CDN
- Smooth scrolling and animations are hardware-accelerated

## Contact Form

The contact form includes:
- Name, email, subject, and message fields
- Client-side validation
- Responsive design
- Success message handling

**Note**: The form currently shows a success message. To make it functional, you'll need to:
1. Set up a backend server
2. Configure email sending (PHP, Node.js, etc.)
3. Update the form action and method in `index.html`
4. Modify the form handling in `script.js`

## License

This website is created for VISION79. All rights reserved.

## Support

For technical support or customization requests, contact:
- Email: vision79slu@gmail.com
- Phone: 17587260035
