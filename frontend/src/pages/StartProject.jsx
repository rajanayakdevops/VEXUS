import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, Loader2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import styles from "./StartProject.module.css";

const budgetRanges = [
  "$5K - $15K",
  "$15K - $30K",
  "$30K - $50K",
  "$50K - $100K",
  "$100K+",
];
const timelines = [
  "Under 1 month",
  "1 - 3 months",
  "3 - 6 months",
  "6+ months",
  "Flexible",
];

function StartProject() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (fileRef.current.files[0]) {
      formData.append("image", fileRef.current.files[0]);
    }

    setLoading(true);

    await fetch("http://localhost:5000/api/inquiries/create", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <span className={styles.heroBadge}>Start a Project</span>
            <h1 className={styles.heroTitle}>Let's create together</h1>
            <p className={styles.heroDescription}>
              Tell us about your project. We'll review your inquiry and get back
              to you within 24 hours.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formContainer}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={styles.success}
                >
                  <div className={styles.successIcon}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className={styles.successTitle}>Project submitted</h2>
                  <p className={styles.successDescription}>
                    Thank you for reaching out. Our team will review your
                    project details and contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className={styles.form}
                >
                  <div className={styles.formFields}>
                    <div className={styles.field}>
                      <label htmlFor="name" className={styles.label}>
                        Full Name
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="company" className={styles.label}>
                        Company Name
                      </label>
                      <input
                        name="company"
                        id="company"
                        type="text"
                        placeholder="Acme Inc."
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.label}>
                        Email
                      </label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        required
                        placeholder="john@acme.com"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="budget" className={styles.label}>
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        id="budget"
                        required
                        className={styles.select}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="timeline" className={styles.label}>
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        id="timeline"
                        required
                        className={styles.select}
                      >
                        {" "}
                        <option value="">Select timeline</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="description" className={styles.label}>
                        Project Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        rows={5}
                        className={styles.textarea}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>
                        Attachments (optional)
                      </label>
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className={styles.fileButton}
                      >
                        <Upload size={18} />
                        {fileName || "Click to upload a file"}
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        className={styles.fileInput}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.fig,.sketch"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={styles.submitBtn}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className={styles.spinner} />
                          Submitting...
                        </>
                      ) : (
                        "Submit Project"
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default StartProject;
