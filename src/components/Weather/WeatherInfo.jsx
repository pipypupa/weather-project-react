import styles from "./styles/WeatherInfo.module.css";
import visibilityIcon from "../../images/eye.png";
import windSpeedIcon from "../../images/wind.png";
import pressureIcon from "../../images/pressure-gauge.png";
import feelsLikeIcon from "../../images/temperature.png";
import humidityIcon from "../../images/humidity.png";

export const WeatherInfo = ({ data }) => {
  if (!data) return null;

  return (
    <div className={styles.div}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={styles.title}>Feels like</p>
          <p className={styles.text}>{Math.round(data.main.feels_like)}℃</p>
          <img
            className={styles.image}
            src={feelsLikeIcon}
            alt="Feels like temperature"
          />
        </li>

        <li className={styles.item}>
          <ul className={styles.maxminList}>
            <li className={styles.maxminItem}>
              <p className={styles.title}>Min ℃</p>
              <p className={styles.text}>{Math.round(data.main.temp_min)}℃</p>
            </li>

            <li className={styles.maxminItem}>
              <p className={styles.title}>Max ℃</p>
              <p className={styles.text}>{Math.round(data.main.temp_max)}℃</p>
            </li>
          </ul>
        </li>

        <li className={styles.item}>
          <p className={styles.title}>Humidity</p>
          <p className={styles.text}>{data.main.humidity}%</p>
          <img className={styles.image} src={humidityIcon} alt="Humidity" />
        </li>

        <li className={styles.item}>
          <p className={styles.title}>Pressure</p>
          <p className={styles.text}>{data.main.pressure} hPa</p>
          <img className={styles.image} src={pressureIcon} alt="Pressure" />
        </li>

        <li className={styles.item}>
          <p className={styles.title}>Wind speed</p>
          <p className={styles.text}>{data.wind.speed} m/s</p>
          <img className={styles.image} src={windSpeedIcon} alt="Wind speed" />
        </li>

        <li className={styles.item}>
          <p className={styles.title}>Visibility</p>
          <p className={styles.text}>
            {(data.visibility / 1000).toFixed(1)} km
          </p>
          <img className={styles.image} src={visibilityIcon} alt="Visibility" />
        </li>
      </ul>
    </div>
  );
};
