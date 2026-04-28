import './Navbar.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Content from '../Content/Content.jsx';
import Projects from '../Projects/Projects.jsx';
import Experiences from '../Experiences/Experiences.jsx';
import Contact from '../Contact/Contact.jsx';

// ─── Nav items config ────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'intro',       index: '01', label: 'Introduction', Component: Content },
  { id: 'projects',    index: '02', label: 'Projects',     Component: Projects },
  { id: 'experiences', index: '03', label: 'Experiences',  Component: Experiences },
  { id: 'contact',     index: '04', label: 'Contact',      Component: Contact },
];

// ─── Splash screen ───────────────────────────────────────────────────
function Splash({ onDone }) {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.0, ease: 'easeInOut' }}
      onAnimationComplete={onDone}
    >
      <motion.span
        className="splash-text"
        initial={{ opacity: 0, letterSpacing: '0.6em' }}
        animate={{
          opacity:       [0, 1, 1, 0],
          letterSpacing: ['0.6em', '0.3em', '0.3em', '0.08em'],
        }}
        transition={{ duration: 2.2, times: [0, 0.25, 0.75, 1], ease: 'easeInOut' }}
      >
        SB
      </motion.span>
    </motion.div>
  );
}

// ─── Custom cursor ───────────────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };

    const onEnter = () => document.body.classList.add('sb-hovering');
    const onLeave = () => document.body.classList.remove('sb-hovering');

    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // LERP loop: ring chases mouse at 12% per frame
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    attachHover();
    rafRef.current = requestAnimationFrame(animate);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="c-dot"  aria-hidden="true" />
      <div ref={ringRef} className="c-ring" aria-hidden="true" />
    </>
  );
}

// ─── Scroll progress bar ─────────────────────────────────────────────
function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="sb-progress" style={{ width: width + '%' }} />;
}

// ─── Main Navbar ──────────────────────────────────────────────────────
export default function Navbar() {
  const [ready,    setReady]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('intro');
  const [menuOpen, setMenuOpen] = useState(false);

  const refs = useRef(
    Object.fromEntries(NAV_ITEMS.map(({ id }) => [id, React.createRef()]))
  );

  // Shrink nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    if (!ready) return;
    const observers = NAV_ITEMS.map(({ id }) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      const el = refs.current[id]?.current;
      if (el) obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ready]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = useCallback((id) => {
    refs.current[id]?.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />

      <AnimatePresence>
        {!ready && <Splash onDone={() => setReady(true)} />}
      </AnimatePresence>

      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* ── Sticky nav bar ── */}
          <motion.nav
            className={`sb-nav${scrolled ? ' sb-nav--scrolled' : ''}`}
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Main navigation"
          >
            <a className="sb-logo" href="#intro" aria-label="Go to top">
              <div className="sb-logo-mark">SB</div>
              <div className="sb-logo-text">
                Subrat<br />Bhattarai
              </div>
            </a>

            <ul className="sb-nav-links" role="list">
              {NAV_ITEMS.map(({ id, index, label }) => (
                <li key={id}>
                  <motion.button
                    className={`sb-nav-btn${active === id ? ' sb-nav-btn--active' : ''}`}
                    data-index={index}
                    onClick={() => scrollTo(id)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    aria-current={active === id ? 'true' : undefined}
                  >
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>

            <button
              className={`sb-hamburger${menuOpen ? ' sb-hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </motion.nav>

          {/* ── Mobile fullscreen overlay ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="sb-mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                {NAV_ITEMS.map(({ id, label }, i) => (
                  <motion.button
                    key={id}
                    className={`sb-mobile-item${active === id ? ' sb-mobile-item--active' : ''}`}
                    onClick={() => scrollTo(id)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Page sections ── */}
          <main className="sb-main">
            {NAV_ITEMS.map(({ id, Component }) => (
              <section
                key={id}
                id={id}
                ref={refs.current[id]}
                className="sb-section"
              >
                <Component />
              </section>
            ))}
          </main>
        </motion.div>
      )}
    </>
  );
}
