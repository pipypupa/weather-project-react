import styles from "./styles/Weather.module.css";
import { WeatherCards } from "./Weather/WeatherCards";
import { WeatherInfo } from "./Weather/WeatherInfo";
import { WeatherForecast } from "./Weather/WeatherForecast";
import { WeatherHoursForecast } from "./Weather/WeatherHoursForecast";
import { useState, useEffect } from "react";
import axios from "axios";

export const Weather = ({ location, isUserLocation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        setError(false);
        setLoading(true);

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: location,
              units: "metric",
              appid: "7d999ffaaae7e56a4ec93496de93f111",
            },
          },
        );

        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.errorTitle}>City not found</h2>
        <p className={styles.errorText}>
          We couldn't find "{location}". Please check the spelling and try
          again.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
        <p className={styles.loaderText}>Loading weather...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <section className={styles.weather}>
      <div className={`${styles.container} container`}>
        <WeatherCards location={location} data={data} />

        {isUserLocation && (
          <>
            <WeatherInfo data={data} />
            <WeatherHoursForecast location={location} />
            <WeatherForecast data={data} />
          </>
        )}
      </div>
    </section>
  );
};
