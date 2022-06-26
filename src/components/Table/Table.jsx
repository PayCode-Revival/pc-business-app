import React, { useState } from "react"
import DataTable, { createTheme } from "react-data-table-component"

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

export default function TransactionsHistory({ data = [] }) {
  data = data.map((transaction) => {
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

  return recentTransactions ? (
    <DataTable
      columns={tableColumns}
      data={data}
      direction="auto"
      subHeaderAlign="center"
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
