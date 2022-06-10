import { Icon } from "@mui/material"
import NavBarAlt from "../NavBarAlt/NavBarAlt"
import "./SidebarAlt.css"

export default function SidebarAlt({
  currentState,
  openedNavItem = "Dashboard",
}) {
  return (
    <div
      className={`${
        currentState ? "sidebar-shown" : "sidebar-hidden"
      } d-none d-lg-block h-100 mh-100`}>
      <div
        id="sidebar"
        className="d-flex flex-column justify-content-around p-3 h-100 mh-100 rounded">
        {/* Business Identity */}
        <div
          id="business-identity"
          className="d-flex flex-row justify-content-start align-items-center border-bottom pb-2 ps-2">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="rounded"
            id="business-logo"
          />
          <span
            className="ms-2 fw-bolder text-nowrap overflow-hidden"
            id="business-name">
            House On The Rock
          </span>
        </div>

        {/* NavBar */}
        <NavBarAlt openedNavItem={openedNavItem} />

        {/* Logged In User */}
        <div
          className="border rounded p-2 d-flex justify-content-center align-items-center fw-bolder text-light"
          id="logged-in-user">
          <Icon style={{ fontSize: "1.1vw" }}>person</Icon>
          <span className="ms-1 text-nowrap overflow-hidden">
            Logged In As: (Administrator)
          </span>
        </div>
      </div>
    </div>
  )
}
