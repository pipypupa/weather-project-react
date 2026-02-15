import styles from "./styles/Modal.module.css";

export const Modal = ({ modal, setModal }) => {
  if (modal) {
    document.body.style.overflow = "hidden";
    return (
      <div
        className={styles.backdrop}
        onClick={() => {
          setModal(false);
        }}
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.title}>Sign up</h2>
          <form className={styles.form}>
            <label for="username" className={styles.username}>
              Username
            </label>
            <input
              type="text"
              className={styles.usernameInput}
              name="username"
              placeholder="Username"
              autoComplete="username"
              required
            />
            <label for="username" className={styles.email}>
              E-Mail
            </label>
            <input
              type="text"
              className={styles.emailInput}
              name="email"
              placeholder="E-Mail"
              required
            />
            <label for="username" className={styles.password}>
              Password
            </label>
            <input
              type="text"
              className={styles.passwordInput}
              autoComplete="current-password"
              placeholder="Password"
              name="password"
              required
            />
            <button type="submit" className={styles.button}>
              Sign up
            </button>
          </form>
          <p className={styles.text}>
            Already have an account?{" "}
            <a className={styles.link} href="/">
              Log In
            </a>
          </p>
        </div>
      </div>
    );
  } else {
    document.body.style.overflow = "auto";
  }
};
