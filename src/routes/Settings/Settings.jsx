import React, { useEffect, useState } from "react"
import TitleBar from "../../components/TitleBar/TitleBar"
import Header from "../../components/Header/Header"
import "./Settings.css"
import SidebarAlt from "../../components/SidebarAlt/SidebarAlt"
import { Icon } from "@mui/material"
import { SectionHeader } from "../../components/SectionHeader/SectionHeader"
import { generateRandomNumber } from "../../statics/allFunctions"

export default function Settings() {
  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)

  // #################################################### API Functions Start ####################################################

  // #################################################### API Functions End ####################################################

  return (
    <>
      {/* Title Bar */}
      <TitleBar />
      {/* Header */}
      <Header sideBarToggleFunc={toggleSideBar} currentState={sidebar} />
      {/* Contents */}
      <div
        id="settings"
        className={`d-flex flex-grow-1 h-100 overflow-auto scrollbar `}>
        <SidebarAlt currentState={sidebar} openedNavItem={"Settings"} />
        <div
          id="accounts-contents"
          className={`fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar`}>
          <div className="container-fluid h-100 overflow-auto scrollbar">
            <span className="p-3 mt-2">
              <SectionHeader text={"Settings"} />
            </span>
            <div className="p-3 d-flex align-items-center m-5 flat-card-style zoomIn btn text custom-hover">
              <Icon>pin</Icon>
              <span className="ms-3 fs-6">Change Transaction Pin</span>
            </div>
            <div className="p-3 d-flex align-items-center m-5 flat-card-style zoomIn btn text custom-hover">
              <Icon>multiple_stop</Icon>
              <span className="ms-3 fs-6">Transactions Limits</span>
            </div>
            <div className="p-3 d-flex align-items-center m-5 flat-card-style zoomIn btn text custom-hover">
              <Icon>privacy_tip</Icon>
              <span className="ms-3 fs-6">Privacy Mode</span>
            </div>
            <div className="p-3 d-flex align-items-center m-5 flat-card-style zoomIn btn text custom-hover">
              <Icon>brightness_6</Icon>
              <span className="ms-3 fs-6">App Theme</span>
            </div>
            <div className="p-3 d-flex align-items-center m-5 flat-card-style zoomIn btn text custom-hover">
              <Icon>brightness_6</Icon>
              <span className="ms-3 fs-6">Logout</span>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-center text custom-hover">
              <span>App Version (0.0.1)</span>
              <span>
                Update Available Latest Version (
                {`${generateRandomNumber(1, 5)}.${generateRandomNumber(
                  1,
                  5
                )}.${generateRandomNumber(1, 5)}`}
                )
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
