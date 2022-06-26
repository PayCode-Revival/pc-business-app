import React, { useState, useContext } from "react"
import { ApiDataContext } from "../../../../contexts/ApiDataContext"
import DataTable, { createTheme } from "react-data-table-component"
import {
  currency,
  localeStringHelper,
  capitalizeFirstLetter,
  capitalizeFirsts,
  getTransactionStatusName,
  getPaymentCategory,
} from "../../../../statics/allFunctions"

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
  filter = {},
}) {
  const {
    recentTransactions,
    allTransactions,
    paymentCategories,
    transactionStatuses,
  } = useContext(ApiDataContext)

  const dataPool = duration === "recent" ? recentTransactions : allTransactions

  // Construct Table Columns
  const columns = paymentCategories
    ? [
        {
          name: "Category",
          selector: (row) => row.category,
          sortable: true,
          conditionalCellStyles: paymentCategories
            ? paymentCategories.map((category) => {
                return {
                  when: (row) =>
                    row.category ==
                    capitalizeFirsts(
                      getPaymentCategory(
                        category.id,
                        paymentCategories
                      ).toLowerCase()
                    ),
                  style: {
                    color: category.color.toUpperCase(),
                  },
                }
              })
            : [],
        },
        {
          name: "Amount",
          selector: (row) => row.amount,
          sortable: true,
          conditionalCellStyles: [
            {
              when: (row) => row.status === "Successful",
              style: {
                color: "lightgreen",
              },
            },

            {
              when: (row) => row.status === "Failed",
              style: {
                color: "red",
              },
            },

            {
              when: (row) => row.status === "Pending",
              style: {
                color: "coral",
              },
            },

            {
              when: (row) => row.status === "Unknown",
              style: {
                color: "aqua",
              },
            },
          ],
        },
        {
          name: "Status",
          selector: (row) => row.status,
          sortable: true,
          conditionalCellStyles: [
            {
              when: (row) => row.status === "Successful",
              style: {
                color: "lightgreen",
              },
            },

            {
              when: (row) => row.status === "Failed",
              style: {
                color: "red",
              },
            },

            {
              when: (row) => row.status === "Pending",
              style: {
                color: "coral",
              },
            },

            {
              when: (row) => row.status === "Unknown",
              style: {
                color: "aqua",
              },
            },
          ],
        },
        { name: "Date", selector: (row) => row.date, sortable: true },
      ]
    : []

  function filterData(data) {
    let currentCategory

    for (let i = 0; i < data.length; i++) {
      if (filter.category !== "all") {
      }
    }

    return data
  }

  // Construct Table Data
  const data =
    dataPool && paymentCategories && transactionStatuses
      ? filterData(dataPool).map((transaction) => {
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
      : []

  return (
    <DataTable
      columns={columns}
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
  )
}
