import React, { useContext, useState, useEffect } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import TransactionsHistory from "../../../components/TransactionsHistory/TransactionsHistory"
import RenderChart from "../../../components/RenderChart/RenderChart"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import {
  generateLabels,
  CHART_STYLES,
  getPaymentCategory,
} from "../../../statics/allFunctions"

export default function Summaries() {
  const { recentTransactions, allTransactions, paymentCategories } =
    useContext(ApiDataContext)

  const [chartData, setChartData] = recentTransactions
    ? useState({
        labels: generateLabels(7),
        datasets: [
          {
            label: "Day",
            data: recentTransactions.map((data) => data.amount),
            ...CHART_STYLES,
          },
        ],
      })
    : useState({
        label: [],
        datasets: [],
      })

  const [barChartDuration, setBarChartDuration] = useState("7")
  const [barChartSort, setBarChartSort] = useState("days")

  function generateChartData(days, sort) {
    days = days === "all" ? allTransactions.length : days
    const output = {
      labels: generateLabels(days),
      datasets: [
        {
          label: "Day",
          data: [],
          ...CHART_STYLES,
        },
      ],
    }
    if (allTransactions) {
      for (let i = 0; i < days; i++) {
        output.datasets[0].data.push(allTransactions[i].amount)
      }
    }
    setChartData(output)
  }

  useEffect(() => {})

  return (
    <div
      className="fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar"
      id="summaries">
      {/* Header */}
      <div className="col-7 text-nowrap">
        <SectionHeader text={"Charts Analytics"} />
      </div>

      {/* Charts Analytics */}
      <div id="charts-analytics" className="container-fluid mt-3">
        <div className="row">
          {/* Bar Chart */}
          <div className="col col-8">
            <div className="row justify-content-between mb-3">
              {/* Duration */}
              <div className="col-5">
                <select
                  className="form-select"
                  value={barChartDuration}
                  onChange={(e) => {
                    setBarChartDuration(e.target.value)
                    generateChartData(e.target.value, barChartSort)
                  }}>
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="60">Last 60 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="col-5">
                <select
                  className="form-select"
                  value={barChartSort}
                  onChange={(e) => {
                    setBarChartSort(e.target.value)
                    generateChartData(barChartDuration, e.target.value)
                  }}>
                  <option value="categories">Categories</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>

            {/* Render */}
            <div className="col p-2 flat-card-style">
              <RenderChart type="bar" data={chartData} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col col-4">
            <div className="row justify-content-end">
              {/* Duration */}
              <div className="col-6">
                <select className="form-select mb-3">
                  <option value="1">Last 7 Days</option>
                  <option value="2">Last 30 Days</option>
                  <option value="3">Last 60 Days</option>
                  <option value="3">Last 90 Days</option>
                  <option value="3">All Time</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="col-6">
                <select className="form-select mb-3">
                  <option value="categories">Categories</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>

            {/* Render */}
            <div className="p-3 flat-card-style">
              <RenderChart type="pie" data={chartData} />
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
              <TransactionsHistory />
            </div>
          </div>

          <div className="col col-4">
            <div className="p-3 flat-card-style h-100"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
