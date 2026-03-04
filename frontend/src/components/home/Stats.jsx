import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Stats.module.css';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', color: 'primary' },
  { value: 40, suffix: '+', label: 'Startups Scaled', color: 'accent' },
  { value: 5, suffix: '+', label: 'Years Experience', color: 'purple' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', color: 'orange' },
];

function AnimatedCounter({ value, suffix, inView, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className={`${styles.counter} ${styles[color]}`}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.stats}>
      <div ref={ref} className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={styles.statItem}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={inView}
                color={stat.color}
              />
              <p className={styles.label}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
