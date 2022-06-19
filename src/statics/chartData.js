import React, { useEffect, useState, useContext } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Bar, Pie } from "react-chartjs-2"
import {
  makeApiRequest,
  generateLabels,
  dayCalculator,
  retrievingPlaceholder,
  currency,
} from "./allFunctions"
import { ApiDataContext } from "./../contexts/ApiDataContext"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "white",
        font: {},
      },
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: "Weekday",
        color: "white",
        padding: 5,
        font: {
          size: 17,
          family: "Nunito Sans",
        },
      },
      ticks: {
        color: "white",
        font: {
          weight: "bold",
          family: "Nunito Sans",
        },
      },
    },
    y: {
      title: {
        display: false,
        text: "Amount",
        color: "white",
        padding: 5,
        font: {
          size: 17,
          family: "Nunito Sans",
        },
      },
      ticks: {
        color: "white",
        font: {
          weight: "bold",
          family: "Nunito Sans",
        },
      },
    },
  },
}

const pieChartOptions = {
  animation: {
    animateScale: true,
    animateRotate: true,
  },

  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
      color: "#fff",
      font: {
        family: "Nunito Sans",
        weight: "bolder",
        size: "10",
      },
    },
  },
}

export function RenderChart({ type = "pie" }) {
  // Set Default Chart Data
  const defaultChartData = {
    label: [],
    datasets: [],
  }
  const { recentTransactions } = useContext(ApiDataContext)
  const chartData = recentTransactions
    ? {
        labels: generateLabels(7),
        datasets: [
          {
            label: "Day",
            data: recentTransactions.map((data) => data.amount),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 129, 68, 0.1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 115, 94, 1)",
            ],
            borderWidth: 7,
            color: "blue",
            fontFamily: "Nunito Sans",
          },
        ],
      }
    : defaultChartData

  return type === "bar" ? (
    <Bar data={chartData} options={barChartOptions} />
  ) : (
    <Pie
      data={chartData}
      plugins={[ChartDataLabels]}
      options={pieChartOptions}></Pie>
  )
}
