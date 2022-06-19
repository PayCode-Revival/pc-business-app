import React, { useContext, useState, createContext } from "react"
import { Icon } from "@mui/material"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import {
  getBusinessUserRoleName,
  capitalizeFirsts,
} from "../../statics/allFunctions"

export default function Form({
  wide = false,
  formTitle = "",
  buttonTitle = "Submit",
  data = {},
  mode = "new",
}) {
  const { businessUserRoles } = useContext(ApiDataContext)

  const [uploadBtnDisplay, setUploadBtnDisplay] = useState(true)
  const [uploadInputDisplay, setUploadInputDisplay] = useState(false)
  const [selectedImage, setSelectedImage] = useState(false)

  function handleClose() {
    setUploadInputDisplay(false)
    setSelectedImage(false)
  }

  return (
    <div
      id="top-up-wallet-form"
      className={`col ${wide ? "col-6" : "col-4"} flat-card-style mx-auto`}>
      <span className="h5 d-flex justify-content-center align-items-center mt-3 text-white fw-bolder">
        {formTitle}
      </span>
      <div className="p-3">
        {/* User Role */}
        <div className="form-floating mt-3">
          <select
            className="form-select scrollbar"
            id="user-role"
            aria-label="User Role"
            defaultValue={
              businessUserRoles &&
              capitalizeFirsts(
                getBusinessUserRoleName(data.role, businessUserRoles)
              )
            }>
            {businessUserRoles &&
              businessUserRoles.map((role, index) => (
                <option key={index}>{capitalizeFirsts(role.title)}</option>
              ))}
          </select>
          <label htmlFor="user-role">User Role</label>
        </div>

        {/* Username */}
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder=" "
            defaultValue={data.username ? data.username : ""}
            autoFocus
          />
          <label htmlFor="username">Username</label>
        </div>

        {/* Business Role */}
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="business-role"
            placeholder=" "
            defaultValue={data.business_role ? data.business_role : ""}
          />
          <label htmlFor="business-role">Business Role</label>
        </div>

        {/* First Name */}
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="first-name"
            placeholder=" "
            defaultValue={data.first_name ? data.first_name : ""}
          />
          <label htmlFor="first-name">First Name</label>
        </div>

        {/* Last Name */}
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="last-name"
            placeholder=" "
            defaultValue={data.last_name ? data.last_name : ""}
          />
          <label htmlFor="last-name">Last Name</label>
        </div>

        {/* User Image */}
        {mode === "new" ? (
          <div className="text-light mt-3 p-3 flat-card-style hover-overlay">
            <label htmlFor="formFileLg" className="form-label text-light ">
              User Display Picture
            </label>
            <input
              className="form-control form-control-lg "
              id="formFileLg"
              type="file"
            />
          </div>
        ) : (
          <div className=" mt-3 p-3 container-fluid flat-card-style text">
            <label
              htmlFor="user-display-picture"
              className="form-label text fw-bold">
              User Display Picture
            </label>
            <div className="d-flex justify-content-between align-items-center">
              <div className="w-25">
                <img
                  id="user-dp"
                  className="img-fluid rounded"
                  src={`${
                    selectedImage ? selectedImage : "https://picsum.photos/200"
                  }`}
                  alt="Current User Display Picture"
                />
              </div>
              <div className="mt-3 p-3 flat-card-style hover-overlay flex-grow-1">
                <button
                  id="upload-new-btn"
                  className={`btn btn-block ${
                    uploadBtnDisplay ? "d-flex" : "d-none"
                  } justify-content-center align-items-center`}
                  type="button"
                  style={{
                    backgroundColor: "var(--tertiary-color)",
                    color: "var(--primary-color)",
                  }}
                  onClick={() => {
                    document
                      .getElementById("user-display-profile-upload")
                      .click()
                  }}>
                  <Icon>upload</Icon>
                  <span className="fs-6 ms-1">Upload New</span>
                </button>
              </div>
              <input
                id="user-display-profile-upload"
                type="file"
                className={`${uploadInputDisplay ? "d-flex" : "d-none"}`}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    console.log("Selected A File")
                    setSelectedImage(URL.createObjectURL(e.target.files[0]))
                    setUploadBtnDisplay(!uploadBtnDisplay)
                    setUploadInputDisplay(!uploadInputDisplay)
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="d-grid gap-2 col-6 mx-auto mt-3 mb-3">
          <button
            className="btn btn-block text-white fw-bolder zoomIn d-flex justify-content-center align-items-center"
            type="button"
            style={{ backgroundColor: "var(--accent-color)" }}>
            <Icon>person</Icon>
            <span className="ms-1 text-nowrap text-align-center">
              {buttonTitle}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
