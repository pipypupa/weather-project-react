import styles from "./styles/WeatherCards.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useState, useEffect } from "react";

import sun from "../../images/sun.png";
import heavyRain from "../../images/heavyRain.png";
import scatteredClouds from "../../images/scattered-clouds.png";
import lightRain from "../../images/sunRain.png";
import mist from "../../images/mist.png";
import snow from "../../images/snow.png";
import thunder from "../../images/thunder.png";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WeatherCards = ({ location, data }) => {
  const [date, setDate] = useState(new Date());
  const [dayName, setDayName] = useState(days[new Date().getDay()]);
  const [image, setImage] = useState(null);

  const getWeatherImage = (weatherMain) => {
    switch (weatherMain) {
      case "Rain":
        return heavyRain;
      case "Clear":
        return sun;
      case "Clouds":
        return scatteredClouds;
      case "Drizzle":
        return lightRain;
      case "Thunderstorm":
        return thunder;
      case "Snow":
        return snow;
      case "Atmosphere":
        return mist;
      default:
        return sun;
    }
  };

  useEffect(() => {
    if (!data) return;
    const currentDate = new Date();
    setDate(currentDate);
    setDayName(days[currentDate.getDay()]);
    setImage(getWeatherImage(data.weather[0].main));
  }, [location, data]);

  if (!data) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className={styles.weatherDiv}>
      <ul className={styles.weatherList}>
        {[1, 2, 3].map((_, index) => (
          <li key={index} className={styles.weatherItem}>
            <div className={styles.weatherCityNameDiv}>
              <p className={styles.weatherCityName}>{data.name}</p>
              <p className={styles.weatherCountryName}>
                {new Intl.DisplayNames(["en"], { type: "region" }).of(
                  data.sys.country,
                )}
              </p>
            </div>

            <p className={styles.weatherTime}>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className={styles.weatherButtonDiv}>
              <button className={styles.weatherButton}>Hourly forecast</button>
              <button
                className={styles.weatherButton}
                onClick={() => {
                  const section = document.getElementById("forecast");
                  if (section) {
                    const top =
                      section.offsetTop -
                      window.innerHeight / 2 +
                      section.offsetHeight / 2;
                    window.scrollTo({
                      top: top,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                5-day forecast
              </button>
            </div>

            <div className={styles.weatherDateDiv}>
              <p className={styles.weatherDate}>{date.toLocaleDateString()}</p>
              <div className={styles.weatherLineDiv}></div>
              <p className={styles.weatherDay}>{dayName}</p>
            </div>

            <div className={styles.cityWeatherDiv}>
              <img
                className={styles.weatherImage}
                src={image}
                alt={data.weather[0].description}
              />
              <p className={styles.weatherDegrees}>
                {Math.round(data.main.temp)}℃
              </p>
            </div>

            <div className={styles.weatherInfoDiv}>
              <button type="button" className={styles.reloadButton}>
                <IoReload className={styles.reloadIcon} />
              </button>

              <button type="button" className={styles.likeButton}>
                <IoMdHeartEmpty className={styles.likeIcon} />
              </button>

              <button type="button" className={styles.seeMoreButton}>
                See more
              </button>

              <button type="button" className={styles.deleteButton}>
                <RiDeleteBin6Line className={styles.deleteIcon} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
