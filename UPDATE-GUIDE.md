# 📝 Easy Content Updates Guide

## Quick Content Edits

### 1. Personal Information
**File:** `index.html`

**Update Name/Title:**
```html
<!-- Line 4 -->
<title>Kingsley Okoli — QA/SDET Portfolio</title>

<!-- Line 15 -->
<span>Kingsley&nbsp;Okoli — QA/SDET</span>
```

**Update Contact Info:**
```html
<!-- Line 450 -->
<a class="cta secondary" href="mailto:ikennakokoli@gmail.com">Email: ikennakokoli@gmail.com</a>

<!-- Line 451 -->
<a class="cta secondary" href="https://www.linkedin.com/in/kingsleyokoli" target="_blank" rel="noopener">LinkedIn</a>

<!-- Line 452 -->
<a class="cta secondary" href="https://github.com/kingsleyokoli" target="_blank" rel="noopener">GitHub</a>
```

### 2. Case Studies
**File:** `index.html`

**Update Project Details:**
```html
<!-- Lines 320-340 (Imprint project) -->
<article class="card col-4 reveal case" aria-labelledby="cs-imprint">
  <h3 id="cs-imprint">Imprint/Lucid — Web Automation</h3>
  <p class="muted">B2B web platform migrating from Lucid to Imprint naming...</p>
  <ul>
    <li><strong>Context:</strong> Built and maintained Playwright + TypeScript E2E suite...</li>
    <li><strong>Tools:</strong> Playwright, TypeScript, TestRail, GitHub Actions, Jira.</li>
    <li><strong>Impact:</strong> Cut manual regression time...</li>
  </ul>
</article>
```

### 3. Skills & Tools
**File:** `index.html`

**Update Skills Matrix:**
```html
<!-- Lines 380-390 -->
<p>
  <span class="chip">Playwright TS</span>
  <span class="chip">k6</span>
  <span class="chip">Jenkins</span>
  <!-- Add/remove chips as needed -->
</p>
```

### 4. Resume
**File:** `assets/Kingsley_Okoli_Resume.pdf`
- Replace the placeholder with your actual resume PDF
- Keep the same filename for the download link to work

---

## Advanced Customizations

### 1. Colors & Theme
**File:** `index.html`

**Update CSS Variables:**
```css
/* Lines 25-35 */
:root {
  --brand: #3b82f6;      /* Primary blue */
  --brand-2: #22d3ee;    /* Secondary blue */
  --accent: #10b981;      /* Green accent */
  --bg: #0c1117;          /* Background */
  --surface: #111827;     /* Card backgrounds */
  --text: #f8fafc;        /* Main text */
}
```

### 2. Add New Sections
**File:** `index.html`

**Template for new section:**
```html
<section id="new-section" aria-labelledby="new-section-title">
  <div class="container">
    <p class="eyebrow">Section Name</p>
    <h2 id="new-section-title">Section Title</h2>
    <p class="lead">Section description</p>
    <div class="grid mt-4">
      <div class="card col-6 reveal">
        <h3>Card Title</h3>
        <p>Card content</p>
      </div>
    </div>
  </div>
</section>
```

**Don't forget to add to navigation:**
```html
<!-- Line 70 -->
<li><a href="#new-section">New Section</a></li>
```

---

## Content Management Tips

### 1. Text Length Guidelines
- **Hero title:** Keep under 60 characters
- **Lead paragraphs:** 2-3 sentences max
- **Card descriptions:** 2-3 sentences
- **Case study bullets:** 1-2 lines each

### 2. Image Guidelines
- **Format:** PNG, JPG, or WebP
- **Size:** Max 1MB for performance
- **Dimensions:** Use consistent aspect ratios
- **Alt text:** Always include descriptive alt text

### 3. SEO Best Practices
- Update meta description when content changes
- Use descriptive heading hierarchy (H1 → H2 → H3)
- Include relevant keywords naturally in content
- Keep URLs clean and descriptive

---

## Quick Update Workflow

1. **Make changes** in `index.html`
2. **Test locally** by opening in browser
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update [section name]"
   git push origin main
   ```
4. **Verify live site** (GitHub Pages auto-deploys)

---

## Common Updates

### Adding New Projects
1. Copy existing case study template
2. Update project details, tools, and impact
3. Add to navigation if needed
4. Update skills matrix if new tools

### Updating Experience
1. Modify the About section
2. Update case studies with new details
3. Adjust years and company names
4. Refresh skills and certifications

### Changing Services
1. Update service descriptions
2. Modify tools and technologies
3. Adjust pricing if applicable
4. Update case studies to match

---

## Need Help?

- **HTML/CSS issues:** Check browser console for errors
- **Deployment problems:** See DEPLOYMENT.md
- **Content structure:** Follow the existing patterns
- **Accessibility:** Use ARIA labels and semantic HTML

---

**Your portfolio is easy to maintain! 🎯**
