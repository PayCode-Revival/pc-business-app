import React from "react"
import { useNavigate } from "react-router-dom"
import { retrievingPlaceholder } from "../../statics/allFunctions"
import "./Modal.css"

export default function Modal({
  title = "Edit",
  body = retrievingPlaceholder,
  cancelBtnText = "Cancel",
  saveBtnText = "Save",
  showFooter = true,
  showCloseIcon = true,
  saveBtnOnClickFunc = () => {},
  toastFunc = () => {},
  refreshOnClose = true,
  navigateAfterClose = false,
}) {
  const navigate = useNavigate()

  return (
    <div
      className="modal top m-5 p-5 fade fadeIn"
      id={"exampleModal"}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-mdb-backdrop="false"
      data-mdb-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            {showCloseIcon && (
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: "var(--primary-color)" }}></button>
            )}
          </div>
          <div className="modal-body p-3"> {body}</div>
          {showFooter && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-mdb-dismiss="modal">
                {cancelBtnText}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-mdb-dismiss="modal"
                onClick={() => {
                  saveBtnOnClickFunc()
                  toastFunc(true)
                  refreshOnClose &&
                    setTimeout(() => {
                      navigate("./")
                      toastFunc(false)
                    }, 1000)
                  navigateAfterClose &&
                    setTimeout(() => {
                      navigate(navigateAfterClose)
                      toastFunc(false)
                    }, 1000)
                }}>
                {saveBtnText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
