import React from "react"

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
import { FlatCards } from "../../components/FlatCards/FlatCards"
import { Bar, Pie } from "react-chartjs-2"
import { DemoData } from "../../statics/chartData"
import ChartDataLabels from "chartjs-plugin-datalabels"
import DataTable, { createTheme } from "react-data-table-component"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export const Dashboard = ({}) => {
  const chartData = {
    labels: DemoData.map((data) => data.day),
    datasets: [
      {
        label: "Day",
        data: DemoData.map((data) =>
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

  const transactionsHistoryColumns = [
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ]

  const transactionsHistoryData = [
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "debit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
    {
      amount: Math.ceil(Math.floor(Math.random() * 200000)).toLocaleString(),
      date: new Date().toLocaleDateString(),
      type: "credit",
    },
  ]

  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#435EBE",
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
    <div className="d-flex flex-column p-1">
      {/* Quick Summary & User Actions */}
      <div className="container ">
        <div className="row p-2 justify-content-around align-items-start">
          {/* Quick Summary Cards */}
          <span className="h5 fw-bolder">Quick Summary</span>
          <div id="quick-summary" className="col col col-8 d-flex scrollbar ">
            <FlatCards
              iconName={"account_balance"}
              styles={{}}
              title={"Saved Accounts"}
              text={Math.floor(Math.random() * 20)}
            />
            <FlatCards
              iconName={"person"}
              styles={{
                text: {
                  letterSpacing: "2.5px",
                },
              }}
              title={"Total Transactions Value"}
              text={`₦${(
                Math.ceil(Math.random() * 100000) + 100000
              ).toLocaleString()}`}
            />
            <FlatCards
              iconName={"wallet"}
              styles={{
                text: {
                  letterSpacing: "2.5px",
                },
              }}
              title={"Wallet Balance"}
              text={`₦${(
                Math.ceil(Math.random() * 100000) + 100000
              ).toLocaleString()}`}
            />

            <FlatCards
              iconName={"wallet"}
              styles={{
                text: {
                  letterSpacing: "2.5px",
                },
              }}
              title={"Wallet Balance"}
              text={`₦${(
                Math.ceil(Math.random() * 100000) + 100000
              ).toLocaleString()}`}
            />
          </div>

          {/* Logged In User Actions */}
          <div
            id="user-actions"
            className="col col col-3 ms-1 d-flex justify-content-evenly align-items-center flat-card-style">
            <img
              src="https://picsum.photos/500"
              className="rounded-circle"
              style={{ width: "35%" }}
              alt="Avatar"
            />
            <span className="ms-3 m-1" style={{ lineHeight: "1.5" }}>
              <strong>Damilare Abejirin</strong>
              <p
                className="text-light fw-bolder"
                style={{
                  textUnderlineOffset: "0.25em",
                }}>
                <u>Head Usher</u>
                &nbsp;<span className="mt-2 badge bg-primary">ADMIN</span>
              </p>
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="container mt-3 ">
        <div className="row p-2 mt-2 justify-content-around align-items-start ">
          {/* Bar Chart */}
          <span className="h5 fw-bolder">Charts Analytics</span>

          <div className="col col-9" role={"button"}>
            <div className="flat-card-style p-2">
              <Bar data={chartData} options={barChartOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col col-3">
            <div className="d-flex flat-card-style p-3">
              <Pie data={chartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="container mt-3">
        <span className="h5 fw-bolder">Transactions History</span>
        <div className="row justify-content-between align-items-start">
          <div className="col col-9 ">
            <div
              className="flat-card-style d-flex flex-column mt-3 mb-5"
              style={{ height: "500px" }}>
              <DataTable
                columns={transactionsHistoryColumns}
                data={transactionsHistoryData}
                direction="auto"
                subHeaderAlign="right"
                pagination
                fixedHeader
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

          <div className="col col-3">
            <div className="flat-card-style p-5" style={{ height: 525 }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
