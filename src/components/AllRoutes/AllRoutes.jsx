import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Wallet from "../../routes/Wallet/Wallet"
import App from "../../App"
import Accounts from "../../routes/Accounts/Accounts"
import Payments from "../../routes/Payments/Payments"
import Reports from "../../routes/Reports/Reports"
import Users from "../../routes/Users/Users"
export const AllRoutes = () => {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<App />} />
      <Route path="dashboard" element={<App />} />
      <Route path="wallet/:action" element={<Wallet />} />
      <Route path="accounts/:action" element={<Accounts />} />
      <Route path="payments/:action" element={<Payments />} />
      <Route path="reports/:action" element={<Reports />} />
      <Route path="users/:action" element={<Users />} />
    </Routes>
  )
}
