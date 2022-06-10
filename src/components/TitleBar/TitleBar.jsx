// Components
import "./TitleBar.css"

// Electron
const electron = window.require("electron")
const { ipcRenderer } = electron

export default function TitleBar() {
  function windowControl(action) {
    console.log(action)
    ipcRenderer.invoke("window-controls", action).then((result) => {
      console.log(action, result)
    })
  }
  return (
    <div
      className="d-flex justify-content-around align-items-center p-2 user-select-none"
      id="title-bar">
      <div className="draggable" id="drag-area">
        {/* Identity */}
        <div
          id="identity"
          className="d-flex align-items-center identity draggable">
          <div className="" id="logo">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="rounded-circle"
              id="logo-img"
            />
          </div>
          <div id="app-name" className="fw-bolder">
            PayCode Business
          </div>
        </div>
      </div>

      {/* Window Controls */}
      <div
        id="window-controls"
        className="d-flex justify-content-evenly align-items-center">
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
