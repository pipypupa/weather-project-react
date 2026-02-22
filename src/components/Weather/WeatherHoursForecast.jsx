import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";
import styles from "./styles/WeatherHoursForecast.module.css";
import axios from "axios";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
);

export const WeatherHoursForecast = ({ location }) => {
  const chartRef = useRef(null);
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    if (!location) return;

    const fetchHourly = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: location,
              units: "metric",
              cnt: 8,
              appid: "7d999ffaaae7e56a4ec93496de93f111",
            },
          },
        );
        setHourlyData(res.data.list);
      } catch (err) {
        console.error(err);
        setHourlyData([]);
      }
    };

    fetchHourly();
  }, [location]);

  useEffect(() => {
    if (!hourlyData.length) return;

    const ctx = chartRef.current.getContext("2d");

    const formatHour = (hour24) => {
      const hour = hour24 % 12 || 12;
      const ampm = hour24 < 12 ? "AM" : "PM";
      return `${hour} ${ampm}`;
    };

    const labels = hourlyData.map((item) => {
      const date = new Date(item.dt_txt);
      return formatHour(date.getHours());
    });

    const temperatures = hourlyData.map((item) => item.main.temp);

    const pointColors = temperatures.map((temp) => {
      if (temp >= 25) return "#ff4d4f";
      if (temp >= 15) return "#ffa500";
      return "#4fa3ff";
    });

    const data = {
      labels,
      datasets: [
        {
          label: "Температура, °C",
          data: temperatures,
          borderColor: "#ffb36c",
          backgroundColor: "rgba(79, 163, 255, 0.2)",
          tension: 0.3,
          pointRadius: 7,
          pointBackgroundColor: pointColors,
          pointHoverRadius: 12,
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.raw + "°C";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: { display: true,  },
            grid: {
              color: "#000", // колір горизонтальних ліній
              drawTicks: false,
            },
          },
          x: {
            position: "top",
            title: { display: true,  },
            offset: true,
            grid: {
              color: "#000", // колір вертикальних ліній
              drawTicks: false,
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    return () => chart.destroy();
  }, [hourlyData]);

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>Hourly forecast</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
