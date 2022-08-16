import React, { useEffect, useState } from "react"
import "./assets/css/styles-dark-mode.css"
import TitleBar from "./components/TitleBar/TitleBar"
import Header from "./components/Header/Header"
import "./App.css"
import SidebarAlt from "./components/SidebarAlt/SidebarAlt"
import Main from "./components/Main/Main"
import isElectron from "is-electron"

export default function App() {
  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)

  return (
    <>
      {/* Title Bar */}
      {isElectron() && <TitleBar />}

      {/* Header */}
      <Header sideBarToggleFunc={toggleSideBar} currentState={sidebar} />

      {/* Contents */}
      <div id="app" className="d-flex justify-content-between overflow-hidden">
        <SidebarAlt currentState={sidebar} />
        <Main />
      </div>
    </>
  )
}
