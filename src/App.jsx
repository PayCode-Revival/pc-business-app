import React, { useEffect, useState } from "react"
import "./assets/css/styles-dark-mode.css"
import TitleBar from "./components/TitleBar/TitleBar"
import Header from "./components/Header/Header"
import "./App.css"
import SidebarAlt from "./components/SidebarAlt/SidebarAlt"
import Main from "./components/Main/Main"
import { useNavigate } from "react-router-dom"

export default function App() {
  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)
  const navigate = useNavigate()

  navigate("/login")

  return (
    <>
      {/* Title Bar */}
      <TitleBar />

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
