import React, { useState, useTransition } from "react"
import "./Sidebar.css"
import { Icon } from "@mui/material"
import Navbar from "../Navbar/Navbar"

const Sidebar = () => {
  const [sideNav, setSideNav] = useState(
    <Navbar active={"Dashboard"} switchFunc={switchActiveNav} />
  )

  function switchActiveNav(title, expand = false) {
    setSideNav(
      <Navbar active={title} switchFunc={switchActiveNav} expand={expand} />
    )
  }

  return (
    <div className="col col-3 vh-100" id="sidebar">
      <div className="d-flex flex-column h-100 p-2 justify-content-between">
        {/* Header */}
        <div
          className="d-flex justify-content-center align-items-center m-3 p-2"
          id="identity">
          <span className="me-2" style={{ fontSize: "150%" }}>
            PayCode Business
          </span>
          <Icon>close_fullscreen</Icon>
          <hr style={{ height: "0.2em", color: "white" }} />
        </div>

        {/* Navigation */}
        {sideNav}

        {/* Logged In User */}
        <div className="border rounded-top mt-5 d-flex justify-content-center align-items-center p-1">
          <Icon className="" style={{ fontSize: 20 }} sx={{ color: "#7C8DB5" }}>
            person
          </Icon>
          <span className="ms-2">Logged In As: (Administrator)</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
