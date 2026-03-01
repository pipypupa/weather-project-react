import { useState } from "react";
import styles from "./styles/Gallery.module.css";
import image1 from "../images/slider-image3.webp";
import image2 from "../images/slider-image2.webp";
import image3 from "../images/slider-image1.webp";
import image4 from "../images/slider-image4.webp";
import image5 from "../images/slider-image5.webp";

export const Gallery = () => {
  const [images, setImages] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
  ]);

  const centerIndex = 2;

  const handleClick = (index) => {
    if (index === centerIndex) return;

    const newImages = [...images];
    [newImages[centerIndex], newImages[index]] = [
      newImages[index],
      newImages[centerIndex],
    ];
    setImages(newImages);
  };

  return (
    <section className={styles.gallery}>
      <div className={`${styles.container} container`}>
        <h3 className={styles.title}>Beautiful nature</h3>
        <ul className={styles.list}>
          {images.map((img, index) => {
            let className = "";
            switch (index) {
              case 0:
                className = styles.image1;
                break;
              case 1:
                className = styles.image2;
                break;
              case 2:
                className = styles.image3;
                break;
              case 3:
                className = styles.image4;
                break;
              case 4:
                className = styles.image5;
                break;
              default:
                className = "";
                break;
            }
            return (
              <li key={index} className={styles.item}>
                <img
                  src={img}
                  className={className}
                  onClick={() => handleClick(index)}
                  alt={`Gallery ${index}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
