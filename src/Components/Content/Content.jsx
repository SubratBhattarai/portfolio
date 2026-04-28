import './Content.css';
import { motion } from 'framer-motion';

const FADE_UP = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Content() {
  return (
    <section className="ct-root">
      {/* decorative corner marks */}
      <span className="ct-corner ct-corner--tr" aria-hidden="true" />
      <span className="ct-corner ct-corner--bl" aria-hidden="true" />

      <div className="ct-inner">
        {/* eyebrow */}
        <motion.p className="ct-eyebrow" {...FADE_UP(0)}>
          <span className="ct-eyebrow-line" />
          Machine learning Engineer/ Student
        </motion.p>

        {/* name */}
        <motion.h1 className="ct-name" {...FADE_UP(0.1)}>
          Subrat<br /><em>Bhattarai</em>
        </motion.h1>

        {/* tagline */}
        <motion.p className="ct-tagline" {...FADE_UP(0.2)}>
          A student of mathematics and computer science at Loras College, I have a strong interest in artificial intelligence and machine learning. 
          I've developed systems for object detection and facial recognition, 
          and I'm now delving deeply into GANs and LSTMs for generative projects. 
          In order to put my skills to use solving actual AI problems, 
          I'm searching for internship opportunities.
        </motion.p>

        {/* CTAs */}
        <motion.div className="ct-actions" {...FADE_UP(0.3)}>
          <a className="ct-btn ct-btn--primary" href="#projects">
            View my work <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* stats row */}
        <motion.div className="ct-stats" {...FADE_UP(0.4)}>
          {[
            { value: '5+',  label: 'Years experience' },
            { value: '20+', label: 'Projects'  },
            { value: '5+', label: 'Happy Clients'     },
          ].map(({ value, label }) => (
            <div className="ct-stat" key={label}>
              <span className="ct-stat-value">{value}</span>
              <span className="ct-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="ct-scroll-cue" aria-hidden="true">
        <span>scroll</span>
        <div className="ct-scroll-line" />
      </div>
    </section>
  );
}
