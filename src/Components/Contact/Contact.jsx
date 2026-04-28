import './Contact.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SOCIAL = [
  { label: 'GitHub',   href: 'https://github.com/subratbhattarai' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/subrat-bhattarai/' },
];

// ── Simple EmailJS integration ────────────────────────────────────────
// npm install @emailjs/browser
// Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY with your EmailJS credentials
// Or swap sendEmail() for any other email API you prefer
async function sendEmail({ name, email, message }) {
  // const emailjs = await import('@emailjs/browser');
  // return emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { name, email, message }, 'PUBLIC_KEY');
  // ↑ Uncomment once you have EmailJS set up.
  // For now, simulates a 1.5s send:
  return new Promise((res) => setTimeout(res, 1500));
}

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      await sendEmail(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="co-root">
      <div className="co-inner">
        {/* header */}
        <motion.div
          className="co-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="co-eyebrow">
            <span className="co-eyebrow-line" />
            Get in touch
          </p>
          <h2 className="co-title">
            Say <em>Hello</em>
          </h2>
          <p className="co-subtitle">
            Open to new opportunities, collaborations, or just a conversation.
            Fill in the form or reach me directly at{' '}
            <a href="mailto:subratbhattarai7@gmail.com" className="co-email-link">
              subratbhattarai7@gmail.com
            </a>
          </p>
        </motion.div>

        <div className="co-body">
          {/* ── Contact form ── */}
          <motion.form
            className="co-form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            noValidate
          >
            <div className="co-form-row">
              <div className="co-field">
                <label className="co-label" htmlFor="co-name">Name</label>
                <input
                  id="co-name"
                  className="co-input"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handle}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="co-field">
                <label className="co-label" htmlFor="co-email">Email</label>
                <input
                  id="co-email"
                  className="co-input"
                  name="email"
                  type="email"
                  placeholder="...@mail.com"
                  value={form.email}
                  onChange={handle}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="co-field">
              <label className="co-label" htmlFor="co-message">Message</label>
              <textarea
                id="co-message"
                className="co-input co-textarea"
                name="message"
                placeholder="Tell me about your project or just say hi..."
                value={form.message}
                onChange={handle}
                required
                rows={6}
              />
            </div>

            <div className="co-form-footer">
              <button
                type="submit"
                className="co-submit"
                disabled={status === 'sending' || status === 'sent'}
              >
                {status === 'sending' ? (
                  <>Sending<span className="co-dots" aria-hidden="true" /></>
                ) : status === 'sent' ? (
                  <>Message sent ✓</>
                ) : (
                  <>Send message <span aria-hidden="true">→</span></>
                )}
              </button>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    className="co-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Something went wrong — try emailing directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* ── Side info ── */}
          <motion.div
            className="co-side"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="co-info-block">
              <p className="co-info-label">Location</p>
              <p className="co-info-value">Dubuque, Iowa</p>
            </div>
            <div className="co-info-block">
              <p className="co-info-label">Availability</p>
              <p className="co-info-value">
                <span className="co-available-dot" aria-hidden="true" />
                Open to work
              </p>
            </div>
            <div className="co-info-block">
              <p className="co-info-label">Socials</p>
              <ul className="co-socials">
                {SOCIAL.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="co-social-link"
                    >
                      {label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* footer strip */}
        <motion.div
          className="co-footer-strip"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="co-footer-copy">
            © {new Date().getFullYear()} Subrat Bhattarai
          </p>
          <p className="co-footer-made">
            Designed &amp; built by Subrat Bhattarai
          </p>
        </motion.div>
      </div>
    </section>
  );
}
