import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Building2, Rocket, Layers, RefreshCw, Search, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import styles from './Services.module.css';

const services = [
  {
    icon: Code2,
    title: 'UI Development',
    description: 'We build pixel-perfect, production-grade user interfaces using React, Next.js, and modern CSS. Every component is hand-crafted for performance, accessibility, and visual precision.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: Building2,
    title: 'Enterprise Frontend Systems',
    description: 'Large-scale frontend architectures designed for enterprise reliability. We handle complex state management, micro-frontends, and cross-team scalability.',
    tags: ['Architecture', 'State Management', 'CI/CD', 'Testing', 'Monorepos'],
  },
  {
    icon: Rocket,
    title: 'Startup Website Development',
    description: 'Launch faster with a stunning, conversion-optimized web presence. We build marketing sites, landing pages, and product interfaces that help startups grow.',
    tags: ['Landing Pages', 'SEO', 'Analytics', 'A/B Testing', 'CMS'],
  },
  {
    icon: Layers,
    title: 'Component Libraries',
    description: 'Custom design systems and component libraries that scale across your entire product ecosystem. Documented, tested, and built for long-term maintainability.',
    tags: ['Design Systems', 'Storybook', 'Token Systems', 'Documentation', 'Figma Sync'],
  },
  {
    icon: RefreshCw,
    title: 'UI Refactoring & Optimization',
    description: 'Transform legacy frontends into modern, performant applications. We optimize bundle sizes, improve Core Web Vitals, and modernize tech stacks.',
    tags: ['Performance', 'Bundle Optimization', 'Code Splitting', 'Migration', 'Lighthouse'],
  },
  {
    icon: Search,
    title: 'UI Audits',
    description: 'Comprehensive audits of your existing frontend covering performance, accessibility, code quality, and UX consistency. Actionable reports with clear next steps.',
    tags: ['Accessibility', 'Performance', 'Code Review', 'UX Audit', 'WCAG'],
  },
];

function Services() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroGlow}></div>
          <div className={styles.heroContainer}>
            <span className={styles.heroBadge}>Our Services</span>
            <h1 className={styles.heroTitle}>What we do best</h1>
            <p className={styles.heroDescription}>
              We offer a focused suite of frontend engineering services, each delivered with the precision and care of a luxury product studio.
            </p>
          </div>
        </section>

        <section className={styles.servicesList}>
          <div className={styles.servicesContainer}>
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className={styles.serviceItem}
              >
                <div className={styles.serviceIcon}>
                  <div className={styles.iconBox}>
                    <service.icon size={22} />
                  </div>
                  <span className={styles.serviceNumber}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceNumberDesktop}>{String(i + 1).padStart(2, '0')}</div>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <div className={styles.serviceTags}>
                    {service.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Need something custom?</h2>
            <p className={styles.ctaDescription}>
              Every project is unique. Let's discuss your specific needs and craft a tailored solution.
            </p>
            <div className={styles.ctaButton}>
              <Link to="/start-project" className={styles.button}>
                Start a Project
                <ArrowRight size={14} className={styles.arrow} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Services;
