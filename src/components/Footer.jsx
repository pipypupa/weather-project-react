import styles from "./styles/Footer.module.css";
import logoMobile from "../images/logo-mobile-1.webp";
import logoTablet from "../images/logo-tablet-1.webp";
import logoDesktop from "../images/logo-desktop-1.webp";
import inst from "../images/instagram.svg";
import whats from "../images/whatsapp.svg";
import faceb from "../images/facebook.svg";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <picture className={styles.footerImage}>
          <source media="(min-width: 1200px)" srcSet={logoDesktop} />
          <source media="(min-width: 768px)" srcSet={logoTablet} />
          <img src={logoMobile} alt="Description of image" />
        </picture>
        <div className={styles.footerAdressDiv}>
          <h3 className={styles.footerAdressText}>Address</h3>
          <p className={styles.footerAdress}>
            Svobody str. 35
            <br /> Kyiv
            <br /> Ukraine
          </p>
        </div>
        <div className={styles.contactDiv}>
          <h3 className={styles.contactTitle}>Contact us</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <a href="/">
                <img
                  id={styles.inst}
                  className={styles.img}
                  src={inst}
                  alt="instagram link image"
                />
              </a>
            </li>
            <li className={styles.contactItem}>
              <a href="/">
                <img
                  className={styles.img}
                  src={faceb}
                  alt="instagram link image"
                />
              </a>
            </li>
            <li className={styles.contactItem}>
              <a href="/">
                <img
                  className={styles.img}
                  src={whats}
                  alt="instagram link image"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
