import styles from "./styles/WeatherModal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export const WeatherModal = ({ data, onClose }) => {
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

        setForecast(res.data.list.slice(0, 8));
      } catch (err) {
        setError("Failed to load hourly forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [data]);

  if (!data) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Hourly forecast</h2>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && forecast.length > 0 && (
          <ul className={styles.list}>
            {forecast.map((item, index) => {
              const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

              return (
                <li key={index} className={styles.item}>
                  <p className={styles.day}>
                    {new Date(item.dt_txt.replace(" ", "T")).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
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
                      {Math.round(item.main.temp)}°
                    </p>
                  </div>

                  <p className={styles.weatherName}>
                    {item.weather[0].description}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
