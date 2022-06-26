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
import { generateLabels } from "./../../statics/allFunctions"
import { ApiDataContext } from "./../../contexts/ApiDataContext"

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

export default function RenderChart({
  type = "pie",
  data = {
    label: [],
    datasets: [],
  },
}) {
  return type === "bar" ? (
    <Bar data={data} options={barChartOptions} />
  ) : (
    <Pie
      data={data}
      plugins={[ChartDataLabels]}
      options={pieChartOptions}></Pie>
  )
}
