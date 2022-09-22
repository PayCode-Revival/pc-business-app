import { Icon } from "@mui/material"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import Header from "../../components/Header/Header"
import { SectionHeader } from "../../components/SectionHeader/SectionHeader"
import SidebarAlt from "../../components/SidebarAlt/SidebarAlt"
import TitleBar from "../../components/TitleBar/TitleBar"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import { currency } from "../../statics/allFunctions"
import TransactionsHistory from "../Reports/Summaries/TransactionsHistory/TransactionsHistory"

export default function LiveTransactions() {
  const { recentTransactions, getRecentTransactions } =
    useContext(ApiDataContext)

  useEffect(() => {
    setInterval(() => {
      getRecentTransactions()
    }, 2000)
  }, [])

  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)

  return (
    <>
      {/* Title Bar */}
      <TitleBar />

      {/* Header */}
      <Header sideBarToggleFunc={toggleSideBar} currentState={sidebar} />

      {/* Contents */}
      <div
        id="accounts"
        className={`d-flex flex-grow-1 h-100 overflow-auto scrollbar`}>
        <SidebarAlt currentState={sidebar} openedNavItem={"Live"} />
        <div
          id="accounts-contents"
          className={`fadeIn p-3 m-1 d-flex flex-column flex-grow-1`}>
          {recentTransactions &&
            recentTransactions
              .filter((transaction, index) => index < 5)
              .map((transaction) => (
                <div className="p-3 d-flex align-items-center m-5 flat-card-style zoomIn btn text custom-hover">
                  <Icon>notifications</Icon>
                  <span className="ms-3 fs-6">
                    {currency(transaction.amount)}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </>
  )
}
