import { Icon } from "@mui/material"
import { useContext } from "react"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import { retrievingPlaceholder } from "../../statics/allFunctions"
import NavBarAlt from "../NavBarAlt/NavBarAlt"
import "./SidebarAlt.css"

export default function SidebarAlt({
  currentState,
  openedNavItem = "Dashboard",
}) {
  const { loggedInUser, businessInfo } = useContext(ApiDataContext)
  return (
    <div
      className={`${
        currentState ? "sidebar-shown" : "sidebar-hidden"
      } d-none d-lg-block h-100 mh-100 col-2`}>
      <div
        id="sidebar"
        className="d-flex flex-column justify-content-around p-3 h-100 mh-100 rounded">
        {/* Business Identity */}
        {businessInfo ? (
          <div
            id="business-identity"
            className="d-flex flex-row justify-content-start align-items-center border-bottom pb-2 ps-2 fadeIn">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="rounded"
              id="business-logo"
            />
            <span
              className="ms-2 fw-bolder text-nowrap overflow-hidden"
              id="business-name">
              {businessInfo.name}
            </span>
            <span className="text-muted ms-3" id="business-id">
              {businessInfo.paycode_id}
            </span>
          </div>
        ) : (
          retrievingPlaceholder
        )}

        {/* NavBar */}
        <NavBarAlt openedNavItem={openedNavItem} />

        {/* Logged In User */}
        {loggedInUser ? (
          <div
            className="border rounded p-2 d-flex justify-content-center align-items-center fw-bolder text-light fadeIn"
            id="logged-in-user">
            <Icon style={{ fontSize: "1.1vw" }}>person</Icon>
            <span className="ms-1 text-nowrap overflow-hidden">
              Logged In As:{" "}
              <span className="text-uppercase">({loggedInUser.username})</span>
            </span>
          </div>
        ) : (
          retrievingPlaceholder
        )}
      </div>
    </div>
  )
}
