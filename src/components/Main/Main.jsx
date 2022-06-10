import React from "react"
import { FlatCard } from "../FlatCard/FlatCard"
import { SectionHeader } from "../SectionHeader/SectionHeader"
import "./Main.css"
import { Bar, Pie } from "react-chartjs-2"
import { chartData } from "../../statics/chartData"
import DataTable, { createTheme } from "react-data-table-component"
import {
  transactionsHistoryData,
  transactionsHistoryColumns,
} from "../../statics/transactionsHistory"
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Main = ({}) => {
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
      className="fadeIn p-3 m-1 d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar"
      id="main">
      {/* Quick Summary */}
      <div id="quick-summary" className="container-fluid">
        <SectionHeader text={"Quick Summary"} />
        <div className="row g-1 flex-nowrap overflow-auto scrollbar">
          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="account_balance"
                title="Saved Accounts"
                text={Math.ceil(Math.random() * 63)}
              />
            </div>
          </div>

          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="wallet"
                title="Wallet Balance"
                text={`₦ ${(
                  Math.ceil(Math.random() * 565189) + 100
                ).toLocaleString()}`}
              />
            </div>
          </div>

          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="calendar_today"
                title="Total Trans. Val"
                text={`₦ ${(
                  Math.ceil(Math.random() * 5650000000) + 100000
                ).toLocaleString()}`}
              />
            </div>
          </div>

          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="account_balance"
                title="Users"
                text={Math.ceil(Math.random() * 21)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Analytics */}
      <div id="charts-analytics" className="container-fluid mt-3">
        <SectionHeader text={"Charts Analytics"} />
        <div className="row g-3 pb-3 mt-1 flex-nowrap overflow-auto scrollbar">
          <div className="col col-8">
            <div className="p-3 flat-card-style">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          <div className="col col-4">
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
          <div className="col col-6">
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

          <div className="col col-6">
            <div className="p-3 flat-card-style h-100">
              Custom column padding
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
