import React, { useContext, useState, useRef, useEffect } from "react"
import { Icon } from "@mui/material"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import {
  capitalizeFirsts,
  lowerCase,
  retrievingPlaceholder,
} from "../../statics/allFunctions"
import { api } from "../../statics/api"
import Toast from "../../components/Toast/Toast"

export default function UpdateForm({ data }) {
  const { getUserAccounts, getLoggedInUserInfo } = useContext(ApiDataContext)
  const [accessLevel, setAccessLevel] = useState(null)
  const [businessUserRole, setBusinessUserRole] = useState(null)
  const [username, setUsername] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [selectedImage, setSelectedImage] = useState(false)
  const [uploadInputValue, setUploadInputValue] = useState(null)
  const [showBtn, setShowBtn] = useState(true)
  const [changeDetected, setChangeDetected] = useState(false)

  const [toastOpen, setToastOpen] = useState(false)
  const [showStatus, setShowStatus] = useState(true)
  const [statusCode, setStatusCode] = useState(0)
  const [statusMessage, setStatusMessage] = useState(null)

  const closeModalRef = useRef()
  const uploadInputRef = useRef()
  const submitButtonRef = useRef()

  function handleModalClose(e) {
    setAccessLevel("Admin")
    setBusinessUserRole("Administrator")
    setUsername("")
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setSelectedImage(false)
    setUploadInputValue(null)
  }

  async function handleFormSubmit(businessUserID) {
    setShowBtn(false)
    try {
      const payload = {
        username: username ? username : data.username,
        first_name: firstName || data.first_name,
        last_name: lastName || data.last_name,
        role: accessLevel || data.role,
        business_role: businessUserRole || data.business_role,
        email: email || data.email,
        display_picture: uploadInputValue
          ? uploadInputValue
          : data.display_picture,
      }
      password && (payload.password = password)
      password && confirmPassword && password === confirmPassword
        ? (payload.password_confirmation = confirmPassword)
        : ""
      const addBusinessUserRequest = await api(
        "business/users/update/" + businessUserID,
        "post",
        payload
      )
      if (
        addBusinessUserRequest.status == "200" ||
        addBusinessUserRequest.status == "201"
      ) {
        setStatusCode(1)
        setStatusMessage("User Updated Successfully")
        setToastOpen(true)
        setTimeout(() => {
          setToastOpen(false)
          setShowStatus(false)
          setAccessLevel(null)
          setBusinessUserRole("")
          setUsername("")
          setFirstName("")
          setLastName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          setSelectedImage(false)
          setUploadInputValue(null)
          closeModalRef.current.click()
          getUserAccounts()
          getLoggedInUserInfo()
        }, 1500)
      }
    } catch (err) {
      setStatusCode(0)
      setShowStatus(true)
      setStatusMessage(err.response.data)
    }
    setShowBtn(true)
  }

  useEffect(() => {
    if (
      (username && username.length) ||
      (password && password.length) ||
      (confirmPassword && confirmPassword.length) ||
      (firstName && firstName.length && firstName !== data.first_name) ||
      (lastName && lastName.length && lastName !== data.last_name) ||
      (email && email.length && email !== data.email) ||
      (businessUserRole && businessUserRole.length !== data.business_role) ||
      (accessLevel && accessLevel !== data.role)
    ) {
      setChangeDetected(true)
    } else {
      setChangeDetected(false)
    }
  })

  return (
    <>
      <Toast
        state={toastOpen}
        severity="success"
        message="User Added Successfully"
      />

      {/* Modal Close Button */}
      <span
        className="p-3"
        style={{
          position: "sticky",
          float: "right",
          marginTop: "-11%",
          right: "17%",
        }}>
        <button
          className="btn btn-danger fw-bolder"
          type="button"
          data-mdb-dismiss="modal"
          onClick={() => {
            handleModalClose()
          }}
          ref={closeModalRef}>
          Close
        </button>
      </span>

      <div className="col col-10 mx-auto">
        <form
          className={`d-flex flex-column justify-content-center align-items-center col`}
          onSubmit={(e) => {
            e.preventDefault()
            handleFormSubmit(data.id)
          }}>
          <div
            className="container-fluid p-5 rounded"
            style={{ backgroundColor: "" }}>
            {/* Status Message */}
            <div className="row p-1 mb-3">
              <div className="col">
                {showStatus && (
                  <span
                    className={`badge p-3 ${
                      !statusCode ? "bg-danger" : "bg-success"
                    } w-100 flat-card-style`}>
                    {statusMessage}
                  </span>
                )}
              </div>
            </div>

            {/* Roles */}
            <div className="row p-1">
              {/* Access Level */}
              <div className="col">
                <div className="form-floating">
                  <select
                    className="form-select"
                    value={accessLevel || data.role}
                    onChange={(e) => {
                      setAccessLevel(e.target.value)
                    }}>
                    <option value={1}>Admin</option>
                    <option value={2}>Assistant</option>
                    <option value={0}>Custom Role</option>
                  </select>
                  <label>User Access Level</label>
                </div>
              </div>

              {/* Business Role */}
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    value={
                      businessUserRole ||
                      capitalizeFirsts(data.business_role.toLowerCase())
                    }
                    onChange={(e) => {
                      setBusinessUserRole(e.target.value)
                    }}
                  />
                  <label>Business Role</label>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="row mt-3">
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    value={username || data.username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  />
                  <label>Username</label>
                </div>
              </div>
            </div>

            {/* First & Last Name */}
            <div className="row mt-3">
              <div className="col">
                {/* First Name */}
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    value={firstName || capitalizeFirsts(data.first_name)}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                  <label>First Name</label>
                </div>
              </div>
              <div className="col">
                {/* Last Name */}
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    value={lastName || capitalizeFirsts(data.last_name)}
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  />
                  <label>Last Name</label>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="row mt-3">
              <div className="col">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    placeholder=" "
                    value={email || lowerCase(data.email)}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                  <label>Email Address</label>
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="row mt-3">
              {/* Password */}
              <div className="col">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=" "
                    value={password || ""}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                  <label>Password</label>
                </div>
                <span className="align-self-start ms-1 form-text text-danger fw-bolder">
                  <span className="" style={{ fontSize: "0.75em" }}>
                    Leave Blank To Keep Using The Same Password
                  </span>
                </span>
              </div>

              {/* Confirm Password */}
              <div className="col">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=" "
                    value={confirmPassword || ""}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                    }}
                  />
                  <label>Confirm Password</label>
                </div>
              </div>
            </div>

            {/* User Image */}
            <div className=" mt-3 p-3 container-fluid flat-card-style text">
              <label className="form-label text fw-bolder">
                User Display Picture
              </label>

              <div className="d-flex justify-content-between align-items-center">
                {/* Image Placeholder */}
                <div className="w-25">
                  <img
                    className="img-fluid rounded"
                    src={`${
                      selectedImage
                        ? selectedImage
                        : "https://picsum.photos/200"
                    }`}
                    alt="Current User Display Picture"
                  />
                </div>

                {/* Upload New Button */}
                <div className="mt-3 p-3 flat-card-style hover-overlay flex-grow-1">
                  <button
                    className={`btn btn-block d-flex justify-content-center align-items-center`}
                    type="button"
                    style={{
                      backgroundColor: "var(--tertiary-color)",
                      color: "var(--primary-color)",
                    }}
                    onClick={() => {
                      uploadInputRef.current.click()
                    }}>
                    <Icon>upload</Icon>
                    <span className="fs-6 ms-1">Upload New</span>
                  </button>
                </div>

                {/* Hidden Image Input */}
                <span className={`d-none`}>
                  <input
                    type={"file"}
                    ref={uploadInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedImage(URL.createObjectURL(e.target.files[0]))
                        setUploadInputValue(e.target.files[0])
                      }
                    }}
                  />
                </span>
              </div>
            </div>

            {/* Button */}
            {changeDetected &&
              (showBtn ? (
                <div className="row mt-3">
                  <div className="input-group col">
                    <button
                      ref={submitButtonRef}
                      className="btn btn-block btn-lg d-flex align-items-center justify-content-center fw-bolder zoomIn fadeIn flat-card-style"
                      type="submit"
                      style={{
                        color: "var(--primary-color)",
                        backgroundColor: "var(--accent-color)",
                      }}>
                      <Icon>person</Icon>
                      <span className="ms-1 fs-6">Update User</span>
                    </button>
                  </div>
                </div>
              ) : (
                <span className="p-5">{retrievingPlaceholder}</span>
              ))}
          </div>
        </form>
      </div>
    </>
  )
}
