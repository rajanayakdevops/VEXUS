import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/start-project", label: "Start a Project" },
  { href: "/payment", label: "Payment" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;

    setLogoClicks(newClicks);

    if (newClicks === 5) {
      navigate("/admin-login");

      setLogoClicks(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <nav className={styles.nav}>
          {/* LOGO */}
          <div onClick={handleLogoClick} className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>V</span>
            </div>

            <span className={styles.logoText}>VEXUS</span>
          </div>

          {/* DESKTOP NAV */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`${styles.navLink} ${
                  location.pathname === link.href ? styles.active : ""
                }`}
              >
                {link.label}

                {location.pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className={styles.underline}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className={styles.desktopCta}>
            <Link to="/start-project" className={styles.ctaBtn}>
              Get Started
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={styles.mobileToggle}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles.mobileMenu}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`${styles.mobileLink} ${
                  location.pathname === link.href ? styles.mobileActive : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/start-project" className={styles.mobileCta}>
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
