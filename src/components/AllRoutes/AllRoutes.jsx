import React, { useState, useEffect, useRef } from "react"
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
  currency,
  WEEKDAYS,
  existsInArr,
} from "./../../statics/allFunctions"
import Settings from "../../routes/Settings/Settings"
import Help from "../../routes/Help/Help"
import Login from "../../routes/Login/Login"
import { api, getSavedBearerToken } from "../../statics/api"
import { useNavigate } from "react-router-dom"
import Register from "../../routes/Register/Register"
import QR from "../../routes/QR/QR"

export const AllRoutes = () => {
  const location = useLocation()
  const [isBusy, setIsBusy] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [businessInfo, setBusinessInfo] = useState({})
  const [walletBalance, setWalletBalance] = useState(retrievingPlaceholder)
  const [recentTransactions, setRecentTransactions] = useState([])
  const [parsedRecentTransactions, setParsedRecentTransactions] = useState([])
  const [monthTransactions, setMonthTransactions] = useState([])
  const [savedBankAccounts, setSavedBankAccounts] = useState([])
  const [userAccounts, setUserAccounts] = useState([])
  const [paymentCategories, setPaymentCategories] = useState([])
  const [transactionStatuses, setTransactionStatuses] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState({})
  const [allTransactions, setAllTransactions] = useState([])
  const navigate = useNavigate()

  const updateWalletBalance = (value) => {
    setWalletBalance(currency(value))
  }

  // API Call For Logged In User Information
  async function getLoggedInUserInfo() {
    try {
      const loggedInUserInfo = await (await api("business/users/current")).data
      setLoggedInUser(loggedInUserInfo)
      return true
    } catch (err) {
      return false
    }
  }

  // API Call For Business Info
  async function getBusinessInfo() {
    const businessInfo = await (await api("business/view")).data
    setBusinessInfo(businessInfo)
    updateWalletBalance(businessInfo.wallet_balance)
  }

  // API Call For Recent Transactions - Past 7 Days
  async function getRecentTransactions() {
    try {
      const recentTransactionsRequest = await (
        await api("transactions/past/7")
      ).data

      // Parsed Recent Transactions
      const parsedRecentTransactionTemp = []
      for (let i = 0; i < recentTransactionsRequest.length; i++) {
        let dayIndex = existsInArr(
          "day",
          WEEKDAYS[new Date(recentTransactionsRequest[i].created_at).getDay()],
          parsedRecentTransactionTemp
        )
        if (dayIndex > -1) {
          parsedRecentTransactionTemp[dayIndex].amount += parseFloat(
            recentTransactionsRequest[i].amount
          )
        } else {
          parsedRecentTransactionTemp.push({
            amount: parseFloat(recentTransactionsRequest[i].amount),
            day: WEEKDAYS[
              new Date(recentTransactionsRequest[i].created_at).getDay()
            ],
          })
        }
      }
      setRecentTransactions(recentTransactionsRequest)
      setParsedRecentTransactions(parsedRecentTransactionTemp)
    } catch (err) {}
  }

  // API Call For Transactions Made This Month
  async function getMonthTransactions() {
    const monthTransactions = await (
      await api("transactions/month/current")
    ).data
    setMonthTransactions(monthTransactions)
  }

  // API Cal For Saved Bank Accounts
  async function getSavedBankAccounts() {
    const savedBankAccounts = await (
      await api("business/bank-accounts/all")
    ).data
    setSavedBankAccounts(savedBankAccounts)
  }

  // API Cal For User Accounts
  async function getUserAccounts() {
    const userAccounts = await (await api("business/users/all")).data
    setUserAccounts(userAccounts)
  }

  // API Call For Payment Categories
  async function getPaymentCategories() {
    const paymentCategories = await (
      await api("business/payment-categories/all")
    ).data
    setPaymentCategories(paymentCategories)
  }

  // API Call For Transaction Statuses
  async function getTransactionStatuses() {
    const transactionStatuses = await (
      await api("business/payment-status/all")
    ).data
    setTransactionStatuses(transactionStatuses)
  }

  // API Call For All Transactions
  async function getAllTransactions() {
    const allTransactions = await (await api("transactions/all")).data
    setAllTransactions(allTransactions)
  }

  // Check Login Status
  async function checkLoginStatus() {
    if (getSavedBearerToken() && (await getLoggedInUserInfo())) {
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
    setIsBusy(false)
  }, [])

  if (!isBusy) {
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
            parsedRecentTransactions,
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
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<App />} />
              <Route path="wallet/:action" element={<Wallet />} />
              <Route path="accounts/:action" element={<Accounts />} />
              <Route path="payments/:action" element={<Payments />} />
              <Route path="reports/:action" element={<Reports />} />
              <Route path="users/:action" element={<Users />} />
              <Route path="qr-code/" element={<QR />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              {/* <Route path="/test" element={<Modal />} /> */}
            </Routes>
          </UserFormContext.Provider>
        </ApiDataContext.Provider>
      </>
    )
  } else {
    return (
      <div className="d-flex border border-danger align-items-center justify-content-center flex-grow-1">
        {retrievingPlaceholder}
      </div>
    )
  }
}
