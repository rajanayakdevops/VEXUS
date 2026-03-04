import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Sarah Chen',
    company: 'Meridian Finance',
    role: 'CTO',
    review: 'VEXUS transformed our clunky dashboard into an elegant, performant interface. Their attention to detail and engineering rigor is unmatched.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    company: 'Nova Healthcare',
    role: 'Head of Product',
    review: 'Working with VEXUS felt like having an elite in-house team. They shipped faster than we imagined with zero compromises on quality.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    company: 'Apex Commerce',
    role: 'Founder & CEO',
    review: 'The best frontend engineering studio we have ever worked with. Period. Our conversion rate increased 40% after the redesign.',
    rating: 5,
  },
  {
    name: 'David Park',
    company: 'Orbit Analytics',
    role: 'VP Engineering',
    review: 'Their design system work saved us months of development time. Clean, scalable, and beautifully documented.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Testimonials</span>
          <h2 className={styles.title}>Trusted by leaders</h2>
        </div>

        <div className={styles.carouselWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className={styles.card}
            >
              <div className={styles.stars}>
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className={styles.star} />
                ))}
              </div>
              <blockquote className={styles.quote}>
                "{testimonials[current].review}"
              </blockquote>
              <div className={styles.author}>
                <p className={styles.name}>{testimonials[current].name}</p>
                <p className={styles.role}>
                  {testimonials[current].role}, {testimonials[current].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.controls}>
            <button onClick={prev} className={styles.controlBtn} aria-label="Previous testimonial">
              <ChevronLeft size={18} />
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className={styles.controlBtn} aria-label="Next testimonial">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
