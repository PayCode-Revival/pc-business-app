// Components
import "./TitleBar.css"
import logo from "./../../assets/img/logo.png"

// Electron
const electron = window.require("electron")
const { ipcRenderer } = electron

export default function TitleBar() {
  function windowControl(action) {
    ipcRenderer.invoke("window-controls", action).then((result) => {})
  }
  return (
    <div
      className="d-flex justify-content-between align-items-center p-2 user-select-none"
      id="title-bar">
      <span className="draggable d-flex justify-content-between col-6">
        {/* Logo */}
        <div className="p-1">
          <span>
            <img src={logo} className="img-fluid" width={"25vw"} />
          </span>
        </div>

        {/* App Name */}
        <span className="fw-bolder align-self-center">PayMaker Business</span>
      </span>

      {/* Window Controls */}
      <div className="d-flex justify-content-evenly align-items-center window-controls">
        <div
          className="window-control"
          onClick={() => windowControl(windowControl("-"))}>
          -
        </div>
        <div
          className="window-control"
          onClick={() => windowControl(windowControl("+"))}>
          +
        </div>
        <div
          className="window-control"
          onClick={() => windowControl(windowControl("x"))}>
          x
        </div>
      </div>
    </div>
  )
}
