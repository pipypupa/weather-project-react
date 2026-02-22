import styles from "./styles/Hero.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";

export const Hero = ({ setLocation, setIsUserLocation }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(name);
    setIsUserLocation(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container`}>
        <h1 className={styles.heroTitle}>Weather dashboard</h1>
        <div className={styles.heroDiv}>
          <p className={styles.heroText}>
            Create your personal list of favorite cities and always be aware of
            the weather.
          </p>
          <div className={styles.heroLine}></div>
          <p className={styles.heroDate}>October 2023 Friday, 13th</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.heroForm}>
          <input
            onChange={handleChange}
            value={name}
            className={styles.heroInput}
            placeholder="Search location..."
          />
          <button type="submit" className={styles.heroButton}>
            <HiOutlineMagnifyingGlass className={styles.heroIcon} />
          </button>
        </form>
      </div>
    </section>
  );
};
