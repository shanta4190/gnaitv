import styles from "./page.module.css";

const highlights = [
  {
    title: "Recorded Programming",
    description:
      "Watch curated YouTube-based episodes, interviews, and educational media in one streamlined experience.",
  },
  {
    title: "Trusted Knowledge Library",
    description:
      "Explore organized channel topics and verified source material tailored for learning and research.",
  },
  {
    title: "Future Live Broadcasts",
    description:
      "Prepare for approval-controlled live sessions built with compliance, editorial review, and transparency.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.badge}>GNAITV</p>
        <h1>Media and knowledge programming for the GNAI community.</h1>
        <p>
          GNAITV is the official digital destination for recorded programming,
          channel discovery, and future live experiences.
        </p>
        <div className={styles.actions}>
          <a href="#programming" className={styles.primaryAction}>
            Explore Programming
          </a>
          <a href="#about" className={styles.secondaryAction}>
            About GNAITV
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <section id="programming" className={styles.section}>
          <h2>What you can access today</h2>
          <div className={styles.grid}>
            {highlights.map((item) => (
              <article key={item.title} className={styles.card}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className={styles.section}>
          <h2>Built for responsible publishing</h2>
          <p>
            Every content flow is designed around source verification, review
            gates, and human approval so programming quality stays high.
          </p>
        </section>
      </main>
    </div>
  );
}
