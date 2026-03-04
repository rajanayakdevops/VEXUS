import { motion } from 'framer-motion';
import { Code2, Layers, Zap, BarChart3, LayoutDashboard } from 'lucide-react';
import styles from './ServicesPreview.module.css';

const services = [
  {
    icon: Code2,
    title: 'UI Engineering',
    description: 'Production-grade React & Next.js interfaces built for scale, speed, and pixel-perfect precision.',
    color: 'primary',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'Scalable component libraries and tokens that unify your product experience across teams.',
    color: 'accent',
  },
  {
    icon: Zap,
    title: 'React / Next.js Dev',
    description: 'Server components, streaming, and modern architecture for best-in-class web applications.',
    color: 'purple',
  },
  {
    icon: BarChart3,
    title: 'Performance',
    description: 'Core Web Vitals optimization, bundle analysis, and runtime performance tuning.',
    color: 'orange',
  },
  {
    icon: LayoutDashboard,
    title: 'Enterprise Dashboards',
    description: 'Complex data-rich interfaces designed for clarity, speed, and enterprise-grade reliability.',
    color: 'red',
  },
];

export default function ServicesPreview() {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>What We Do</span>
          <h2 className={styles.title}>Engineering that speaks for itself</h2>
          <p className={styles.description}>
            We specialize in the intersection of design and engineering, building
            interfaces that are as beautiful as they are performant.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`${styles.card} ${styles[service.color]}`}
            >
              <div className={styles.cardBg}></div>
              <div className={styles.cardContent}>
                <div className={`${styles.iconWrapper} ${styles[`icon${service.color}`]}`}>
                  <service.icon size={24} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
