import { useState } from "react"
import QRCode from "react-qr-code"
import TitleBar from "../../components/TitleBar/TitleBar"
import Header from "../../components/Header/Header"
import SidebarAlt from "../../components/SidebarAlt/SidebarAlt"
import { useContext } from "react"
import { ApiDataContext } from "../../contexts/ApiDataContext"
export default function QR() {
  const { businessInfo } = useContext(ApiDataContext)
  const [sidebar, setSideBar] = useState(true)
  const toggleSideBar = () => setSideBar(!sidebar)
  return (
    <>
      {/* Title Bar */}
      <TitleBar />
      {/* Header */}
      <Header sideBarToggleFunc={toggleSideBar} currentState={sidebar} />
      {/* Contents */}
      <div className={`d-flex flex-grow-1 overflow-auto scrollbar`}>
        <SidebarAlt currentState={sidebar} openedNavItem={"QR Code"} />
        <div className={`fadeIn p-5 m-1 d-flex flex-column flex-grow-1`}>
          <div className="container-fluid p-5 d-flex justify-content-center flat-card">
            <QRCode value={businessInfo.encoded_qr_data || ""} />
          </div>
        </div>
      </div>
    </>
  )
}
