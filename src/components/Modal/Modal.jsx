import React, { useContext } from "react"
import { ModalContext } from "../../contexts/ModalContext"

export default function Modal({ title = "Edit", body = "Hello World" }) {
  return (
    <div
      className="modal top m-5 p-5 fade fadeIn"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-mdb-backdrop="false"
      data-mdb-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border">
          <div
            className="modal-header"
            style={{
              backgroundColor: "var(--bg-dark)",
              color: "var(--primary-color)",
            }}>
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-mdb-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: "var(--primary-color)" }}></button>
          </div>
          <div
            className="modal-body p-3 d-flex"
            style={{ backgroundColor: "var(--bg-dark)" }}>
            {body}
          </div>
          <div
            className="modal-footer"
            style={{ backgroundColor: "var(--bg-dark)" }}>
            <button
              type="button"
              className="btn btn-danger"
              data-mdb-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
