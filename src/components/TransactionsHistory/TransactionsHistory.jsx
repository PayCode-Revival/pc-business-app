import React, { useContext, useState, useEffect } from "react"
import DataTable, { createTheme } from "react-data-table-component"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import {
  currency,
  localeStringHelper,
  retrievingPlaceholder,
  getTransactionStatusName,
  capitalizeFirstLetter,
  getPaymentCategory,
} from "../../statics/allFunctions"

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

export default function TransactionsHistory({
  duration = "recent",
  tableColumns = [
    { name: "Amount", selector: (row) => row.amount, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
  ],
  data = [],
}) {
  const { recentTransactions, paymentCategories, transactionStatuses } =
    useContext(ApiDataContext)
  let tableData = data.length ? data : []

  if (recentTransactions && paymentCategories && transactionStatuses) {
    tableData = recentTransactions.map((transaction) => {
      return {
        amount: currency(transaction.amount),
        date: localeStringHelper(transaction.created_at),
        status: capitalizeFirstLetter(
          getTransactionStatusName(transaction.status, transactionStatuses)
        ),
        category: capitalizeFirstLetter(
          getPaymentCategory(transaction.category, paymentCategories)
        ),
      }
    })
  }

  return recentTransactions ? (
    <DataTable
      columns={tableColumns}
      data={tableData}
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
  ) : (
    <span className="d-flex justify-content-center p-5 align-items-center fw-bolder">
      {retrievingPlaceholder}
    </span>
  )
}
