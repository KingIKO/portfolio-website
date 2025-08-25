# 🚀 Portfolio Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended) ⭐

**Step 1: Create GitHub Repository**
```bash
# Create a new repository on GitHub named "portfolio"
# Clone it to your local machine
git clone https://github.com/kingsleyokoli/portfolio.git
cd portfolio
```

**Step 2: Add Your Files**
```bash
# Copy your index.html and assets folder to this directory
# Add and commit your files
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

**Step 3: Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: "Deploy from a branch"
4. Branch: `main`
5. Click **Save**

Your site will be live at: `https://kingsleyokoli.github.io/portfolio`

**Step 4: Custom Domain (Optional)**
1. In Pages settings, add your custom domain
2. Update DNS records as instructed
3. Wait for DNS propagation (up to 48 hours)

---

### Option 2: Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Drag your `index.html` file to the deploy area
3. Your site is instantly live with a random URL
4. Customize the URL in site settings
5. Add custom domain if desired

---

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects it's a static site
4. Deploys automatically on every push
5. Add custom domain in project settings

---

## Pre-Deployment Checklist

- [ ] Update meta tags with your actual URLs
- [ ] Add your real resume PDF to `assets/` folder
- [ ] Test locally in multiple browsers
- [ ] Verify all links work correctly
- [ ] Check mobile responsiveness

## Local Testing

```bash
# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## Post-Deployment

- [ ] Test live site functionality
- [ ] Verify contact form (currently demo)
- [ ] Check social media previews
- [ ] Test on mobile devices
- [ ] Validate accessibility with Lighthouse

## Contact Form Integration

The contact form is currently a demo. To make it functional:

**Option A: Formspree (Recommended)**
1. Go to [formspree.io](https://formspree.io)
2. Create account and get endpoint
3. Replace form action with your Formspree endpoint

**Option B: Email Link**
Replace the form with a simple `mailto:` link

**Option C: Backend Integration**
Hook to your preferred backend service

---

## Support

- **GitHub Pages**: [GitHub Pages documentation](https://pages.github.com/)
- **Netlify**: [Netlify docs](https://docs.netlify.com/)
- **Vercel**: [Vercel docs](https://vercel.com/docs)

---

**Your portfolio is ready to deploy! 🎉**
