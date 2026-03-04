import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>

      <div className={styles.container}>
        <h2 className={styles.title}>
          Let's Build Something
          <br />
          <span className={styles.gradient}>Extraordinary.</span>
        </h2>
        <p className={styles.description}>
          Ready to elevate your product? We're selective about the projects we take on to ensure every client gets our full attention.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={styles.buttonWrapper}
        >
          <Link to="/start-project" className={styles.button}>
            Start a Project
            <ArrowRight size={16} className={styles.arrow} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
