// Components
import React from "react"
import { Icon } from "@mui/material"
import { greeting } from "../../statics/allFunctions"
import { faker } from "@faker-js/faker"

// CSS
import "./Header.css"

export default function Header({ sideBarToggleFunc, currentState }) {
  const name = faker.name.findName()
  const firstName = name.split(" ")[0]
  return (
    <div id="header" className="container-fluid user-select-none">
      <div className="row g-3 ">
        {/* Hamburger & Greeting */}
        <div
          id="hamburger-greeting"
          className="col col-4 d-flex align-items-center p-2">
          <div
            id="hamburger-menu"
            className="d-flex"
            role={"button"}
            onClick={sideBarToggleFunc}>
            <Icon
              sx={{ color: "var(--primary-color)" }}
              style={{ fontSize: 48 }}>
              {!currentState ? "menu" : "close"}
            </Icon>
          </div>

          {/* Greeting */}
          <div id="header-greeting" className="d-flex align-items-center ms-5">
            <Icon
              sx={{ color: "var(--primary-color)" }}
              style={{ fontSize: 30 }}>
              wb_sunny
            </Icon>

            <span id="greeting-text text-nowrap" className="fw-bolder ms-2">
              {greeting()}, {firstName}
            </span>
          </div>
        </div>

        {/* Search */}
        <div
          id="header-search"
          className="col col-4 d-flex justify-content-center align-items-center p-1">
          <Icon style={{ fontSize: 30 }}>search</Icon>
          <input
            id="header-search-input"
            className="rounded p-2"
            placeholder="Search Anything..."
          />
        </div>

        {/* Logged In User */}
        <div
          id="logged-in-user"
          className="col d-flex justify-content-end align-items-center p-1 me-4"
          role={"button"}>
          <img
            src="https://picsum.photos/200"
            alt=""
            className="rounded-circle"
            id="logged-in-user-img"
          />
          <div id="logged-in-user-name" className="d-flex flex-column ms-3">
            <span id="logged-in-user-name-text" className="fw-bold">
              {name}
            </span>

            <span id="business-role" className="fw-bold text-muted">
              <u style={{ textUnderlineOffset: "0.25em" }}>Head Usher</u>
              <span className="badge bg-primary ms-1">ADMIN</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
