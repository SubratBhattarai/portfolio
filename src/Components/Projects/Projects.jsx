import './Projects.css';
import { motion } from 'framer-motion';

// ── Replace with your real projects ──────────────────────────────────
const PROJECTS = [
{
  index: '001',
  title: 'Facial Recognition System',
  desc: [
    "Developed a real-time facial recognition system using PyTorch and OpenCV with Haar Cascade-based face detection",
    "Built a custom binary classification pipeline trained on personal datasets for identity recognition",
    "Achieved 90% accuracy on unseen test data with robust performance across varying lighting conditions"
  ],
  stack: ['Python', 'PyTorch', 'Scikit-learn', 'OpenCV'],
  github: 'https://github.com/SubratBhattarai/face-recognition',
  year: '2025',
},
{
  index: '002',
  title: 'Song Recommendation System',
  desc: [
    "Developed a content-based recommendation system using machine learning techniques",
    "Engineered a feature extraction pipeline to convert raw song data into structured embeddings",
    "Generated top-5 personalized recommendations using optimized similarity ranking",
    "Reduced Mean Squared Error by 15% using Scikit-learn and PyTorch models"
  ],
  stack: ['Python', 'PyTorch', 'Scikit-learn'],
  github: 'https://github.com/SubratBhattarai/AI-Song',
  year: '2025',
},
  {
    index: '003',
    title: 'Crime Analysis',
    desc: [''],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    github: 'https://github.com/SubratBhattarai/Crime-Analysis',
    year: '2025',
  },
    {
    index: '004',
    title: 'Roller-game',
    desc: [''],
    stack: ['C#', 'Unity', 'Blender'],
    github: 'https://github.com/SubratBhattarai/Roller-game',
    year: '2022',
  },
      {
    index: '005',
    title: 'Electric Barrier Pole Mechanics',
    desc: [''],
    stack: ['C', 'Arduino'],
    github: 'https://github.com/SubratBhattarai/ElectricBarrierPoleMechanics',
    year: '2024',
  }
];

export default function Projects() {
  return (
    <section className="pj-root">
      <div className="pj-inner">
        {/* section header */}
        <motion.div
          className="pj-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="pj-eyebrow">
            <span className="pj-eyebrow-line" />
            Selected work
          </p>
          <h2 className="pj-title">
            Recent <em>Projects</em>
          </h2>
        </motion.div>

        {/* project list */}
        <ul className="pj-list">
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.index}
              className="pj-item"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pj-item-left">
                <span className="pj-item-index">{p.index}</span>
                <div className="pj-item-body">
                  <h3 className="pj-item-title">{p.title}</h3>
                  <p className="pj-item-desc">{p.desc}</p>
                  <ul className="pj-stack">
                    {p.stack.map((s) => (
                      <li key={s} className="pj-stack-tag">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pj-item-right">
                <span className="pj-item-year">{p.year}</span>
                <div className="pj-item-links">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="pj-link"
                    aria-label={`Live demo of ${p.title}`}
                  >
                     <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="pj-link"
                    aria-label={`GitHub repo for ${p.title}`}
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
