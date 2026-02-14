import styles from './styles/Header.module.css'
import logoMobile from '../images/logo-mobile-1.webp'
import logoTablet from '../images/logo-tablet-1.webp'
import logoDesktop from '../images/logo-desktop-1.webp'
import user from '../images/user.webp'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const Header = ({ setModal }) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <picture className={styles.headerImage}>
                    <source media="(min-width: 1200px)" srcSet={logoDesktop} />
                    <source media="(min-width: 768px)" srcSet={logoTablet} />
                    <img src={logoMobile} alt="Company logo" />
                </picture>

                <ul className={styles.headerList}>
                    <li className={styles.headerItem}>
                        <a className={styles.headerLink} href="#">Who we are</a>
                    </li>
                    <li className={styles.headerItem}>
                        <a className={styles.headerLink} href="#">Contacts</a>
                    </li>
                    <li className={styles.headerItem}>
                        <a className={styles.headerLink} href="#">Menu</a>
                    </li>
                </ul>

                <div className={styles.headerDiv}>
                    <button
                        onClick={() => setModal(true)}
                        type="button"
                        className={styles.headerButton}
                    >
                        Sign Up
                    </button>
                    <img
                        className={styles.headerAvatar}
                        src={user}
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
                        <MdOutlineKeyboardArrowRight
                            className={styles.headerMenuIcon}
                        />
                    </button>
                </div>
            </div>
        </header>
    )
}
