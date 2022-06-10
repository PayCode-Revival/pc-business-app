import React, { useState } from "react"
import { useParams } from "react-router-dom"
import TitleBar from "../../components/TitleBar/TitleBar"
import Header from "../../components/Header/Header"
import SidebarAlt from "../../components/SidebarAlt/SidebarAlt"
import "./../../assets/css/styles-dark-mode.css"
import "./Reports.css"
import Summaries from "./Summaries/Summaries"
import Demographics from "./Demographics/Demographics"
import Print from "./Print/Print"

export default function Reports() {
  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)
  const { action } = useParams()

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
        <SidebarAlt currentState={sidebar} openedNavItem={"Reports"} />
        <div
          id="accounts-contents"
          className={`fadeIn p-3 m-1 d-flex flex-column flex-grow-1`}>
          {action === "Summaries" && <Summaries />}
          {action === "Demographics" && <Demographics />}
          {action === "Print" && <Print />}
        </div>
      </div>
    </>
  )
}
