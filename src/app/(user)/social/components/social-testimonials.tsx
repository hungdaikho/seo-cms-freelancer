"use client";

import styles from "../page.module.scss";

export default function SocialTestimonials() {
  const testimonials = [
    {
      quote:
        "The Semrush social media poster is probably the most comprehensive, intuitive and easy to use social media publishing, scheduling and analytics tool out there, and I had used @buffer and @Falcon10 for years.",
      author: {
        name: "Frederik Hermann",
        title: "Vice President of Marketing, Saleshood",
        initials: "FH",
      },
    },
    {
      quote:
        "Love the Semrush social media tools - tracking, scheduling & benchmarking / Ideas!",
      author: {
        name: "Phil Drinkwater",
        title: "Business Coach, Phil Drinkwater Coaching",
        initials: "PD",
      },
    },
    {
      quote:
        "Social Tracker from SEMrush is a tool that can help - it will analyze your (and your competitors') audience preferences so that you can start delivering content they'll enjoy.",
      author: {
        name: "Mahek Dugar",
        title: "Marketing Specialist",
        initials: "MD",
      },
    },
    {
      quote:
        "The Social Poster from SEMrush is amazing! It's miles more reliable than other top schedulers. All of my accounts have stayed connected and the analytics are amazing!",
      author: {
        name: "Ashley Madden",
        title: "Marketing Strategist, Helianthus Advising",
        initials: "AM",
      },
    },
    {
      quote:
        "My boss always tells me to 'Work smarter, not harder' ... that's exactly what the SEMrush Social Tracker is and does - simply put, it's AMAZING!",
      author: {
        name: "Jamie Barren",
        title: "Event Planning and Online Marketing, JBP Events",
        initials: "JB",
      },
    },
    {
      quote:
        "Tracking social media campaigns is very handy to determine what types of content shares are more effective and bring in the most interaction and traffic conversions.",
      author: {
        name: "Shane Schimpf",
        title: "Entrepreneur & Consultant, Comeback Marketing LLC",
        initials: "SS",
      },
    },
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2>Minimize stress and maximize your social media impact.</h2>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <div className={styles.quote}>{testimonial.quote}</div>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.author.initials}
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>{testimonial.author.name}</div>
                  <div className={styles.title}>{testimonial.author.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <button className={styles.ctaButton}>Get started</button>
        </div>
      </div>
    </section>
  );
}
