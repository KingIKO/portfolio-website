import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  CirclePause,
  CirclePlay,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';
import ReliabilityCore from './components/ReliabilityCore';
import useMotionEffects from './hooks/useMotionEffects';
import { caseStudies, methodology, metrics, principles, projects } from './content';
import './styles.css';

const navItems = [
  ['Thesis', '#thesis'],
  ['Work', '#work'],
  ['Method', '#method'],
  ['Lab', '#lab'],
  ['About', '#about'],
];

const heroModes = [
  {
    id: 'autonomy',
    label: 'Autonomy',
    detail: 'Long-running agents keep state, survive context limits, and account for every flow.',
  },
  {
    id: 'trust',
    label: 'Trust',
    detail: 'Deterministic gates require observed evidence before a result can pass.',
  },
  {
    id: 'signal',
    label: 'Signal',
    detail: 'Production telemetry and live reproduction separate real defects from noise.',
  },
];

function SectionLabel({ index, children }) {
  return (
    <div className="section-label" aria-hidden="true">
      <span>{index}</span>
      <span className="section-label__line" />
      <span>{children}</span>
    </div>
  );
}

function SignalDiagram({ study }) {
  return (
    <div className={`signal-diagram signal-diagram--${study.id}`} aria-hidden="true">
      <div className="signal-diagram__grid" />
      <div className="signal-diagram__beam" />
      <div className="signal-diagram__core"><ShieldCheck size={25} /></div>
      {study.telemetry.map((item, index) => (
        <span className={`signal-chip signal-chip--${index + 1}`} key={item}>{item}</span>
      ))}
      <span className="signal-diagram__caption">VERIFIED OUTPUT</span>
    </div>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className={`project-visual project-visual--${project.id}`} aria-hidden="true">
      <div className="project-visual__scan" />
      <div className="project-visual__window">
        <div className="project-visual__bar"><span /><span /><span /></div>
        <div className="project-visual__body">
          <span className="project-visual__line project-visual__line--wide" />
          <span className="project-visual__line" />
          <span className="project-visual__line project-visual__line--short" />
          <div className="project-visual__graph"><i /><i /><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroMode, setHeroMode] = useState(heroModes[1]);
  const menuButtonRef = useRef(null);
  useMotionEffects(motionEnabled);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (media?.matches) setMotionEnabled(false);
  }, []);

  useEffect(() => {
    let disposed = false;
    const followUps = [];

    const clearFollowUps = () => {
      followUps.splice(0).forEach((timer) => window.clearTimeout(timer));
    };

    const findHashTarget = () => {
      if (!window.location.hash) return null;
      try {
        return document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      } catch {
        return null;
      }
    };

    const performScroll = () => {
      if (disposed) return;
      const target = findHashTarget();
      if (!target) return;
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      const offset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, window.scrollY + target.getBoundingClientRect().top - offset);
      root.style.scrollBehavior = previousBehavior;
    };
    const scrollToHash = () => {
      if (disposed) return;
      performScroll();
      clearFollowUps();
      for (const delay of [120, 600, 1_200]) {
        followUps.push(window.setTimeout(performScroll, delay));
      }
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    document.fonts?.ready.then(() => {
      if (!disposed) scrollToHash();
    });
    window.addEventListener('hashchange', scrollToHash);
    window.addEventListener('load', scrollToHash, { once: true });
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      clearFollowUps();
      window.removeEventListener('hashchange', scrollToHash);
      window.removeEventListener('load', scrollToHash);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia?.('(min-width: 1121px)');
    const closeAtDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop?.addEventListener?.('change', closeAtDesktop);
    return () => desktop?.removeEventListener?.('change', closeAtDesktop);
  }, []);

  return (
    <div className={motionEnabled ? 'site motion-on' : 'site motion-off'}>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Kingsley Okoli, home">
          <span className="brand__mark">KO</span>
          <span className="brand__name">Kingsley Okoli</span>
        </a>

        <nav id="primary-navigation" className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>

        <div className="topbar__actions">
          <button
            className="icon-button"
            type="button"
            aria-label={motionEnabled ? 'Pause motion' : 'Resume motion'}
            onClick={() => setMotionEnabled((value) => !value)}
          >
            {motionEnabled ? <CirclePause size={19} /> : <CirclePlay size={19} />}
          </button>
          <a className="topbar__contact" href="#contact">Contact <ArrowDownRight size={16} /></a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <ReliabilityCore active={motionEnabled} />
          <div className="hero__noise" aria-hidden="true" />
          <div className="hero__rail hero__rail--left" aria-hidden="true">
            <span>AI RELIABILITY SYSTEM / 2026</span>
            <span>NEW YORK / REMOTE</span>
          </div>
          <div className="hero__rail hero__rail--right" aria-hidden="true">
            <span>STATUS</span><i /> <span>OPERATIONAL</span>
          </div>

          <div className="hero__content">
            <p className="hero__eyebrow"><span /> Reliability is engineered</p>
            <h1 id="hero-title">AI Reliability Engineer</h1>
            <p className="hero__role">Quality Systems Architect</p>
            <div className="hero__bottom">
              <p className="hero__statement">I build autonomous systems that earn trust.</p>
              <p className="hero__description">
                Evidence contracts, deterministic guardrails, observability, and durable knowledge systems for AI agents that need to do real engineering work.
              </p>
              <div className="hero-modes" aria-label="Reliability system focus">
                <div className="hero-modes__tabs">
                  {heroModes.map((mode) => (
                    <button
                      className={heroMode.id === mode.id ? 'hero-mode hero-mode--active' : 'hero-mode'}
                      type="button"
                      aria-pressed={heroMode.id === mode.id}
                      onClick={() => setHeroMode(mode)}
                      key={mode.id}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
                <p aria-live="polite">{heroMode.detail}</p>
              </div>
              <div className="hero__cta-group">
                <a className="button button--primary" href="#work">Explore the systems <ArrowDownRight size={18} /></a>
                <a className="button button--ghost" href="./Kingsley-Okoli-Public-Resume.pdf">Public résumé</a>
              </div>
            </div>
          </div>

          <div className="hero__scroll" aria-hidden="true"><span>SCROLL TO INSPECT</span><i /></div>
        </section>

        <section className="thesis section" id="thesis" aria-labelledby="thesis-title">
          <SectionLabel index="01">The thesis</SectionLabel>
          <div className="thesis__layout">
            <h2 id="thesis-title" data-reveal>
              Capability is cheap.<br />
              <span>Trust is the hard part.</span>
            </h2>
            <div className="thesis__copy" data-reveal>
              <p>AI agents are excellent at producing plausible work. Plausible is not the same as correct, complete, or safe.</p>
              <p>I treat an agent like any powerful but failure-prone production system: define what counts as evidence, constrain its failure modes, watch for drift, and verify the output against reality.</p>
            </div>
          </div>

          <div className="metric-array" data-reveal>
            {metrics.map((metric, index) => (
              <article className="metric" key={metric.label}>
                <div className="metric__header"><span>0{index + 1}</span><i /></div>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work section" id="work" aria-labelledby="work-title">
          <SectionLabel index="02">Selected systems</SectionLabel>
          <div className="section-intro">
            <h2 id="work-title" data-reveal>Three investigations.<br /><span>One reliability discipline.</span></h2>
            <p data-reveal>Each case starts with ambiguous signal and ends with a system that makes the next verdict cheaper, faster, and harder to fake.</p>
          </div>

          <div className="case-list">
            {caseStudies.map((study, index) => (
              <article
                className="case-study"
                key={study.id}
                aria-label={`Case study ${index + 1}: ${study.title}`}
                data-reveal
              >
                <div className="case-study__meta">
                  <span>{study.index}</span>
                  <span>{study.eyebrow}</span>
                </div>
                <div className="case-study__content">
                  <div className="case-study__context">
                    <span>{study.timeframe}</span>
                    <span>{study.context}</span>
                  </div>
                  <h3>{study.title}</h3>
                  <p className="case-study__summary">{study.summary}</p>
                  <div className="case-study__columns">
                    <div><span className="micro-label">SIGNAL</span><p>{study.signal}</p></div>
                    <div><span className="micro-label">SYSTEM</span><ul>{study.system.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  </div>
                  <div className="case-study__outcome"><span>OUTCOME</span><strong>{study.outcome}</strong></div>
                  <a className="case-study__artifact" href={study.artifact.href}>
                    <FileText size={17} /> {study.artifact.label} <ArrowUpRight size={16} />
                  </a>
                </div>
                <SignalDiagram study={study} />
              </article>
            ))}
          </div>
        </section>

        <section className="method section" id="method" aria-labelledby="method-title">
          <SectionLabel index="03">Reliability architecture</SectionLabel>
          <div className="method__header">
            <h2 id="method-title" data-reveal>Trust is not a prompt.<br /><span>It is an architecture.</span></h2>
            <p data-reveal>Six patterns turn agent behavior into something observable, reviewable, and repeatable.</p>
          </div>
          <div className="method-grid">
            {methodology.map((item) => (
              <article className="method-card" key={item.id} data-reveal>
                <span className="method-card__number">{item.number}</span>
                <div className="method-card__pulse"><i /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lab section" id="lab" aria-label="Systems lab">
          <SectionLabel index="04">Systems lab</SectionLabel>
          <div className="section-intro section-intro--lab">
            <h2 id="lab-title" data-reveal>Products, tools,<br /><span>and strange useful systems.</span></h2>
            <p data-reveal>The same reliability habits applied outside the day job: explicit constraints, real data, adversarial tests, and proof before claims.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card project-card--${project.id} ${project.featured ? 'project-card--featured' : 'project-card--standard'}`}
                key={project.id}
                data-reveal
              >
                <ProjectVisual project={project} />
                <div className="project-card__top"><span>{project.kind}</span><span>{project.status} / 0{index + 1}</span></div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="project-card__proof"><span>PROOF</span>{project.proof}</div>
                <div className="project-card__footer">
                  <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                  <a
                    className="project-card__action"
                    href={project.action.href}
                    target={project.action.external ? '_blank' : undefined}
                    rel={project.action.external ? 'noreferrer' : undefined}
                    aria-label={project.action.label}
                  >
                    <span>{project.action.label}</span><ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="principles section" aria-labelledby="principles-title">
          <SectionLabel index="05">Operating principles</SectionLabel>
          <h2 id="principles-title" className="visually-hidden">Engineering principles</h2>
          <div className="principles__track" data-drift>
            {principles.map((principle, index) => (
              <div className="principle" key={principle}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{principle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about section" id="about" aria-labelledby="about-title">
          <SectionLabel index="06">About</SectionLabel>
          <div className="about__layout">
            <div className="about__portrait" data-reveal>
              <div className="portrait-frame">
                <img src="./headshot.jpg" alt="Kingsley Okoli" />
                <span className="portrait-frame__corner portrait-frame__corner--tl" />
                <span className="portrait-frame__corner portrait-frame__corner--br" />
                <div className="portrait-frame__meta"><span>SUBJECT / KO</span><span>NEW YORK</span></div>
              </div>
            </div>
            <div className="about__content" data-reveal>
              <p className="about__kicker">I started in QA. I kept moving down the stack until the whole quality system became my job.</p>
              <h2 id="about-title">I build the machinery behind a trustworthy verdict.</h2>
              <div className="about__body">
                <p>My work spans browser automation, API contracts, CI topology, production observability, databases, and the knowledge layer that lets AI agents operate across all of it.</p>
                <p>The through-line is simple: never confuse a polished answer with finished work. Every claim needs a receipt. Every quiet pipeline needs a sentinel. Every hard-won discovery should make the next run smarter.</p>
              </div>
              <div className="about__links">
                <a href="https://github.com/KingIKO" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
                <a href="https://linkedin.com/in/kingsley-okoli" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact" aria-label="Contact">
          <div className="contact__aura" aria-hidden="true" />
          <p className="contact__eyebrow"><span /> CONNECTION CHANNEL OPEN</p>
          <h2 id="contact-title">Building an agent that<br />needs to earn trust?</h2>
          <p>Let’s talk about reliability architecture, quality systems, or the difficult space between “the agent ran” and “the work is defensible.”</p>
          <a className="contact__button" href="mailto:kingsleyiokoli@gmail.com?subject=AI%20Reliability%20Conversation">
            <span>Start a conversation</span><Mail size={22} />
          </a>
          <div className="contact__footer">
            <span>© 2026 Kingsley Okoli</span>
            <span>Designed around evidence, not theater.</span>
            <a href="#top">Back to signal <ArrowUpRight size={14} /></a>
          </div>
        </section>
      </main>
    </div>
  );
}
