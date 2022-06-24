import React, { useContext, useState, useRef, useEffect } from "react"
import { Icon } from "@mui/material"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import {
  getBusinessUserRoleName,
  capitalizeFirsts,
} from "../../statics/allFunctions"
import { SectionHeader } from "../../components/SectionHeader/SectionHeader"
import { Toast } from "bootstrap"
import { access } from "original-fs"

export default function Form({}) {
  const { businessUserRoles } = useContext(ApiDataContext)
  const [accessLevel, setAccessLevel] = useState("Admin")
  const [businessUserRole, setBusinessUserRole] = useState("Administrator")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedImage, setSelectedImage] = useState(false)
  const [uploadInputValue, setUploadInputValue] = useState("")

  const [toast, setToast] = useState(false)
  const toastRef = useRef()

  let currentOption
  return (
    <>
      <form className={`d-flex flex-column align-items-center p-3`}>
        <SectionHeader text={"Add New Bank Account"} />

        {/* Select Access Level */}
        <div className="form-floating w-100">
          <select
            className="form-select flat-card-style"
            value={accessLevel}
            onChange={(e) => {
              setAccessLevel(e.target.value)
            }}>
            {businessUserRoles &&
              businessUserRoles.map((role, index) => {
                currentOption = capitalizeFirsts(role.title)
                return (
                  <option key={index} value={currentOption}>
                    {currentOption}
                  </option>
                )
              })}
          </select>
          <label>User Access Level</label>
        </div>

        {/* Business Role */}
        <div className="form-floating flat-card-style mt-3 w-100">
          <input
            type="text"
            className="form-control"
            placeholder=" "
            value={businessUserRole}
            onChange={(e) => {
              setBusinessUserRole(e.target.value)
            }}
          />
          <label>Business Role</label>
        </div>

        {/* Username */}
        <div className="form-floating flat-card-style mt-3 w-100">
          <input
            type="text"
            className="form-control"
            placeholder=" "
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
          <label>Username</label>
        </div>

        {/* First Name */}
        <div className="form-floating flat-card-style mt-3 w-100">
          <input
            type="text"
            className="form-control"
            placeholder=" "
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
          <label>First Name</label>
        </div>

        {/* Last Name */}
        <div className="form-floating flat-card-style mt-3 w-100">
          <input
            type="text"
            className="form-control"
            placeholder=" "
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
          <label>Last Name</label>
        </div>

        {/* Email */}
        <div className="form-floating flat-card-style mt-3 w-100">
          <input
            type="email"
            className="form-control"
            placeholder=" "
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <label>Email Address</label>
        </div>

        {/* Password */}
        <div className="form-floating flat-card-style mt-3 w-100">
          <input
            type="password"
            className="form-control"
            placeholder=" "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <label>Password</label>
        </div>
        <span className="align-self-start ms-1 form-text text-danger fw-bolder">
          <span>Leave Blank To Keep Using The Same Password</span>
        </span>

        {/* Confirm Password */}
        <div className="form-floating flat-card-style mt-3 w-100">
          <input
            type="password"
            className="form-control"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
          />
          <label>Confirm Password</label>
        </div>
        <span className="align-self-start ms-1 form-text text-danger fw-bolder">
          <span>Leave Blank To Keep Using The Same Password</span>
        </span>

        {/* User Image */}
        {mode === "new" ? (
          <div className="text-light mt-3 p-3 flat-card-style hover-overlay w-100">
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
                  className="img-fluid rounded"
                  src={`${
                    selectedImage ? selectedImage : "https://picsum.photos/200"
                  }`}
                  alt="Current User Display Picture"
                />
              </div>
              <div className="mt-3 p-3 flat-card-style hover-overlay flex-grow-1">
                <button
                  className={`btn btn-block d-flex justify-content-center align-items-center`}
                  type="button"
                  style={{
                    backgroundColor: "var(--tertiary-color)",
                    color: "var(--primary-color)",
                  }}
                  onClick={() => {
                    uploadInput.current.click()
                  }}>
                  <Icon>upload</Icon>
                  <span className="fs-6 ms-1">Upload New</span>
                </button>
              </div>
              <input
                type={"file"}
                className={`d-none`}
                ref={uploadInput}
                value={uploadInputValue}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedImage(URL.createObjectURL(e.target.files[0]))
                  }
                }}
              />
            </div>
          </div>
        )}
        {/* Button */}
        {showBtn && (
          <div className="input-group mt-3">
            <button
              className="btn btn-block btn-lg d-flex align-items-center justify-content-center fw-bolder zoomIn fadeIn flat-card-style"
              type="button"
              style={{ color: "var(--text-color)" }}>
              <Icon>{iconName}</Icon>
              <span className="ms-1 fs-6">{buttonTitle}</span>
            </button>
          </div>
        )}
      </form>
    </>
  )
}
