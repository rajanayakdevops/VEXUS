import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './PortfolioPreview.module.css';

const projects = [
  {
    title: 'Meridian Finance',
    category: 'Fintech Dashboard',
    tags: ['React', 'TypeScript', 'D3.js'],
    image: '/images/project-1.jpg',
    accent: 'primary',
  },
  {
    title: 'Nova Healthcare',
    category: 'Health Platform',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    image: '/images/project-2.jpg',
    accent: 'accent',
  },
  {
    title: 'Apex Commerce',
    category: 'E-Commerce Platform',
    tags: ['React', 'Node.js', 'Stripe'],
    image: '/images/project-3.jpg',
    accent: 'purple',
  },
  {
    title: 'Orbit Analytics',
    category: 'SaaS Dashboard',
    tags: ['Next.js', 'Recharts', 'PostgreSQL'],
    image: '/images/project-4.jpg',
    accent: 'orange',
  },
];

export default function PortfolioPreview() {
  return (
    <section className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>Selected Work</span>
            <h2 className={styles.title}>Recent projects</h2>
          </div>
          <Link to="/portfolio" className={styles.viewAll}>
            View All
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className={styles.card}
            >
              <div className={`${styles.accentBar} ${styles[project.accent]}`}></div>
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.category}>{project.category}</p>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link to="/portfolio" className={styles.cardLink} aria-label={`View ${project.title} case study`}>
                <span className={styles.srOnly}>View case study</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
