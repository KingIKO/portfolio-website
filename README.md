# Kingsley Okoli — QA/SDET Portfolio Website

A modern, accessible portfolio website showcasing QA/SDET expertise, case studies, and services. Built with vanilla HTML, CSS, and JavaScript for maximum compatibility and easy deployment.

## ✨ Features

- **Modern Design**: Clean, professional layout inspired by modern SaaS websites
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessibility First**: WCAG 2.2 AA compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Lightweight with optimized fonts and minimal dependencies
- **SEO Ready**: Meta tags, structured data, and semantic HTML

## 🚀 Quick Deploy Options

### Option 1: GitHub Pages (Recommended)

1. **Create GitHub Repository**
   ```bash
   # Clone this repo or create new one
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`

### Option 2: Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Drag your `index.html` file to the deploy area
3. Your site is instantly live with a random URL
4. Customize the URL in site settings

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects it's a static site
4. Deploys automatically on every push

## 📁 File Structure

```
portfolio-website/
├── index.html          # Main website file
├── assets/             # Static assets folder
│   └── Kingsley_Okoli_Resume.pdf  # Your resume (add this)
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🔧 Customization

### Update Personal Information

Edit `index.html` to customize:

- **Name & Title**: Update `<title>` and header text
- **Contact Info**: Update email, LinkedIn, GitHub links
- **Case Studies**: Modify project descriptions and tools
- **Skills**: Update technology chips in the About section
- **Meta Tags**: Update Open Graph URLs for social sharing

### Add Your Resume

1. Place your resume PDF in the `assets/` folder
2. Name it `Kingsley_Okoli_Resume.pdf` (or update the link in HTML)
3. The download link will automatically work

### Contact Form Integration

The contact form is currently a demo. To make it functional:

**Option A: Form Service (Recommended)**
- Use [Formspree](https://formspree.io) (free tier available)
- Replace form action with your Formspree endpoint
- No backend required

**Option B: Email Link**
- Replace the form with a simple `mailto:` link
- Update the contact section HTML

**Option C: Backend Integration**
- Hook to your preferred backend service
- Update form submission handling in JavaScript

## 🌐 Custom Domain Setup

### GitHub Pages
1. Go to repository Settings → Pages
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic)

### Vercel
1. Go to project Settings → Domains
2. Add your custom domain
3. Configure DNS records
4. HTTPS is automatic

## 📱 Testing & Validation

### Local Testing
```bash
# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

### Accessibility Testing
- Use browser dev tools to test keyboard navigation
- Test with screen readers
- Validate with [WAVE](https://wave.webaim.org/) or [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Cross-Browser Testing
- Test on Chrome, Firefox, Safari, Edge
- Test on mobile devices
- Use [BrowserStack](https://browserstack.com) for comprehensive testing

## 🎨 Design Customization

### Colors
Update CSS custom properties in `:root`:
```css
:root {
  --brand: #3b82f6;      /* Primary blue */
  --brand-2: #22d3ee;    /* Secondary blue */
  --accent: #10b981;      /* Green accent */
  /* ... other colors */
}
```

### Typography
The site uses Inter font. To change:
1. Update Google Fonts link in `<head>`
2. Update `font-family` in CSS

### Layout
- Grid system uses 12 columns
- Responsive breakpoints at 960px and 920px
- Cards and sections are easily customizable

## 📊 Performance Optimization

### Current Optimizations
- Minimal JavaScript (vanilla, no frameworks)
- Optimized Google Fonts loading
- CSS custom properties for maintainability
- Intersection Observer for smooth reveals

### Further Optimizations
- Compress images if adding any
- Minify CSS/JS for production
- Add service worker for offline support
- Implement lazy loading for images

## 🔒 Security Considerations

- No external scripts loaded
- Form validation on client side
- HTTPS recommended for production
- Consider adding CSP headers if needed

## 📈 Analytics & Monitoring

### Google Analytics
Add to `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Other Options
- [Plausible](https://plausible.io) (privacy-focused)
- [Fathom](https://usefathom.com) (simple analytics)
- [Simple Analytics](https://www.simpleanalytics.com)

## 🚀 Deployment Checklist

- [ ] Update personal information in HTML
- [ ] Add your resume PDF to assets folder
- [ ] Update meta tags with your URLs
- [ ] Test locally in multiple browsers
- [ ] Deploy to chosen platform
- [ ] Test live site functionality
- [ ] Set up custom domain (optional)
- [ ] Add analytics (optional)
- [ ] Test contact form functionality

## 📞 Support

For deployment issues:
- **GitHub Pages**: Check [GitHub Pages documentation](https://pages.github.com/)
- **Netlify**: Check [Netlify docs](https://docs.netlify.com/)
- **Vercel**: Check [Vercel docs](https://vercel.com/docs)

## 📄 License

This portfolio template is free to use and modify for personal and commercial projects.

---

**Built with ❤️ for the QA/SDET community**

*Last updated: August 2025*
