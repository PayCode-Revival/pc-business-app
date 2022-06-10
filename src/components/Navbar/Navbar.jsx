import React, { useState } from "react"
import "./Navbar.css"
import { Icon, Link } from "@mui/material"
import { useSpring, animated } from "react-spring"
// import { Routes, Route, Link } from "react-router-dom";

const Navbar = ({ active, switchFunc, expand }) => {
  const navbarSchema = [
    {
      title: "Dashboard",
      iconName: "dashboard",
      isActive: true,
      hasChildren: false,
    },
    {
      title: "Wallet",
      iconName: "wallet",
      isActive: false,
      hasChildren: true,
      children: ["Top Up", "Withdraw", "Transfer"],
    },
    {
      title: "Accounts",
      iconName: "account_balance",
      isActive: false,
      hasChildren: true,
      children: ["Add", "Manage"],
    },
    {
      title: "Payments",
      iconName: "payments",
      isActive: false,
      hasChildren: true,
      children: ["Add Category", "Manage Categories"],
    },
    {
      title: "Reports",
      iconName: "pie_chart",
      isActive: false,
      hasChildren: true,
      children: ["Summary", "Generate", "Print"],
    },
    {
      title: "Users",
      iconName: "admin_panel_settings",
      isActive: false,
      hasChildren: true,
      children: ["Add", "Manage"],
    },
    {
      title: "Settings",
      iconName: "settings",
      isActive: false,
      hasChildren: true,
      children: ["Application", "Transaction", "License"],
    },
    { title: "Help", iconName: "help_center", hasChildren: false },
  ]

  const subMenuProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 3000,
  })

  return (
    <div
      className="d-flex flex-column scrollbar overflow-auto scrollbar"
      id="navbar"
      style={{ flex: 1 }}>
      {navbarSchema.map((item) => {
        return (
          <span key={Math.random()}>
            <li
              key={item.title}
              className={[
                item.title === active && `active`,
                "d-flex flex-row justify-content-start align-items-center px-4 py-2 m-3",
              ].join(" ")}
              onClick={() => switchFunc(item.title, item.hasChildren && true)}
              role="button">
              <Icon
                className="me-2"
                style={{ fontSize: 24 }}
                sx={{ color: "#7C8DB5" }}>
                {item.iconName}
              </Icon>

              <span className="ms-3 me-5">{item.title}</span>

              {item.hasChildren && (
                <Icon
                  className="ms-auto"
                  style={{ fontSize: 20 }}
                  sx={{ color: "#7C8DB5" }}>
                  arrow_drop_down
                </Icon>
              )}
            </li>

            <animated.div
              style={subMenuProps}
              className={[
                `list-unstyled mx-3`,
                item.title === active && expand
                  ? "collapsed-transition"
                  : "not-shown",
              ].join(" ")}>
              {item.hasChildren &&
                item.children.map((child) => {
                  return (
                    <span key={Math.random()}>
                      <Link to="dashboard" style={{ textDecoration: "none" }}>
                        <li className="text-muted align-items-end ms-5 sub-menu">
                          {child}
                        </li>
                      </Link>
                    </span>
                  )
                })}
            </animated.div>
          </span>
        )
      })}
    </div>
  )
}

export default Navbar
