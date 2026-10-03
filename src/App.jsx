import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { caseStudies, experience, profile, projects } from './content';
import './styles.css';

const navigation = [['Work', '#work'], ['HallPass', '#hallpass'], ['About', '#about'], ['Contact', '#contact']];
const legacyAnchors = { thesis: 'approach', method: 'approach', lab: 'hallpass' };

function startingTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* The site also works when storage is unavailable. */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function SectionHeading({ id, children }) {
  return <h2 className="section-heading" id={id}>{children}<span aria-hidden="true" /></h2>;
}

export default function App() {
  const [theme, setTheme] = useState(startingTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1c1d1b' : '#f6f4f0');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Optional preference persistence. */ }
  }, [theme]);

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 700px)');
    const close = (event) => { if (event.matches) setMenuOpen(false); };
    desktop.addEventListener('change', close);
    return () => desktop.removeEventListener('change', close);
  }, []);

  useEffect(() => {
    let active = true;
    const followHash = () => {
      if (!active || !window.location.hash) return;
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(legacyAnchors[id] || id);
      if (!target) return;
      if (target instanceof HTMLDetailsElement) target.open = true;
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    const frame = requestAnimationFrame(followHash);
    document.fonts?.ready.then(followHash);
    window.addEventListener('hashchange', followHash);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', followHash);
    };
  }, []);

  const followNavigation = (href) => {
    setMenuOpen(false);
    // Move keyboard focus out of the closing mobile menu and into its destination.
    requestAnimationFrame(() => document.querySelector(href)?.focus({ preventScroll: true }));
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner reading-column">
          <a className="brand" href="#top" aria-label="Kingsley Okoli, home">Kingsley Okoli</a>
          <nav id="navigation" className={`navigation${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
            {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => followNavigation(href)}>{label}</a>)}
          </nav>
          <div className="header-controls">
            <button className="icon-button" type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
            </button>
            <button ref={menuButton} type="button" className="icon-button menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero reading-column" id="top" aria-labelledby="hero-title">
          <p className="intro-line">QA engineer <span aria-hidden="true">/</span> New York City</p>
          <h1 id="hero-title">I build the systems behind reliable software.</h1>
          <div className="hero-introduction">
            <img src="./headshot.jpg" alt="Kingsley Okoli" width="88" height="88" fetchPriority="high" />
            <p>I built the test infrastructure and AI agent harness I use to run an entire company's QA function as its sole QA engineer.</p>
            <p>My work brings together automation, application knowledge, and verification. I design the systems, investigate the failures, and own the release decisions.</p>
          </div>
          <div className="hero-links">
            <a className="text-link" href="#work">Explore my work <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a className="text-link secondary-link" href="./Kingsley-Okoli-Public-Resume.pdf">View résumé <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="page-section reading-column" id="work" tabIndex={-1} aria-labelledby="work-title">
          <SectionHeading id="work-title">Selected work</SectionHeading>
          <div className="work-list">
            {caseStudies.map((study) => (
              <details className="work-item" id={study.id} key={study.id}>
                <summary>
                  <div className="work-summary">
                    <p className="work-category">{study.category}</p>
                    <h3>{study.title}</h3>
                    <p className="work-description">{study.summary}</p>
                    <span className="read-label"><span className="when-closed">Read the details</span><span className="when-open">Close details</span><ChevronDown size={14} aria-hidden="true" /></span>
                  </div>
                </summary>
                <div className="work-detail">{study.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="page-section reading-column" id="approach" tabIndex={-1} aria-labelledby="approach-title">
          <SectionHeading id="approach-title">How I work with AI</SectionHeading>
          <h3 className="section-statement">The engineering is in the harness.</h3>
          <div className="prose">
            <p>I turn my testing knowledge into workflows an agent can follow, build the tools it needs to interact with the application, and define the evidence required to accept a result.</p>
            <p>That infrastructure lets me direct more of the work through AI. Test strategy, investigation, and release decisions remain my responsibility.</p>
          </div>
        </section>

        <section className="page-section reading-column" id="hallpass" tabIndex={-1} aria-labelledby="project-title">
          <SectionHeading id="project-title">Independent project</SectionHeading>
          {projects.map((project) => (
            <article className="project" aria-labelledby="hallpass-title" key={project.id}>
              <div className="project-heading">
                <div><h3 id="hallpass-title">{project.name}</h3><p className="project-subtitle">{project.description}</p></div>
                <span className="project-platforms">Web &amp; Android</span>
              </div>
              <div className="prose">{project.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <div className="project-footer"><span>{project.stack}</span><a className="text-link" href={project.href} target="_blank" rel="noreferrer">Visit HallPass <ArrowUpRight size={15} aria-hidden="true" /></a></div>
            </article>
          ))}
        </section>

        <section className="page-section reading-column" id="about" tabIndex={-1} aria-labelledby="about-title">
          <SectionHeading id="about-title">About</SectionHeading>
          <div className="about-introduction">
            <div className="prose"><p>I started in software testing in 2021. My work grew from test planning and defect investigation into designing the infrastructure behind the entire quality process.</p><p>Today, I work across browser automation, APIs, CI, databases, and AI testing systems. I also build and operate HallPass independently.</p></div>
            <dl className="about-facts"><div><dt>Based in</dt><dd>New York City</dd></div><div><dt>Education</dt><dd>B.S. Computer Science<br /><span>Fairleigh Dickinson University, 2020</span></dd></div></dl>
          </div>
          <div className="experience-list">
            {experience.map((job) => <article className="experience-item" key={job.company + job.role}>
              <div className="experience-heading"><h3>{job.company}</h3><p>{job.dates}</p></div>
              <p className="job-role">{job.role}</p><p className="job-description">{job.description}</p>
            </article>)}
          </div>
        </section>

        <section className="page-section contact reading-column" id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <SectionHeading id="contact-title">Get in touch</SectionHeading>
          <h3 className="section-statement">Let's talk about what you're building.</h3>
          <p className="contact-copy">For roles and conversations about test infrastructure, quality engineering, and AI-assisted development.</p>
          <div className="contact-links"><a className="contact-button" href={`mailto:${profile.email}`}>Email me <ArrowUpRight size={16} aria-hidden="true" /></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </section>
      </main>
      <footer className="site-footer reading-column"><span>Kingsley Okoli</span><div><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href="./Kingsley-Okoli-Public-Resume.pdf">Résumé</a><a href={`mailto:${profile.email}`}>Email</a></div></footer>
    </>
  );
}
