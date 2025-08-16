# 🐳 DockScope Website

A modern, responsive website for the DockScope Docker container monitoring and alerting system.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Loading**: Optimized for performance with lazy loading and efficient CSS
- **SEO Optimized**: Proper meta tags, Open Graph, and structured data
- **Interactive**: Smooth scrolling, animations, and interactive elements
- **Accessible**: WCAG compliant with proper focus states and keyboard navigation

## 📁 Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── assets/             # Images and icons
│   ├── logo.svg        # DockScope logo
│   └── favicon.svg     # Favicon
└── README.md           # This file
```

## 🛠 Setup

### Local Development

1. **Clone or download the website files**

   ```bash
   # If you have the files locally
   cd website
   ```

2. **Open in a web server**

   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server

   # Using PHP (if installed)
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Production Deployment

#### Option 1: Static Hosting (Recommended)

**Netlify:**

1. Connect your GitHub repository
2. Set build directory to `website`
3. Deploy automatically

**Vercel:**

1. Import your repository
2. Set root directory to `website`
3. Deploy

**GitHub Pages:**

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to `/website` directory

#### Option 2: Traditional Web Server

1. **Upload files to your web server**

   ```bash
   # Upload all files in the website/ directory to your web root
   scp -r website/* user@your-server:/var/www/html/
   ```

2. **Configure web server**
   ```nginx
   # Nginx configuration example
   server {
       listen 80;
       server_name dockscope.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/css application/javascript text/html;
   }
   ```

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #3b82f6; /* Main brand color */
  --secondary-color: #10b981; /* Accent color */
  --accent-color: #f59e0b; /* Warning/highlight color */
  /* ... other variables */
}
```

### Content

- **Hero section**: Edit the main headline and description in `index.html`
- **Features**: Modify the features grid in the features section
- **Pricing**: Update pricing plans and features
- **Contact**: Add your contact information and social links

### Logo

Replace `assets/logo.svg` with your custom logo (keep the same dimensions for best results).

## 📱 Mobile Optimization

The website is fully responsive and includes:

- Mobile-first design approach
- Touch-friendly navigation
- Optimized images and assets
- Fast loading on mobile networks

## 🔧 Performance Optimization

- **Minified CSS and JS** (for production)
- **Optimized images** and SVGs
- **Lazy loading** for images
- **Efficient animations** using CSS transforms
- **Gzip compression** ready

## 📊 Analytics Integration

To add Google Analytics:

1. **Add the tracking code** to the `<head>` section in `index.html`:

   ```html
   <!-- Google Analytics -->
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
   ></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag() {
       dataLayer.push(arguments);
     }
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Replace `GA_MEASUREMENT_ID`** with your actual Google Analytics ID.

## 🔒 Security

- **HTTPS**: Always serve over HTTPS in production
- **Content Security Policy**: Add CSP headers for additional security
- **XSS Protection**: Input sanitization for any forms

## 📈 SEO

The website includes:

- **Meta tags** for search engines
- **Open Graph** tags for social media
- **Structured data** for rich snippets
- **Semantic HTML** for better accessibility
- **Fast loading** for better rankings

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**

   - Check file paths in `assets/` directory
   - Ensure web server has proper permissions

2. **CSS not applying**

   - Clear browser cache
   - Check for syntax errors in `styles.css`

3. **JavaScript not working**
   - Open browser console for error messages
   - Ensure `script.js` is properly linked

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📞 Support

For website-related issues:

- Check the browser console for errors
- Validate HTML and CSS using online validators
- Test on different devices and browsers

For DockScope application support:

- Visit the main repository: https://github.com/GovindSingh9447/DockScope
- Check the main README for application documentation

## 📄 License

This website is part of the DockScope project and follows the same MIT license.

---

**Made with ❤️ for the Docker community**
