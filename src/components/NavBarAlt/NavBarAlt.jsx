import React, { useState } from "react"
import { Icon } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

// CSS
import "./NavBarAlt.css"

// Data
import { navbarSchema } from "../../statics/navbarSchema"

export default function NavBarAlt({
  openedNavItem = "Dashboard",
  activeNavItem = "",
}) {
  const navigate = useNavigate()
  // Active NavBar Item
  const [activeNav, setActiveNav] = useState(openedNavItem)
  const changeActiveNav = (navItem) => {
    changeOpenedNavItem(navItem)

    if (currentOpenedNavItem === navItem) {
      changeOpenedNavItem("")
    }
  }

  // Opened NavBar Item
  const [currentOpenedNavItem, setCurrentOpenedNavItem] =
    useState(openedNavItem)
  const changeOpenedNavItem = (navItem) => setCurrentOpenedNavItem(navItem)

  return (
    <div
      id="navbar-container"
      className="my-3 d-flex flex-column justify-content-between scrollbar p-2 h-100">
      {navbarSchema.map((navItem) => {
        return (
          <span key={navItem.title}>
            {/* NavBar Item */}
            <span
              className={`${
                navItem.title === activeNav && "active"
              } btn navbar-item d-flex justify-content-between align-items-center w-100 p-2 nav-item-container m-1 mb-2`}
              onClick={() => {
                changeActiveNav(navItem.title)
                if (!navItem.children) {
                  setActiveNav(navItem.title)
                  navigate(
                    `/${navItem.title.replaceAll(" ", "-").toLowerCase()}`,
                    { replace: true }
                  )
                }
              }}>
              <span className="d-flex align-items-center">
                {/* Icon */}
                <Icon>{navItem.iconName}</Icon>

                {/* Title */}
                <span className="ms-1 nav-item-title">{navItem.title}</span>
              </span>

              {/* Dropdown */}
              {navItem.children && (
                <span>
                  {
                    <Icon>
                      {navItem.title !== currentOpenedNavItem
                        ? "keyboard_arrow_down"
                        : "keyboard_arrow_up"}
                    </Icon>
                  }
                </span>
              )}
            </span>

            {/* Sub Menu */}
            <div
              className={`d-flex flex-column ${
                navItem.title !== currentOpenedNavItem
                  ? "nav-item-collapsed"
                  : "nav-item-visible"
              }`}>
              {navItem.children &&
                navItem.children.map((subMenuItem, index) => {
                  return (
                    <span
                      key={index}
                      className={`sub-menu ms-5 p-2 m-2 text-nowrap`}
                      role={"button"}
                      onClick={() => setActiveNav(navItem.title)}>
                      <Link
                        to={`/${navItem.title.toLowerCase()}/${
                          subMenuItem.title
                        }`}>
                        {subMenuItem.title}
                      </Link>
                    </span>
                  )
                })}
            </div>
          </span>
        )
      })}
    </div>
  )
}
