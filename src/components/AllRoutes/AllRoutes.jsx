import React, { createContext, useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Wallet from "../../routes/Wallet/Wallet"
import App from "../../App"
import Accounts from "../../routes/Accounts/Accounts"
import Payments from "../../routes/Payments/Payments"
import Reports from "../../routes/Reports/Reports"
import Users from "../../routes/Users/Users"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import { UserFormContext } from "../../contexts/UsersFormContext"
import {
  retrievingPlaceholder,
  makeApiRequest,
  currency,
} from "./../../statics/allFunctions"
import Settings from "../../routes/Settings/Settings"
import Help from "../../routes/Help/Help"
import Modal from "../Modal/Modal"
import Login from "../../routes/Login/Login"

export const AllRoutes = () => {
  const location = useLocation()

  const [businessInfo, setBusinessInfo] = useState({})
  const [walletBalance, setWalletBalance] = useState(retrievingPlaceholder)
  const [recentTransactions, setRecentTransactions] = useState(null)
  const [monthTransactions, setMonthTransactions] = useState(null)
  const [savedBankAccounts, setSavedBankAccounts] = useState(null)
  const [userAccounts, setUserAccounts] = useState(null)
  const [paymentCategories, setPaymentCategories] = useState(null)
  const [transactionStatuses, setTransactionStatuses] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [allTransactions, setAllTransactions] = useState(null)

  const updateWalletBalance = (value) => {
    setWalletBalance(currency(value))
  }

  // API Call For Logged In User Information
  async function getLoggedInUserInfo() {
    const loggedInUserInfo = await makeApiRequest(
      "business/users/current",
      "get"
    )
    setLoggedInUser(loggedInUserInfo)
  }

  // API Call For Business Info
  async function getBusinessInfo() {
    const businessInfo = await makeApiRequest("business/view", "get")
    setBusinessInfo(businessInfo)
    updateWalletBalance(businessInfo.wallet_balance)
  }

  // API Call For Transactions Made In The Past 7 Days
  async function getRecentTransactions() {
    const recentTransactions = await makeApiRequest(
      "transactions/some/7",
      "get"
    )
    setRecentTransactions(recentTransactions)
  }

  // API Call For Transactions Made This Month
  async function getMonthTransactions() {
    const monthTransactions = await makeApiRequest(
      "transactions/month/current",
      "get"
    )
    setMonthTransactions(monthTransactions)
  }

  // API Cal For Saved Bank Accounts
  async function getSavedBankAccounts() {
    const savedBankAccounts = await makeApiRequest(
      "business/bank-accounts/all",
      "get"
    )
    setSavedBankAccounts(savedBankAccounts)
  }

  // API Cal For User Accounts
  async function getUserAccounts() {
    const userAccounts = await makeApiRequest("business/users/all", "get")
    setUserAccounts(userAccounts)
  }

  // API Call For Payment Categories
  async function getPaymentCategories() {
    const paymentCategories = await makeApiRequest(
      "business/payment-categories/all",
      "get"
    )
    setPaymentCategories(paymentCategories)
  }

  // API Call For Transaction Statuses
  async function getTransactionStatuses() {
    const transactionStatuses = await makeApiRequest(
      "business/payment-status/all",
      "get"
    )
    setTransactionStatuses(transactionStatuses)
  }

  // API Call For All Transactions
  async function getAllTransactions() {
    const allTransactions = await makeApiRequest("transactions/all", "get")
    setAllTransactions(allTransactions)
  }

  useEffect(() => {
    // Execute All ASYNC Functions
    getLoggedInUserInfo()
    getBusinessInfo()
    getSavedBankAccounts()
    getRecentTransactions()
    getUserAccounts()
    getMonthTransactions()
    getPaymentCategories()
    getTransactionStatuses()
    getAllTransactions()
  }, [])

  return (
    <ApiDataContext.Provider
      value={{
        // Data
        businessInfo,
        walletBalance,
        savedBankAccounts,
        recentTransactions,
        monthTransactions,
        userAccounts,
        paymentCategories,
        transactionStatuses,
        loggedInUser,
        allTransactions,

        // API Functions
        getLoggedInUserInfo,
        getBusinessInfo,
        getSavedBankAccounts,
        getRecentTransactions,
        getUserAccounts,
        getMonthTransactions,
        getPaymentCategories,
        getTransactionStatuses,
        getAllTransactions,
      }}>
      <UserFormContext.Provider value={{}}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<App />} />
          <Route path="wallet/:action" element={<Wallet />} />
          <Route path="accounts/:action" element={<Accounts />} />
          <Route path="payments/:action" element={<Payments />} />
          <Route path="reports/:action" element={<Reports />} />
          <Route path="users/:action" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          {/* <Route path="/test" element={<Modal />} /> */}
        </Routes>
      </UserFormContext.Provider>
    </ApiDataContext.Provider>
  )
}
