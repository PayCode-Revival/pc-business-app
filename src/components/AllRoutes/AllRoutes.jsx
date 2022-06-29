import React, { createContext, useState, useEffect, useRef } from "react"
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
import Login from "../../routes/Login/Login"
import { api, bearerToken } from "../../statics/api"
import { useNavigate } from "react-router-dom"

export const AllRoutes = () => {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(false)
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
  const navigate = useNavigate()

  // console.log(bearerToken)
  // localStorage.clear()

  const updateWalletBalance = (value) => {
    setWalletBalance(currency(value))
  }

  // API Call For Logged In User Information
  async function getLoggedInUserInfo() {
    try {
      const loggedInUserInfo = await api.get("business/users/current")
      setLoggedInUser(loggedInUserInfo.data)
      return true
    } catch (err) {
      return false
    }
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

  // Check Login Status
  async function checkLoginStatus() {
    if (bearerToken && (await getLoggedInUserInfo())) {
      return true
    } else {
      return false
    }
  }

  function executeAll() {
    getLoggedInUserInfo()
    getBusinessInfo()
    getSavedBankAccounts()
    getRecentTransactions()
    getUserAccounts()
    getMonthTransactions()
    getPaymentCategories()
    getTransactionStatuses()
    getAllTransactions()
  }

  useEffect(() => {
    checkLoginStatus().then((res) => {
      if (res) {
        executeAll()
        navigate("/dashboard")
      } else {
        navigate("/login")
      }
    })
  }, [])

  return (
    <>
      <ApiDataContext.Provider
        value={{
          // Data
          loggedIn,
          setLoggedIn,
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
          executeAll,
          checkLoginStatus,
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
    </>
  )
}
