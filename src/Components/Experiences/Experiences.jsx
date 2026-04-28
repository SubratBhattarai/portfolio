import './Experiences.css';
import { motion } from 'framer-motion';

// ── Replace with your real experience ────────────────────────────────
const EXPERIENCES = [
  {
    index:    '001',
    role:     'Information Technology Worker',
    company:  'Loras College',
    period:   '2025 Aug -- Present',
    location: 'Dubuque, IA',
    desc: [
  "Resolved 40+ IT service requests weekly by troubleshooting hardware, software, and network issues. ",
  "Managed 200+ monthly support tickets with a 95% same-day resolution rate. ",
  "Maintained classroom technology across 12+ rooms ensuring zero lecture interruptions"],
    skills:   ['Communication', 'Hardware/Software', 'Ticketing System', 'Report Analysis'],
  },
  {
    index:    '002',
    role:     'Machine Learning Researcher',
    company:  'Loras College',
    period:   '2024 Jan -- 2024 Aug',
    location: 'Dubuque, IA',
    desc: [
  "Designed and implemented multiple deep learning architectures from scratch, including an automated telescope control system, LSTM models for sequence prediction, and GANs for synthetic image generation",
  "Optimized tensor formats in custom data pipelines using NumPy and PyTorch to transform raw text and image data into matrices, eliminating reliance on pre-built preprocessing libraries",
  "Integrated OpenCV for real-time model visualization, capturing live user feedback to drive iterative performance improvements"],
skills:   ['Python', 'PyTorch', 'Calculus', 'Raspberry PI'],
  },
  {
    index:    '003',
    role:     'Robotics Instructor',
    company:  'Loras College',
    period:   '2024 Dec -- 2025 May',
    location: 'Dubuque, IA',
    desc: [
  "Delivered clear and engaging instructional sessions in robotics and programming to undergraduate students, strengthening both practical and theoretical understanding",
  "Provided one-on-one mentoring for student projects, technical reports, and research work, helping 90% of students overcome challenges and improve academic performance by 40%",
  "Maintained computers, classroom equipment, and 3D printers across campus to ensure smooth operation"],
  skills:   ['HTML/CSS', 'JavaScript', 'Python', 'CAD'],
  },
    {
    index:    '004',
    role:     'Student Administrative Assistant',
    company:  'Loras College',
    period:   '2024 Dec -- 2026 May',
    location: 'Dubuque, IA',
    desc: [
  "Engaged directly with prospective students to provide personalized support and guidance throughout the admissions process",
  "Responded to inquiries and delivered detailed information about academic programs, campus facilities, and student resources",
  "Assisted with appointment scheduling and coordinated connections with relevant campus departments and staff"
],
  skills:   ['Microsoft 365 Office', 'SQL', 'Slate'],
  },
      {
    index:    '005',
    role:     'Student Library Worker',
    company:  'Loras College',
    period:   '2025 May -- Present',
    location: 'Dubuque, IA',
  desc: [
  "Managed library operations including book check-ins/outs, circulation tracking, and re-shelving",
  "Coordinated interlibrary loan requests with partner colleges to ensure timely access to resources"
],
  skills:   ['Microsoft 365 Office', 'Communication', 'Report Analysis', 'Inventory Management'],
  },
];

const EDUCATION = [
  {
    degree: 'B.Sc. Computer Science, Mathematics, and Data Science',
    school: 'Loras College',
    period: '2024 — Present',
    note:   '3.85/4.0',
  },
];

const PROFICIENCY = [
  { name: 'Python',        pct: 94 },
  { name: 'PyTorch',        pct: 93 },
  { name: 'Git',        pct: 88 },
  { name: 'React / JavaScript',   pct: 88 },
  { name: 'SQL',        pct: 75 },
];

export default function Experiences() {
  return (
    <section className="ex-root">
      <div className="ex-inner">

        {/* ── Header ── */}
        <motion.div
          className="ex-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="ex-eyebrow">
            <span className="ex-eyebrow-line" />
            Background
          </p>
          <h2 className="ex-title">
            Work <em>Experience</em>
          </h2>
        </motion.div>

        {/* ── Experience list ── */}
        <ul className="ex-list">
          {EXPERIENCES.map((e, i) => (
            <motion.li
              key={e.index}
              className="ex-item"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ex-item-left">
                <span className="ex-item-index">{e.index}</span>
                <div className="ex-item-body">
                  <h3 className="ex-item-role">{e.role}</h3>
                  <p className="ex-item-company">{e.company}</p>
                  <p className="ex-item-desc">{e.desc}</p>
                  <ul className="ex-skills">
                    {e.skills.map((s) => (
                      <li key={s} className="ex-skill-tag">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ex-item-right">
                <span className="ex-item-period">{e.period}</span>
                <span className="ex-item-location">{e.location}</span>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* ── Side panels: education + proficiency ── */}
        <div className="ex-side">

          {/* Education */}
          <motion.div
            className="ex-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ex-panel-label">Education</p>
            {EDUCATION.map((ed, i) => (
              <div key={i} className="ex-edu">
                <h4 className="ex-edu-degree">{ed.degree}</h4>
                <p className="ex-edu-school">{ed.school}</p>
                <p className="ex-edu-period">{ed.period}</p>
                {ed.note && <p className="ex-edu-note">{ed.note}</p>}
              </div>
            ))}
          </motion.div>

          {/* Proficiency */}
          <motion.div
            className="ex-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ex-panel-label">Proficiency</p>
            {PROFICIENCY.map(({ name, pct }, i) => (
              <div key={name} className="ex-bar-row">
                <div className="ex-bar-labels">
                  <span className="ex-bar-name">{name}</span>
                  <span className="ex-bar-pct">{pct}%</span>
                </div>
                <div className="ex-bar-track">
                  <motion.div
                    className="ex-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
