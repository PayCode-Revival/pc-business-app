import React, { useEffect, useState } from "react"
import TitleBar from "../../components/TitleBar/TitleBar"
import Header from "../../components/Header/Header"
import "./Help.css"
import SidebarAlt from "../../components/SidebarAlt/SidebarAlt"
import { Icon } from "@mui/material"
import { SectionHeader } from "../../components/SectionHeader/SectionHeader"
import { generateRandomNumber } from "../../statics/allFunctions"

export default function Help() {
  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)
  const tickets = null
  const time = {
    abbreviation: "WAT",
    client_ip: "41.73.1.72",
    datetime: "2022-06-18T19:16:20.037095+01:00",
    day_of_week: 6,
    day_of_year: 169,
    dst: false,
    dst_from: null,
    dst_offset: 0,
    dst_until: null,
    raw_offset: 3600,
    timezone: "Africa/Lagos",
    unixtime: 1655576180,
    utc_datetime: "2022-06-18T18:16:20.037095+00:00",
    utc_offset: "+01:00",
    week_number: 24,
  }
  return (
    <>
      {/* Title Bar */}
      <TitleBar />
      {/* Header */}
      <Header sideBarToggleFunc={toggleSideBar} currentState={sidebar} />
      {/* Contents */}
      <div
        id="help"
        className={`d-flex flex-grow-1 h-100 overflow-auto scrollbar `}>
        <SidebarAlt currentState={sidebar} openedNavItem={"Help"} />
        <div
          id="accounts-contents"
          className={`fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar`}>
          <div className="container-fluid h-100 overflow-auto scrollbar">
            <span className="p-3 mt-2">
              <SectionHeader text={"Tickets & Feedback"} />

              {/* Tab Headers */}
              <ul
                className="nav nav-pills nav-fill mb-3 mt-3"
                id="ex1"
                role="tablist">
                {/* All Tickets */}
                <li
                  className="nav-item flat-card-style mx-3"
                  role="presentation">
                  <a
                    className="nav-link active fs-6 nav-item-custom active  zoomIn"
                    id="ex2-tab-1"
                    data-mdb-toggle="pill"
                    href="#ex2-pills-1"
                    role="tab"
                    aria-controls="ex2-pills-1"
                    aria-selected="true">
                    All Tickets
                  </a>
                </li>

                {/* Open New Ticket */}
                <li
                  className="nav-item flat-card-style mx-3"
                  role="presentation">
                  <a
                    className="nav-link fs-6 nav-item-custom zoomIn"
                    id="ex2-tab-2"
                    data-mdb-toggle="pill"
                    href="#ex2-pills-2"
                    role="tab"
                    aria-controls="ex2-pills-2"
                    aria-selected="false">
                    Open New Ticket
                  </a>
                </li>

                {/* Feedbacks & Bug Reports */}
                <li
                  className="nav-item flat-card-style mx-3"
                  role="presentation">
                  <a
                    className="nav-link fs-6 nav-item-custom zoomIn"
                    id="ex2-tab-3"
                    data-mdb-toggle="pill"
                    href="#ex2-pills-3"
                    role="tab"
                    aria-controls="ex2-pills-3"
                    aria-selected="false">
                    Feedback & Bug Reports
                  </a>
                </li>
              </ul>

              {/* Tab Contents */}
              <div className="tab-content" id="ex2-content">
                {/* All Tickets */}
                <div
                  className="tab-pane fade show active fadeIn p-3 zoomIn mx-5 pills-custom"
                  id="ex2-pills-1"
                  role="tabpanel"
                  aria-labelledby="ex2-tab-1">
                  {!tickets && (
                    <span className="display-6 text-danger fw-bolder d-flex justify-content-center align-items-center p-5">
                      <Icon className={`me-2`} style={{ fontSize: "2vw" }}>
                        error
                      </Icon>
                      <span style={{ fontSize: "1.75vw" }}>
                        No Tickets To Display
                      </span>
                    </span>
                  )}
                </div>

                {/* Open New Ticket */}
                <div
                  className="tab-pane fade fadeIn p-3 zoomIn mx-5 pills-custom"
                  id="ex2-pills-2"
                  role="tabpanel"
                  aria-labelledby="ex2-tab-2">
                  Tab 2 content
                </div>

                {/* Feedbacks & Bug Reports */}
                <div
                  className="tab-pane fade fadeIn p-3 zoomIn mx-5 pills-custom"
                  id="ex2-pills-3"
                  role="tabpanel"
                  aria-labelledby="ex2-tab-3">
                  Tab 3 content
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
