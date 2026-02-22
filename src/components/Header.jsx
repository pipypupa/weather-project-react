import styles from "./styles/Header.module.css";
import logoMobile from "../images/logo-mobile-1.webp";
import logoTablet from "../images/logo-tablet-1.webp";
import logoDesktop from "../images/logo-desktop-1.webp";
import userIcon from "../images/user.webp";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const Header = ({ user, setUser, setModal }) => {
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setUser("");
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <picture className={styles.headerImage}>
          <source media="(min-width: 1200px)" srcSet={logoDesktop} />
          <source media="(min-width: 768px)" srcSet={logoTablet} />
          <img src={logoMobile} alt="Company logo" />
        </picture>

        <ul className={styles.headerList}>
          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#about">
              Who we are
            </a>
          </li>
          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#contacts">
              Contacts
            </a>
          </li>
          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#menu">
              Menu
            </a>
          </li>
        </ul>

        <div className={styles.headerDiv}>
          {!user ? (
            <button
              onClick={() => setModal(true)}
              type="button"
              className={styles.headerButton}
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={handleLogout}
              type="button"
              className={styles.headerButton}
            >
              {user} (Log out)
            </button>
          )}
          <img
            className={styles.headerAvatar}
            src={userIcon}
            alt="User avatar"
          />
        </div>

        <div className={styles.headerMenu}>
          <button
            onClick={() => setModal(true)}
            type="button"
            className={styles.headerMenuButton}
          >
            <span className={styles.headerMenuLink}>Menu</span>
            <MdOutlineKeyboardArrowRight className={styles.headerMenuIcon} />
          </button>
        </div>
      </div>
    </header>
  );
};
