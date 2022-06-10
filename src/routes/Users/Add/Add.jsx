import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { Icon } from "@mui/material"

export default function Add() {
  return (
    <>
      <SectionHeader text={"Add New User"} />
      <div id="add-user" className="container-fluid flat-card-style">
        <div className="row p-4 justify-content-center">
          <div id="top-up-wallet-form" className="col col-5 flat-card-style">
            <span className="h5 d-flex justify-content-center align-items-center mt-3 text-white fw-bolder">
              New User Information
            </span>
            <div className="p-3">
              {/* User Role */}
              <div className="form-floating mt-3">
                <select
                  className="form-select scrollbar"
                  id="user-role"
                  aria-label="User Role">
                  <option className="mb-2">Admin</option>
                  <option className="mb-2">Assistant</option>
                  <option className="mb-2">User</option>
                  <option className="mb-2">Custom</option>
                </select>
                <label htmlFor="user-role">User Role</label>
              </div>

              {/* Username */}
              <div className="form-floating mt-5">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder=" "
                />
                <label htmlFor="username">Username</label>
              </div>

              {/* First Name */}
              <div className="form-floating mt-5">
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  placeholder=" "
                />
                <label htmlFor="first-name">First Name</label>
              </div>

              {/* Last Name */}
              <div className="form-floating mt-5">
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  placeholder=" "
                />
                <label htmlFor="last-name">Last Name</label>
              </div>

              {/* User Image */}
              <div className="text-light mt-5 p-3 flat-card-style hover-overlay">
                <label htmlFor="formFileLg" className="form-label text-light">
                  User Display Picture
                </label>
                <input
                  className="form-control form-control-lg text-light"
                  id="formFileLg"
                  type="file"
                />
              </div>

              {/* Submit Button */}
              <div className="d-grid gap-2 col-6 mx-auto mt-5 mb-3">
                <button
                  className="btn btn-block text-white fw-bolder zoomIn d-flex justify-content-center align-items-center"
                  type="button"
                  style={{ backgroundColor: "var(--accent-color)" }}>
                  <Icon>person</Icon>
                  <span className="ms-1 text-nowrap text-align-center">
                    Add New User
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
