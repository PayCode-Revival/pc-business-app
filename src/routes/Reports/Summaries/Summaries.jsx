import React from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { Bar, Pie } from "react-chartjs-2"
import DataTable, { createTheme } from "react-data-table-component"
import {
  transactionsHistoryData,
  transactionsHistoryColumns,
} from "../../../statics/transactionsHistory"
import { chartData } from "../../../statics/chartData"

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
import "./Summaries.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Summaries() {
  const barChartData = {
    labels: chartData.map((data) => data.day),
    datasets: [
      {
        label: "Day",
        data: chartData.map((data) =>
          data.totalIncomingTransactions.toString().replace(/,000/gi, "k")
        ),
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
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }

  createTheme(
    "solarized",
    {
      text: {
        primary: "var(--primary-color)",
        secondary: "#2aa198",
      },
      background: {
        default: "var(--secondary-color)",
      },
      context: {
        background: "#cb4b16",
        text: "white",
      },
      divider: {
        default: "whitesmoke",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  )
  return (
    <div
      className="fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar"
      id="summaries">
      {/* Charts Analytics */}
      <div id="charts-analytics" className="container-fluid mt-3 ">
        <div className="row">
          <div className="col col-8">
            <div className="d-flex justify-content-between align-items-center m-1 mb-3">
              <span className="col-9 text-nowrap">
                <SectionHeader text={"Charts Analytics"} />
              </span>
              <select
                className="form-select w-50"
                aria-label="Default select example">
                <option value="1">Last 7 Days</option>
                <option value="2">Last 30 Days</option>
                <option value="3">Last 60 Days</option>
                <option value="3">Last 90 Days</option>
                <option value="3">All Time</option>
              </select>
            </div>
            <div className="col p-2 flat-card-style">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          <div className="col col-4">
            <div className="row justify-content-end">
              <div className="col-6">
                <select className="form-select mb-3">
                  <option value="1">Last 7 Days</option>
                  <option value="2">Last 30 Days</option>
                  <option value="3">Last 60 Days</option>
                  <option value="3">Last 90 Days</option>
                  <option value="3">All Time</option>
                </select>
              </div>
            </div>
            <div className="p-3 flat-card-style">
              <Pie
                id="pie-chart-render"
                data={barChartData}
                options={pieChartOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div id="transactions-history" className="container-fluid mt-3 mb-5">
        <SectionHeader text={"Transactions History"} />
        <div className="row g-3 mt-1">
          <div className="col">
            <div className="p-3 flat-card-style">
              <DataTable
                columns={transactionsHistoryColumns}
                data={transactionsHistoryData}
                direction="auto"
                subHeaderAlign="right"
                pagination
                fixedHeader
                theme="solarized"
                customStyles={{
                  headCells: {
                    style: {
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      color: "white",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="col col-4">
            <div className="p-3 flat-card-style h-100">
              Custom column padding
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
