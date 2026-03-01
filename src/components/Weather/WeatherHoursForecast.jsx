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

    const data = {
      labels,
      datasets: [
        {
          data: temperatures,
          borderColor: "#ffb36c",
          borderWidth: 3,
          tension: 0.4,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHitRadius: 0,
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            grid: {
              color: "#ddd",
              drawTicks: false,
            },
            ticks: {
              color: "#000",
            },
          },
          x: {
            position: "top",
            offset: true,
            grid: {
              color: "#ddd",
              drawTicks: false,
            },
            ticks: {
              color: "#000",
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    return () => chart.destroy();
  }, [hourlyData]);

  return (
    <div id="hourly-forecast" className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>Hourly forecast</h3>
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};