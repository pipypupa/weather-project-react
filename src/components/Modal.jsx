import styles from "./styles/Modal.module.css";

export const Modal = ({ modal, setModal, setUser }) => {
  if (!modal) {
    document.body.style.overflow = "auto";
    return null;
  }

  document.body.style.overflow = "hidden";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    setUser(username);

    setModal(false);
  };

  return (
    <div className={styles.backdrop} onClick={() => setModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Sign up</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username" className={styles.username}>
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

          <label htmlFor="email" className={styles.email}>
            E-Mail
          </label>
          <input
            type="email"
            className={styles.emailInput}
            name="email"
            placeholder="E-Mail"
            required
          />

          <label htmlFor="password" className={styles.password}>
            Password
          </label>
          <input
            type="password"
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
};
