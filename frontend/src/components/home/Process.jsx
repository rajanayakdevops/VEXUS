import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Users, PenTool, Code, Rocket } from 'lucide-react';
import styles from './Process.module.css';

const steps = [
  {
    icon: Send,
    step: '01',
    title: 'Submit Project',
    description: 'Share your vision, requirements, and timeline. We review every inquiry personally.',
    color: 'primary',
  },
  {
    icon: Users,
    step: '02',
    title: 'Strategy Meeting',
    description: 'A deep dive into your product goals, tech stack, and UX expectations.',
    color: 'accent',
  },
  {
    icon: PenTool,
    step: '03',
    title: 'UI Architecture',
    description: 'Component design, system planning, and interactive prototyping for alignment.',
    color: 'purple',
  },
  {
    icon: Code,
    step: '04',
    title: 'Development',
    description: 'Production-grade code with weekly demos, constant communication, and iteration.',
    color: 'orange',
  },
  {
    icon: Rocket,
    step: '05',
    title: 'Testing & Launch',
    description: 'Cross-browser QA, performance optimization, and a smooth deployment.',
    color: 'red',
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.4'],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className={styles.process}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Our Process</span>
          <h2 className={styles.title}>From concept to launch</h2>
        </div>

        <div className={styles.progressLine}>
          <div className={styles.progressBg}></div>
          <motion.div className={styles.progressBar} style={{ width: lineWidth }}></motion.div>
        </div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={styles.stepItem}
            >
              <div className={`${styles.iconWrapper} ${styles[step.color]}`}>
                <step.icon size={22} />
              </div>
              <p className={styles.stepNumber}>{step.step}</p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
