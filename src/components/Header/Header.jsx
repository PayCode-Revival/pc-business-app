// Components
import React, { useContext } from "react"
import { Icon } from "@mui/material"
import { greeting, retrievingPlaceholder } from "../../statics/allFunctions"
import { ApiDataContext } from "../../contexts/ApiDataContext"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"

// CSS
import "./Header.css"

export default function Header({ sideBarToggleFunc, currentState }) {
  const { loggedInUser, businessUserRoles } = useContext(ApiDataContext)

  const userInfo = loggedInUser ? (
    loggedInUser
  ) : (
    <FontAwesomeIcon icon={faCoffee} />
  )

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
              style={{ fontSize: "3vw" }}>
              {!currentState ? "menu" : "close"}
            </Icon>
          </div>

          {/* Greeting */}
          {loggedInUser ? (
            <div
              id="header-greeting"
              className="d-flex align-items-center ms-5 fadeIn text-nowrap">
              <Icon
                sx={{ color: "var(--primary-color)" }}
                style={{ fontSize: "2vw" }}>
                tag_faces
              </Icon>

              <span
                id="greeting-text text-nowrap"
                className="fw-bolder ms-2 fs-5">
                {greeting()}, {userInfo.first_name}
              </span>
            </div>
          ) : (
            <span className="mx-auto">{retrievingPlaceholder}</span>
          )}
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
              {loggedInUser
                ? userInfo.first_name + " " + userInfo.last_name
                : retrievingPlaceholder}
            </span>

            <span
              id="business-role"
              className=""
              style={{ color: "var(--cruise-color)" }}>
              <u
                style={{
                  textUnderlineOffset: "0.25em",
                  color: "var(--cruise-color)",
                }}>
                {userInfo.business_role}
              </u>
              <span className="badge bg-primary ms-1 text-uppercase">
                {userInfo.role}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
