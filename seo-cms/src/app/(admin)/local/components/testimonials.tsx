import React from "react";
import styles from "./testimonials.module.scss";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    feedback: "This service is fantastic! Highly recommend.",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "A wonderful experience from start to finish.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    feedback: "Professional and efficient. Will use again!",
  },
];

const Testimonials = () => {
  return (
    <div className={styles.testimonialsContainer}>
      <h2 className={styles.title}>What Our Clients Say</h2>
      <div className={styles.testimonialList}>
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className={styles.testimonialItem}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <p className={styles.feedback}>{testimonial.feedback}</p>
            <FaQuoteRight className={styles.quoteIcon} />
            <p className={styles.clientName}>- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;