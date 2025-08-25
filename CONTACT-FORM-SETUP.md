# 📧 Contact Form Setup Guide

## Current Status
Your contact form is currently a **front-end demo** that validates input but doesn't actually send emails.

## Option 1: Formspree (Recommended - Free) ⭐

### Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up with GitHub or email
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

### Step 2: Update Your HTML
**File:** `index.html`

**Find this line (around line 420):**
```html
<form id="contact-form" novalidate aria-describedby="form-msg">
```

**Replace with:**
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate aria-describedby="form-msg">
```

**Add hidden fields for better tracking:**
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate aria-describedby="form-msg">
  <input type="hidden" name="_subject" value="Portfolio Contact Form">
  <input type="hidden" name="_next" value="https://kingsleyokoli.github.io/portfolio#contact">
  <!-- ... rest of your form fields ... -->
</form>
```

### Step 3: Test
1. Deploy your changes
2. Fill out the form
3. Check your email for the submission
4. Check Formspree dashboard for form analytics

---

## Option 2: EmailJS (Free Tier Available)

### Step 1: Setup EmailJS
1. Go to [emailjs.com](https://emailjs.com)
2. Create account and verify email
3. Add your email service (Gmail, Outlook, etc.)
4. Create email template
5. Get your User ID, Service ID, and Template ID

### Step 2: Update Your HTML
**Add EmailJS script before closing `</body>`:**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function() {
    emailjs.init("YOUR_USER_ID");
  })();
</script>
```

**Update your form JavaScript:**
```javascript
// Replace the existing form submission code
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Show loading state
    msg.textContent = 'Sending message...';
    msg.className = 'helper';
    
    // Send via EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
      .then(() => {
        msg.textContent = 'Message sent successfully!';
        msg.className = 'helper';
        form.reset();
      })
      .catch((error) => {
        msg.textContent = 'Failed to send message. Please try again.';
        msg.className = 'error';
        console.error('EmailJS error:', error);
      });
  });
}
```

---

## Option 3: Simple Mailto Link

**Replace the entire form with:**
```html
<div class="col-8 reveal">
  <div class="hero-card">
    <h3>Get in Touch</h3>
    <p>Ready to improve your QA processes? Let's talk!</p>
    <div class="buttons">
      <a class="cta" href="mailto:ikennakokoli@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Kingsley,%0D%0A%0D%0AI'd%20like%20to%20discuss%20QA%20opportunities.%0D%0A%0D%0A[Your%20message%20here]%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20name]">
        Send Email
      </a>
    </div>
  </div>
</div>
```

---

## Option 4: Google Forms (Free)

### Step 1: Create Google Form
1. Go to [forms.google.com](https://forms.google.com)
2. Create form with fields: Name, Email, Subject, Message
3. Get the form embed code

### Step 2: Replace Your Form
**Replace the form section with:**
```html
<div class="col-8 reveal">
  <iframe 
    src="YOUR_GOOGLE_FORM_URL/viewform?embedded=true" 
    width="100%" 
    height="600" 
    frameborder="0" 
    marginheight="0" 
    marginwidth="0">
    Loading…
  </iframe>
</div>
```

---

## Form Validation (Keep This!)

Your current form validation is excellent. Keep this code for any option you choose:

```javascript
// Form validation
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const data = new FormData(form);
    const required = ['name','email','subject','message'];
    
    // Check required fields
    for (const k of required) { 
      if (!data.get(k)) { 
        msg.textContent = 'Please complete all required fields.'; 
        msg.className = 'error'; 
        return; 
      } 
    }
    
    // Validate email
    const email = String(data.get('email')||'');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { 
      msg.textContent = 'Enter a valid email.'; 
      msg.className = 'error'; 
      return; 
    }
    
    // If using mailto or other simple options
    msg.textContent = 'Thanks! Your message is ready to send.'; 
    msg.className = 'helper';
  });
}
```

---

## Recommendation

**For a portfolio site, I recommend Formspree because:**
- ✅ Free tier (100 submissions/month)
- ✅ No backend required
- ✅ Professional appearance
- ✅ Spam protection
- ✅ Easy setup
- ✅ Form analytics

---

## Testing Your Form

1. **Local testing:** Open in browser and test validation
2. **Live testing:** Deploy and test actual submission
3. **Spam testing:** Check if submissions reach your email
4. **Mobile testing:** Test on mobile devices
5. **Accessibility testing:** Ensure screen readers can use the form

---

**Your contact form will be fully functional! 📬**
