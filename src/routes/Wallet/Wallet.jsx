import React, { useState } from "react"
import { useParams } from "react-router-dom"
import TitleBar from "../../components/TitleBar/TitleBar"
import Header from "../../components/Header/Header"
import SidebarAlt from "../../components/SidebarAlt/SidebarAlt"
import "./../../assets/css/styles-dark-mode.css"
import "./Wallet.css"
import TopUp from "./TopUp/TopUp"
import Withdraw from "./Withdraw/Withdraw"
import Transfer from "./Transfer/Transfer"

export default function Wallet() {
  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)
  const { action } = useParams()

  const page = useState()

  return (
    <>
      {/* Title Bar */}
      <TitleBar />
      {/* Header */}
      <Header sideBarToggleFunc={toggleSideBar} currentState={sidebar} />
      {/* Contents */}
      <div
        id="wallet"
        className={`d-flex flex-grow-1 h-100 overflow-auto scrollbar`}>
        <SidebarAlt currentState={sidebar} openedNavItem={"Wallet"} />
        <div
          id="wallet-contents"
          className={`fadeIn p-3 m-1 d-flex flex-column flex-grow-1`}>
          {action === "Top Up" && <TopUp />}
          {action === "Withdraw" && <Withdraw />}
          {action === "Transfer" && <Transfer />}
        </div>
      </div>
    </>
  )
}
