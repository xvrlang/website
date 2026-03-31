import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from './styles.module.css';
import Heading from "@theme/Heading";
import React from "react";
import Link from "@docusaurus/Link";

function HomePageHeader() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={styles.heroMinimal}>
      <div className="container text--center">
        <Heading as="h1" className={styles.title}>
          {siteConfig.title.split(" ").map((word, index) => 
            word.toLowerCase() === "xvr" ? (
              <span key={index} className={styles.xvr}>
                {word}{" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </Heading>
        
        <p className={styles.subtitle}>
          {siteConfig.tagline}
        </p>

        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/introduction">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HomePageHeader;