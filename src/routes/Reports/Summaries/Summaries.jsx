import React, { useContext, useState, useEffect } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import TransactionsHistory from "./TransactionsHistory/TransactionsHistory"
import RenderChart from "../../../components/RenderChart/RenderChart"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import {
  generateLabels,
  CHART_STYLES,
  getPaymentCategory,
  capitalizeFirsts,
} from "../../../statics/allFunctions"

export default function Summaries() {
  const {
    recentTransactions,
    allTransactions,
    paymentCategories,
    transactionStatuses,
  } = useContext(ApiDataContext)

  const [barChartData, setBarChartData] =
    recentTransactions && paymentCategories
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

  const [pieChartData, setPieChartData] = recentTransactions
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

  const [pieChartDuration, setPieChartDuration] = useState("7")
  const [pieChartSort, setPieChartSort] = useState("categories")

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  let currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth
  }

  // Filters Toggle
  const [filters, setFilters] = useState(false)

  // Filter Terms
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDateFilter, setStartDateFilter] = useState(null)
  const [endDateFilter, setEndDateFilter] = useState(
    `${currentYear}-${currentMonth}-${currentDay}`
  )

  function generateChartData(days, sort, chart = "bar") {
    days = days === "all" ? allTransactions.length : days

    const paymentCategoriesIds = []
    const paymentCategoriesTitles = []

    paymentCategories.forEach((category) => {
      paymentCategoriesIds.push(category.id)
      paymentCategoriesTitles.push(category.title)
    })

    const output = {
      labels: sort === "days" ? generateLabels(days) : paymentCategoriesTitles,
      datasets: [
        {
          label: "Day",
          data: [],
          backgroundColor: paymentCategories.map((category) => category.color),
          ...CHART_STYLES,
        },
      ],
    }

    // Sort By Day
    if (allTransactions && sort === "days") {
      for (let i = 0; i < days; i++) {
        output.datasets[0].data.push(allTransactions[i].amount)
      }
    }

    // Sort By Category
    if (paymentCategories && sort === "categories") {
      let transactionCategoryIndex
      for (let i = 0; i < allTransactions.length; i++) {
        const boundDate = new Date(
          new Date().setDate(new Date().getDate() - days)
        )

        if (new Date(boundDate) > new Date(allTransactions[i].created_at)) {
          break
        }

        // Get Array Index Of Current Transaction's Category
        for (let j = 0; j < paymentCategoriesIds.length; j++) {
          if (paymentCategoriesIds[j] == allTransactions[i].category) {
            transactionCategoryIndex = j
            break
          }
        }

        // Increment The Value In The Output Array
        if (transactionCategoryIndex >= 0) {
          if (
            typeof output.datasets[0].data[transactionCategoryIndex] ===
            "undefined"
          ) {
            output.datasets[0].data[transactionCategoryIndex] = 0
          } else {
            output.datasets[0].data[transactionCategoryIndex] += parseFloat(
              allTransactions[i].amount
            )
          }
        } else {
          output.labels.push("Others")
        }
      }
    }

    chart === "bar" ? setBarChartData(output) : setPieChartData(output)
  }

  return (
    <div
      className="fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar"
      id="summaries">
      {/* Header */}
      <div className="col-7 text-nowrap">
        <SectionHeader text={"Charts Analytics"} />
      </div>

      {/* Charts Analytics */}
      <div id="charts-analytics" className="container-fluid mt-3 mb-3">
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
              <RenderChart type="bar" data={barChartData} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col col-4">
            <div className="row justify-content-end">
              {/* Duration */}
              <div className="col-6">
                <select
                  className="form-select mb-3"
                  value={pieChartDuration}
                  onChange={(e) => {
                    setPieChartDuration(e.target.value)
                    generateChartData(e.target.value, pieChartSort, "pie")
                  }}>
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="60">Last 60 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="col-6">
                <select
                  className="form-select mb-3"
                  value={pieChartSort}
                  onChange={(e) => {
                    setPieChartSort(e.target.value)
                    generateChartData(pieChartDuration, e.target.value, "pie")
                  }}>
                  <option value="categories">Categories</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>

            {/* Render */}
            <div className="p-3 flat-card-style">
              <RenderChart type="pie" data={pieChartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      {/* Header */}
      <div className="col col-8 mt-3 mx-2 py-2">
        <div className="row">
          <div className="col col-10">
            <SectionHeader text={"Transactions History"} />
          </div>
          <div className="col">
            <div className="form-check form-switch">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked">
                Filters
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={(e) => {
                  setFilters(!filters)
                  setCategoryFilter("All")
                  setStatusFilter("All")
                  setStartDateFilter(null)
                  setEndDateFilter(null)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="transactions-history" className="container-fluid mt-3 mb-5">
        <div
          className={`${filters ? "d-flex" : "d-none"} row py-2 col-8 fadeIn`}>
          {/* Filter By Category */}
          <div className="col col-3">
            <div className="form-floating">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}>
                <option>All</option>
                {paymentCategories &&
                  paymentCategories.map((category, index) => (
                    <option key={index}>{category.title}</option>
                  ))}
              </select>
              <label>Category</label>
            </div>
          </div>

          {/* Filter By Status */}
          <div className="col col-3">
            <div className="form-floating">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All</option>
                {transactionStatuses &&
                  transactionStatuses.map((status, index) => (
                    <option key={index}>
                      {capitalizeFirsts(status.title)}
                    </option>
                  ))}
              </select>
              <label>Status</label>
            </div>
          </div>

          {/* Filter By Date */}
          <div className="col">
            {/* Start Date */}
            <div className="row">
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    value={startDateFilter ? startDateFilter : ""}
                    onChange={(e) => {
                      setStartDateFilter(e.target.value)
                    }}
                  />
                  <label>Start Date</label>
                </div>
              </div>

              {/* End Date */}
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="DD/MM/YYYY"
                    value={endDateFilter ? endDateFilter : ""}
                    onChange={(e) => {
                      setEndDateFilter(e.target.value)
                    }}
                  />
                  <label>End Date</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col">
            <div className="p-3 flat-card-style">
              <TransactionsHistory
                duration="all"
                filter={{
                  category: categoryFilter,
                  status: statusFilter,
                  startDate: startDateFilter,
                  endDate: endDateFilter,
                }}
              />
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
