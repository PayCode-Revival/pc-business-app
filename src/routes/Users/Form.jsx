import React, { useContext, useState, useRef, useEffect } from "react"
import { Icon } from "@mui/material"
import { ApiDataContext } from "../../contexts/ApiDataContext"
import { retrievingPlaceholder } from "../../statics/allFunctions"
import { api } from "../../statics/api"
import { useNavigate } from "react-router-dom"
import Toast from "../../components/Toast/Toast"

export default function Form({}) {
  const navigate = useNavigate()
  const { getUserAccounts } = useContext(ApiDataContext)
  const [accessLevel, setAccessLevel] = useState(1)
  const [businessUserRole, setBusinessUserRole] = useState("Administrator")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [matchingPasswords, setMatchingPasswords] = useState(false)
  const [selectedImage, setSelectedImage] = useState(false)
  const [uploadInputValue, setUploadInputValue] = useState(null)
  const [showBtn, setShowBtn] = useState(true)

  const [toastOpen, setToastOpen] = useState(false)
  const [showStatus, setShowStatus] = useState(true)
  const [statusCode, setStatusCode] = useState(0)
  const [statusMessage, setStatusMessage] = useState(null)

  const uploadInputRef = useRef()
  const submitButtonRef = useRef()

  async function handleFormSubmit() {
    setShowBtn(false)
    try {
      const addBusinessUserRequest = await api("business/users/add", "post", {
        username: username.toLowerCase(),
        password,
        password_confirmation: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        role: accessLevel,
        business_role: businessUserRole,
        email,
        display_picture: uploadInputValue,
      })
      if (
        addBusinessUserRequest.status == "200" ||
        addBusinessUserRequest.status == "201"
      ) {
        setStatusCode(1)
        setStatusMessage("User Added Successfully")
        setToastOpen(true)
        await getUserAccounts()

        setTimeout(() => {
          setToastOpen(false)
          setShowStatus(false)
          setAccessLevel(1)
          setBusinessUserRole("Administrator")
          setUsername("")
          setFirstName("")
          setLastName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          setSelectedImage(false)
          setUploadInputValue(null)
          setMatchingPasswords(false)
          navigate("/users/Manage")
        }, 1500)
      }
    } catch (err) {
      console.log(err.response)
      setStatusCode(0)
      setShowStatus(true)
      setStatusMessage(err.response.data)
    }
    setShowBtn(true)
  }

  useEffect(() => {
    if (password.length && password !== confirmPassword) {
      setStatusCode(0)
      setShowStatus(1)
      setStatusMessage("Passwords Do Not Match!")
      setMatchingPasswords(false)
    } else {
      setShowStatus(false)
      setStatusMessage("")
      setMatchingPasswords(true)
    }
  })

  return (
    <>
      <Toast
        state={toastOpen}
        severity="success"
        message="User Added Successfully"
      />
      <div className="col col-7 mx-auto">
        <form
          className={`d-flex flex-column justify-content-center align-items-center`}
          onSubmit={(e) => {
            e.preventDefault()
            handleFormSubmit()
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
              {/* Select Access Level */}
              <div className="col">
                <div className="form-floating">
                  <select
                    className="form-select"
                    value={accessLevel}
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
                    value={businessUserRole}
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
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                    minLength={4}
                    maxLength={12}
                  />
                  <label>Username</label>
                </div>
              </div>
            </div>

            {/* First & Last Name */}
            <div className="row mt-3">
              {/* First Name */}
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                    minLength={1}
                    maxLength={30}
                  />
                  <label>First Name</label>
                </div>
              </div>

              {/* Last Name */}
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                    minLength={1}
                    maxLength={30}
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
                    value={email}
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    minLength={8}
                  />
                  <label>Password</label>
                </div>
                <span className="align-self-start ms-1 form-text text-danger fw-bold">
                  <span className="" style={{ fontSize: "0.74vw" }}>
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
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                    }}
                    minLength={8}
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
            {matchingPasswords && (
              <div className="row mt-3">
                {showBtn ? (
                  <div className="input-group col">
                    <button
                      ref={submitButtonRef}
                      className="btn btn-block btn-lg d-flex align-items-center justify-content-center fw-bolder zoomIn fadeIn flat-card-style"
                      type="submit"
                      style={{
                        color: "var(--primary-color)",
                        backgroundColor: "var(--accent-color)",
                      }}>
                      <Icon>add</Icon>
                      <span className="ms-1 fs-6">Add User</span>
                    </button>
                  </div>
                ) : (
                  <span className="p-5">{retrievingPlaceholder}</span>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
