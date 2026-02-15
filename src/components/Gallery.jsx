import styles from "./styles/Gallery.module.css";
import image1 from "../images/slider-image3.webp";
import image2 from "../images/slider-image2.webp";
import image3 from "../images/slider-image1.webp";
import image4 from "../images/slider-image4.webp";
import image5 from "../images/slider-image5.webp";

export const Gallery = () => {
  return (
    <section className={styles.gallery}>
      <div className={`${styles.container} container`}>
        <h3 className={styles.title}>Beautiful nature</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <img src={image1} className={styles.image1} />
          </li>
          <li className={styles.item}>
            <img src={image2} className={styles.image2} />
          </li>
          <li className={styles.item}>
            <img src={image3} className={styles.image3} />
          </li>
          <li className={styles.item}>
            <img src={image4} className={styles.image4} />
          </li>
          <li className={styles.item}>
            <img src={image5} className={styles.image5} />
          </li>
        </ul>
      </div>
    </section>
  );
};
