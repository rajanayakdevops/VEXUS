import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const footerLinks = {
  Studio: [
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/start-project', label: 'Start a Project' },
  ],
  Services: [
    { href: '/services', label: 'UI Development' },
    { href: '/services', label: 'Design Systems' },
    { href: '/services', label: 'Performance' },
  ],
  Connect: [
    { href: '#', label: 'Twitter / X' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'Dribbble' },
  ],
};

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <span>V</span>
              </div>
              <span className={styles.logoText}>VEXUS</span>
            </Link>
            <p className={styles.description}>
              Premium UI engineering studio crafting exceptional digital
              experiences for ambitious companies.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>{title}</h3>
              <ul className={styles.linkList}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.bottom}
        >
          <p className={styles.copyright}>
            © 2026 VEXUS Studio. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link to="#" className={styles.legalLink}>
              Privacy
            </Link>
            <Link to="#" className={styles.legalLink}>
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
