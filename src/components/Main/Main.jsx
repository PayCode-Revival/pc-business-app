import React, { useState, useEffect, useContext } from "react"
import { FlatCard } from "../FlatCard/FlatCard"
import { SectionHeader } from "../SectionHeader/SectionHeader"
import "./Main.css"
import { RenderChart } from "./../../statics/chartData"
import { currency, retrievingPlaceholder } from "./../../statics/allFunctions"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import TransactionsHistory from "../TransactionsHistory/TransactionsHistory"

const Main = ({}) => {
  // ######################################## UseEffects Start ########################################

  // ######################################## UseEffects End ########################################

  const {
    walletBalance,
    savedBankAccounts,
    recentTransactions,
    userAccounts,
    monthTransactions,
  } = useContext(ApiDataContext)

  // Today's Incoming Transactions Calculation
  let totalTransVal
  if (recentTransactions) {
    let i = 0
    totalTransVal = 0
    while (
      new Date().toLocaleDateString() ===
      new Date(recentTransactions[i].created_at).toLocaleDateString()
    ) {
      totalTransVal += parseFloat(recentTransactions[i].amount)
      i++
    }
    totalTransVal = currency(totalTransVal)
  } else {
    totalTransVal = retrievingPlaceholder
  }

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
                text={totalTransVal ? totalTransVal : 0}
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
              <RenderChart type="bar" />
            </div>
          </div>

          <div className="col col-4">
            <div className="p-3 flat-card-style">
              <RenderChart type="pie" />
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
              <TransactionsHistory />
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

export default Main
