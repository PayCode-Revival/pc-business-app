import React, { useContext, useState, useEffect } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import TransactionsHistory from "./TransactionsHistory/TransactionsHistory"
import RenderChart from "../../../components/RenderChart/RenderChart"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import {
  CHART_STYLES,
  getPaymentCategory,
  capitalizeFirsts,
  existsInArr,
  dayCalculator,
  retrievingPlaceholder,
} from "../../../statics/allFunctions"
import { api } from "../../../statics/api"

export default function Summaries() {
  const {
    recentTransactions,
    parsedRecentTransactions,
    paymentCategories,
    transactionStatuses,
  } = useContext(ApiDataContext)

  function parseTransactionByCategory(transactions) {
    const parsedRecentTransactionTemp = []
    for (let i = 0; i < transactions.length; i++) {
      let transactionCategory = getPaymentCategory(
        transactions[i].category,
        paymentCategories
      )
      let dayIndex = existsInArr(
        "category",
        transactionCategory,
        parsedRecentTransactionTemp
      )
      if (dayIndex > -1) {
        parsedRecentTransactionTemp[dayIndex].amount += parseFloat(
          transactions[i].amount
        )
      } else {
        parsedRecentTransactionTemp.push({
          amount: parseFloat(transactions[i].amount),
          category: transactionCategory,
        })
      }
    }
    return parsedRecentTransactionTemp
  }

  // Fetch Transactions
  async function fetchNewTransactions(duration) {
    try {
      const fetchNewTransactionsRequest = await api(
        "transactions/past/" + duration
      )
      setCachedTransactions({
        duration,
        data: fetchNewTransactionsRequest.data,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const DEFAULT_BAR_CHART_DATA = {
    labels: parsedRecentTransactions.map((data) => data.day),
    datasets: [
      {
        label: "Days",
        data: parsedRecentTransactions.map((data) => data.amount),
        ...CHART_STYLES,
      },
    ],
  }

  const parsedRecentTransactionsByCategory =
    parseTransactionByCategory(recentTransactions)
  const DEFAULT_PIE_CHART_DATA = {
    labels: parsedRecentTransactionsByCategory.map((data) => data.category),
    datasets: [
      {
        label: "Category",
        data: parsedRecentTransactionsByCategory.map((data) => data.amount),
        ...CHART_STYLES,
      },
    ],
  }

  const [cachedTransactions, setCachedTransactions] = useState({
    duration: 7,
    data: recentTransactions,
  })

  // BarChart States
  const [barChartIsBusy, setBarChartIsBusy] = useState(false)
  const [barChartData, setBarChartData] = useState(DEFAULT_BAR_CHART_DATA)
  const [barChartDuration, setBarChartDuration] = useState(7)
  const [barChartSort, setBarChartSort] = useState("day")

  // PieChart States
  const [pieChartIsBusy, setPieChartIsBusy] = useState(false)
  const [pieChartData, setPieChartData] = useState(DEFAULT_PIE_CHART_DATA)
  const [pieChartDuration, setPieChartDuration] = useState(7)
  const [pieChartSort, setPieChartSort] = useState("category")

  // Generate Chart Data
  async function generateChartData(duration, sortBy, chartType) {
    // console.log(duration, sortBy, chartType)
    const parsedTransactions = []
    for (let i = 0; i < cachedTransactions.data.length; i++) {
      let transaction = cachedTransactions.data[i]
      // Break Loop
      if (
        new Date(transaction.created_at) < new Date(dayCalculator(duration))
      ) {
        break
      }

      if (
        new Date(transaction.created_at) < new Date(dayCalculator(duration))
      ) {
        break
      }

      let parsedTransactionsElement =
        sortBy === "day"
          ? [
              new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                new Date(transaction.created_at)
              ),
              new Date(transaction.created_at).toLocaleDateString(),
            ]
          : getPaymentCategory(transaction.category, paymentCategories)

      let transactionIndex = existsInArr(
        sortBy,
        parsedTransactionsElement,
        parsedTransactions
      )

      if (transactionIndex > -1) {
        parsedTransactions[transactionIndex].amount += parseFloat(
          transaction.amount
        )
      } else {
        parsedTransactions.push({
          amount: parseFloat(transaction.amount),
          [sortBy]: parsedTransactionsElement,
        })
      }
    }

    if (chartType === "bar") {
      setBarChartData({
        labels: parsedTransactions.map((data) => {
          let output = data[barChartSort]
          try {
            output = JSON.parse(data[barChartSort])
          } catch (err) {}
          return output
        }),
        datasets: [
          {
            label: "Days",
            data: parsedTransactions.map((data) => data.amount),
            ...CHART_STYLES,
          },
        ],
      })
    } else if (chartType === "pie") {
      setPieChartData({
        labels: parsedTransactions.map((data) => {
          let output = data[pieChartSort]
          try {
            output = JSON.parse(data[pieChartSort])
          } catch (err) {}
          return output
        }),
        datasets: [
          {
            label: "Days",
            data: parsedTransactions.map((data) => data.amount),
            ...CHART_STYLES,
          },
        ],
      })
    }
  }

  // BarChart Duration Change
  useEffect(() => {
    setBarChartIsBusy(true)
    async function handleBarChartDurationChange() {
      if (Number(barChartDuration) > Number(cachedTransactions.duration)) {
        await fetchNewTransactions(barChartDuration)
      } else {
        generateChartData(barChartDuration, barChartSort, "bar")
      }
      setBarChartIsBusy(false)
    }
    handleBarChartDurationChange()
  }, [barChartDuration, barChartSort])

  // PieChart Duration Change
  useEffect(() => {
    console.log(cachedTransactions.duration)
    setPieChartIsBusy(true)
    async function handlePieChartDurationChange() {
      if (Number(pieChartDuration) > Number(cachedTransactions.duration)) {
        await fetchNewTransactions(pieChartDuration)
      } else {
        generateChartData(pieChartDuration, pieChartSort, "pie")
      }
      setPieChartIsBusy(false)
    }
    handlePieChartDurationChange()
  }, [pieChartDuration, pieChartSort])

  // Cached Transactions Change
  useEffect(() => {
    generateChartData(barChartDuration, barChartSort, "bar")
    generateChartData(pieChartDuration, pieChartSort, "pie")
  }, [cachedTransactions])

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
                  }}>
                  <option value="category">Categories</option>
                  <option value="day">Days</option>
                </select>
              </div>
            </div>

            {/* Render */}
            <div className="col p-2 flat-card-style">
              {barChartIsBusy ? (
                <span className="p-5">{retrievingPlaceholder}</span>
              ) : (
                <RenderChart type="bar" data={barChartData} />
              )}
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
                  }}>
                  <option value="category">Categories</option>
                  <option value="day">Days</option>
                </select>
              </div>
            </div>

            {/* Render */}
            <div className="p-3 flat-card-style">
              {pieChartIsBusy ? (
                <span className="p-5">{retrievingPlaceholder}</span>
              ) : (
                <RenderChart type="pie" data={pieChartData} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="col col-8 mt-3 mx-2 py-2">
        <div className="row">
          {/* Header */}
          <div className="col col-10">
            <SectionHeader text={"Transactions History"} />
          </div>
          <div className="col">
            {/* Filter Switch */}
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
                onChange={(e) => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="transactions-history" className="container-fluid mt-3 mb-5">
        <div className="row g-3">
          <div className="col">
            <div className="p-3 flat-card-style">
              <TransactionsHistory duration="all" />
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
