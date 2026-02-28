import styles from "./styles/Modal.module.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Modal = ({ modal, setModal, setUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  if (!modal) {
    document.body.style.overflow = "auto";
    return null;
  }

  document.body.style.overflow = "hidden";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email?.value.trim(); // undefined для логіну
    const password = form.password.value;

    if (!isLoginMode) {
      // Sign Up
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const usernameExists = existingUsers.some((u) => u.username === username);
      const emailExists = existingUsers.some((u) => u.email === email);

      if (usernameExists || emailExists) {
        toast.error("Username or email already exists!");
        return;
      }

      const newUser = { username, email, password };
      localStorage.setItem(
        "users",
        JSON.stringify([...existingUsers, newUser]),
      );
      setUser(username);
      toast.success("Successfully signed up!");
    } else {
      // Log In
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = existingUsers.find(
        (u) => u.username === username && u.password === password,
      );
      if (!foundUser) {
        toast.error("Incorrect username or password!");
        return;
      }

      setUser(foundUser.username);
      toast.success("Successfully logged in!");
    }

    setModal(false);
  };

  return (
    <div className={styles.backdrop} onClick={() => setModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{isLoginMode ? "Log In" : "Sign Up"}</h2>
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

          {!isLoginMode && (
            <>
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
            </>
          )}

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
            {isLoginMode ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className={styles.text}>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className={styles.link}
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "Sign Up" : "Log In"}
          </button>
        </p>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </div>
  );
};
