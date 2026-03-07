import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import styles from "./Portfolio.module.css";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

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
              A curated selection of projects that showcase our engineering
              excellence.
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
                  className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.projects}>
          <div className={styles.projectsContainer}>
            {loading && <p>Loading projects...</p>}

            <motion.div layout className={styles.grid}>
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className={styles.card}
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className={styles.image}
                        />
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                          <p className={styles.category}>{project.category}</p>

                          <ArrowUpRight
                            size={16}
                            className={styles.arrowIcon}
                          />
                        </div>

                        <h3 className={styles.projectTitle}>{project.title}</h3>

                        <p className={styles.summary}>{project.summary}</p>

                        <div className={styles.tags}>
                          {project.tags?.map((tag) => (
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
