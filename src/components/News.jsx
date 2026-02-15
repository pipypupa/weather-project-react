import styles from "./styles/News.module.css";
import pet1 from "../images/pet-image1.webp";
import pet2 from "../images/pet-image2.webp";
import pet3 from "../images/pet-image3.webp";
import pet4 from "../images/pet-image4.webp";

export const News = () => {
  return (
    <section className={styles.news}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.title}>Interacting with our pets</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <img className={styles.image} src={pet1} />
            <p className={styles.text}>
              Rescue pups pose as ghosts in festive photo shoot
            </p>
          </li>
          <li className={styles.item}>
            <img className={styles.image} src={pet2} />
            <p className={styles.text}>
              Cat interrupts morning coffee on sunny Washington morning
            </p>
          </li>
          <li className={styles.item}>
            <img className={styles.image} src={pet3} />
            <p className={styles.text}>
              New study finds dogs pay more attention to women
            </p>
          </li>
          <li className={styles.item}>
            <img className={styles.image} src={pet4} />
            <p className={styles.text}>
              Petting dogs gives health benefit, even if they are not yours
            </p>
          </li>
        </ul>
        <button className={styles.button} type="button">
          See more
        </button>
      </div>
    </section>
  );
};
