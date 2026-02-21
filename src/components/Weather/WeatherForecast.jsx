import styles from "./styles/WeatherForecast.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const WeatherForecast = ({ data }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data?.name) return;

    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              q: data.name,
              units: "metric",
              appid: "7d999ffaaae7e56a4ec93496de93f111",
            },
          },
        );

        const daily = res.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00"),
        );

        setForecast(daily.slice(0, 5));
      } catch (err) {
        setError("Failed to load forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [data]);

  if (!data) return null;

  if (loading)
    return (
      <div id="forecast" className={styles.div}>
        Loading...
      </div>
    );

  if (error)
    return (
      <div id="forecast" className={styles.div}>
        {error}
      </div>
    );

  if (forecast.length === 0) return null;

  return (
    <div id="forecast" className={styles.div}>
      <h2 className={styles.title}>5-day forecast</h2>

      <ul className={styles.list}>
        {forecast.map((item, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

          return (
            <li key={index} className={styles.item}>
              <p className={styles.day}>
                {new Date(item.dt_txt.replace(" ", "T")).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </p>

              <div className={styles.weatherDiv}>
                <img
                  className={styles.weatherImage}
                  src={iconUrl}
                  alt={item.weather[0].description}
                />
                <p className={styles.weatherDegrees}>
                  {Math.round(item.main.temp_max)}° /
                  {Math.round(item.main.temp_min)}°
                </p>
              </div>

              <p className={styles.weatherName}>
                {item.weather[0].description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
