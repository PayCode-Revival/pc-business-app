import React, { useState, useEffect, useContext } from "react"
import { FlatCard } from "../FlatCard/FlatCard"
import { SectionHeader } from "../SectionHeader/SectionHeader"
import "./Main.css"
import RenderChart from "../RenderChart/RenderChart"
import {
  currency,
  retrievingPlaceholder,
  CHART_STYLES,
  WEEKDAYS,
} from "./../../statics/allFunctions"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import TransactionsHistory from "../../routes/Reports/Summaries/TransactionsHistory/TransactionsHistory"

export default function Main({}) {
  const {
    walletBalance,
    savedBankAccounts,
    parsedRecentTransactions,
    userAccounts,
    monthTransactions,
  } = useContext(ApiDataContext)

  const totalTransVal = parsedRecentTransactions.length
    ? parsedRecentTransactions[0].amount
    : 0

  // This Month's Incoming Transactions Calculation
  let monthTotal
  if (monthTransactions) {
    monthTotal = 0
    for (let i = 0; i < monthTransactions.length; i++) {
      monthTotal += parseFloat(monthTransactions[i].amount)
    }
    monthTotal = currency(monthTotal)
  } else {
    monthTotal = retrievingPlaceholder
  }

  const chartData = {
    labels: parsedRecentTransactions.map((data, index) => data.day),
    datasets: [
      {
        label: "Day",
        data: parsedRecentTransactions.map((data) => data.amount),
        ...CHART_STYLES,
      },
    ],
  }

  return (
    <div
      className="fadeIn p-3 m-1 d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar container-fluid"
      id="main">
      {/* Quick Summary */}
      <div id="quick-summary" className="container-fluid">
        <SectionHeader text={"Quick Summary"} />
        <div className="row g-1 flex-nowrap overflow-auto scrollbar">
          {/* Saved Accounts */}
          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="account_balance"
                title="Saved Accounts"
                text={
                  savedBankAccounts
                    ? savedBankAccounts.length
                    : retrievingPlaceholder
                }
              />
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="wallet"
                title="Wallet Balance"
                text={walletBalance}
              />
            </div>
          </div>

          {/* Today's Transactions */}
          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="calendar_today"
                title="Today's Transactions"
                text={currency(totalTransVal)}
              />
            </div>
          </div>

          {/* This Month's Transactions */}
          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="calendar_today"
                title={`Total Transactions - ${new Intl.DateTimeFormat(
                  "en-us",
                  { month: "long" }
                ).format(new Date())}`}
                text={monthTotal ? monthTotal : 0}
              />
            </div>
          </div>

          {/* Saved Users */}
          <div className="col">
            <div className="p-3">
              <FlatCard
                iconName="persons"
                title="Users"
                text={
                  userAccounts ? userAccounts.length : retrievingPlaceholder
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Analytics */}
      <div id="charts-analytics" className="container-fluid mt-3">
        <SectionHeader text={"Charts Analytics"} />
        <div className="row g-3 pb-3 mt-1 flex-nowrap overflow-auto scrollbar">
          <div className="col col-8 ">
            <div className="p-3 flat-card-style">
              <RenderChart type="bar" data={chartData} />
            </div>
          </div>

          <div className="col col-4">
            <div className="p-3 flat-card-style">
              <RenderChart type="pie" data={chartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div id="transactions-history" className="container-fluid mt-3 mb-5">
        <SectionHeader text={"Most Recent Transactions"} />
        <div className="row g-3 mt-1">
          <div className="col col-6">
            <div className="p-3 flat-card-style">
              <TransactionsHistory duration="recent" />
            </div>
          </div>

          <div className="col col-6">
            <div className="p-3 flat-card-style h-100">Help Tips</div>
          </div>
        </div>
      </div>
    </div>
  )
}
