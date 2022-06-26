import React from "react"
import { useNavigate } from "react-router-dom"
import { retrievingPlaceholder } from "../../statics/allFunctions"
import "./Modal.css"

export default function Modal({
  title = "Edit",
  body = retrievingPlaceholder,
  cancelBtnText = "Cancel",
  saveBtnText = "Save",
  showFooter = false,
  showCloseIcon = false,
  saveBtnOnClickFunc = () => {},
  closeBtnFunc = () => {},
}) {
  const navigate = useNavigate()

  return (
    <div
      className="modal top m-5 p-2 fade fadeIn"
      id={"exampleModal"}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-mdb-backdrop="false"
      data-mdb-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header flat-card-style">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            {showCloseIcon && (
              <button
                type="button"
                className="btn btn-danger"
                data-mdb-dismiss="modal"
                aria-label="Close">
                Close
              </button>
            )}
          </div>
          <div className="modal-body p-2"> {body}</div>
          {showFooter && (
            <div className="modal-footer">
              <button
                onClick={() => {
                  closeBtnFunc()
                }}
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
