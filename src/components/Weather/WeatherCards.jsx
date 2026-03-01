import styles from "./styles/WeatherCards.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const WeatherCards = ({ location, data, currentUser, setUserClick }) => {
  const [date, setDate] = useState(new Date());
  const [dayName, setDayName] = useState(days[new Date().getDay()]);
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  // Завантаження favorites
  useEffect(() => {
    if (!currentUser) return;
    const storedFavorites =
      JSON.parse(localStorage.getItem(`favorites_${currentUser}`)) || [];
    setFavorites(storedFavorites);

    setCards((prevCards) =>
      prevCards.map((c) => ({
        ...c,
        isFavorite: storedFavorites.includes(c.name),
      })),
    );
  }, [currentUser]);

  // Додавання або оновлення карточки
  useEffect(() => {
    if (!data) return;

    const currentDate = new Date();
    setDate(currentDate);
    setDayName(days[currentDate.getDay()]);

    setCards((prevCards) => {
      const cityExists = prevCards.some((c) => c.name === data.name);
      const newCard = {
        ...data,
        isFavorite: favorites.includes(data.name),
      };

      if (cityExists) {
        return prevCards.map((c) => (c.name === data.name ? newCard : c));
      } else {
        return [...prevCards, newCard];
      }
    });
  }, [data, favorites]);

  const toggleFavorite = (cityName) => {
    if (!currentUser) {
      toast.info("Please log in to add to favorites!");
      return;
    }

    let updatedFavorites;
    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter((c) => c !== cityName);
      toast.info(`${cityName} removed from favorites`);
    } else {
      updatedFavorites = [...favorites, cityName];
      toast.success(`${cityName} added to favorites`);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(
      `favorites_${currentUser}`,
      JSON.stringify(updatedFavorites),
    );

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.name === cityName ? { ...c, isFavorite: !c.isFavorite } : c,
      ),
    );
  };

  const deleteCard = (cityName) => {
    setCards((prevCards) => prevCards.filter((c) => c.name !== cityName));
    toast.info(`${cityName} card deleted`);
  };

  // Скрол до секцій
  const handleHourlyClick = (cityName) => {
    if (setUserClick) setUserClick("hourly");
    const section = document.getElementById("hourly-forecast");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDailyClick = (cityName) => {
    if (setUserClick) setUserClick("daily");
    const section = document.getElementById("daily-forecast");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!cards || cards.length === 0) return <p>No weather cards available</p>;

  return (
    <div className={styles.weatherDiv}>
      <ul className={styles.weatherList}>
        {cards.map((card, index) => (
          <li key={index} className={styles.weatherItem}>
            <div className={styles.weatherCityNameDiv}>
              <p className={styles.weatherCityName}>{card.name}</p>
              <p className={styles.weatherCountryName}>
                {new Intl.DisplayNames(["en"], { type: "region" }).of(
                  card.sys.country,
                )}
              </p>
            </div>

            <p className={styles.weatherTime}>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* Кнопки Hourly та 5-day forecast */}
            <div className={styles.weatherButtonDiv}>
              <button
                onClick={() => handleHourlyClick(card.name)}
                className={styles.weatherButton}
              >
                Hourly forecast
              </button>
              <button
                onClick={() => handleDailyClick(card.name)}
                className={styles.weatherButton}
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
                src={getWeatherImage(card.weather[0].main)}
                alt={card.weather[0].description}
              />
              <p className={styles.weatherDegrees}>
                {Math.round(card.main.temp)}℃
              </p>
            </div>

            <div className={styles.weatherInfoDiv}>
              <button type="button" className={styles.reloadButton}>
                <IoReload className={styles.reloadIcon} />
              </button>

              <button
                type="button"
                className={styles.likeButton}
                onClick={() => toggleFavorite(card.name)}
              >
                {card.isFavorite ? (
                  <IoMdHeart className={styles.likeIcon} color="red" />
                ) : (
                  <IoMdHeartEmpty className={styles.likeIcon} />
                )}
              </button>

              <button type="button" className={styles.seeMoreButton}>
                See more
              </button>

              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => deleteCard(card.name)}
              >
                <RiDeleteBin6Line className={styles.deleteIcon} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};
