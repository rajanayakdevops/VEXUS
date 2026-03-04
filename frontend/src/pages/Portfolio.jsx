import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import styles from './Portfolio.module.css';

const categories = ['All', 'Fintech', 'Healthcare', 'SaaS', 'E-Commerce'];

const projects = [
  {
    slug: 'meridian-finance',
    title: 'Meridian Finance',
    category: 'Fintech',
    summary: 'A comprehensive fintech dashboard redesign that increased user engagement by 60% and reduced task completion time by 40%.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    image: '/images/project-1.jpg',
  },
  {
    slug: 'nova-healthcare',
    title: 'Nova Healthcare',
    category: 'Healthcare',
    summary: 'End-to-end patient portal with real-time health monitoring, appointment scheduling, and telehealth integration.',
    tags: ['Next.js', 'Tailwind', 'Supabase', 'WebRTC'],
    image: '/images/project-2.jpg',
  },
  {
    slug: 'apex-commerce',
    title: 'Apex Commerce',
    category: 'E-Commerce',
    summary: 'A luxury e-commerce platform with 3D product previews, AI-powered recommendations, and seamless checkout.',
    tags: ['React', 'Node.js', 'Stripe', 'Three.js'],
    image: '/images/project-3.jpg',
  },
  {
    slug: 'orbit-analytics',
    title: 'Orbit Analytics',
    category: 'SaaS',
    summary: 'Real-time analytics dashboard processing millions of events per day with sub-second query performance.',
    tags: ['Next.js', 'Recharts', 'PostgreSQL', 'Redis'],
    image: '/images/project-4.jpg',
  },
  {
    slug: 'pinnacle-realty',
    title: 'Pinnacle Realty',
    category: 'E-Commerce',
    summary: 'A luxury real estate platform with immersive property tours, advanced filtering, and agent management tools.',
    tags: ['React', 'Mapbox', 'Node.js', 'MongoDB'],
    image: '/images/project-5.jpg',
  },
  {
    slug: 'synapse-ai',
    title: 'Synapse AI',
    category: 'SaaS',
    summary: 'An AI-powered productivity suite with natural language processing, automated workflows, and smart scheduling.',
    tags: ['Next.js', 'OpenAI', 'Python', 'PostgreSQL'],
    image: '/images/project-6.jpg',
  },
];

function Portfolio() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroGlow}></div>
          <div className={styles.heroContainer}>
            <span className={styles.heroBadge}>Portfolio</span>
            <h1 className={styles.heroTitle}>Our finest work</h1>
            <p className={styles.heroDescription}>
              A curated selection of projects that showcase our engineering excellence and design obsession.
            </p>
          </div>
        </section>

        <section className={styles.filters}>
          <div className={styles.filtersContainer}>
            <div className={styles.filterButtons}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.projects}>
          <div className={styles.projectsContainer}>
            <motion.div layout className={styles.grid}>
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Link to={`/portfolio/${project.slug}`} className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <img src={project.image} alt={project.title} className={styles.image} />
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                          <p className={styles.category}>{project.category}</p>
                          <ArrowUpRight size={16} className={styles.arrowIcon} />
                        </div>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.summary}>{project.summary}</p>
                        <div className={styles.tags}>
                          {project.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Portfolio;
