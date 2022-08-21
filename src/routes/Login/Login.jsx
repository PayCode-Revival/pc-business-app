import { useState, useContext, useEffect } from "react"
import { Icon } from "@mui/material"
import TitleBar from "./../../components/TitleBar/TitleBar"
import { api } from "./../../statics/api"
import Toast from "../../components/Toast/Toast"
import "./Login.css"
import { retrievingPlaceholder } from "../../statics/allFunctions"
import { useNavigate } from "react-router-dom"
import { ApiDataContext } from "../../contexts/ApiDataContext"

export default function Login({}) {
  const { loggedIn, setLoggedIn, checkLoginStatus, executeAll } =
    useContext(ApiDataContext)

  const [businessID, setBusinessID] = useState("")
  const [authID, setAuthID] = useState("")
  const [password, setPassword] = useState("")

  const [showBtn, setShowBtn] = useState(true)
  const [toastOpen, setToastOpen] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [statusCode, setStatusCode] = useState(0)
  const [statusMessage, setStatusMessage] = useState(null)
  const [toastSeverity, setToastSeverity] = useState("success")
  const [toastMessage, setToastMessage] = useState(null)

  const navigate = useNavigate()

  async function submitLoginForm() {
    setShowBtn(false)
    try {
      const loginRequest = await api("login/business", "post", {
        business: businessID,
        auth_id: authID.toLowerCase(),
        password: password,
      })

      if (loginRequest.status == "201") {
        localStorage.setItem("bearer-token", loginRequest.data.token)
        setLoggedIn(true)
        setToastSeverity("success")
        setToastMessage("Authentication Successful")
        setToastOpen(true)
        setStatusCode(1)
        setStatusMessage("Login Successful.... Now Preparing Your Dashboard")
        setShowStatus(true)
        executeAll()
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000)
      }
    } catch (err) {
      setLoggedIn(false)
      setToastSeverity("error")
      setToastMessage(err.message)
      setToastOpen(true)
      setStatusCode(0)
      setStatusMessage("Authentication Error! Please Try Again.")
      setShowStatus(true)
      setShowBtn(true)
    }
    setTimeout(() => {
      setToastOpen(false)
    }, 1500)
  }

  useEffect(() => {
    checkLoginStatus().then((res) => {
      if (res && loggedIn) {
        // console.log("Logged In Already")
        executeAll()
        navigate("/")
      } else {
        // console.log("Unauthorized")
      }
    })
  }, [])

  return (
    <>
      <Toast
        state={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
      />
      <TitleBar />
      <div className="container-fluid h-100 overflow-auto">
        <div className="row h-100">
          {/* Left Side */}
          <div className="col flex-grow-1 d-flex flex-column justify-content-center">
            {/* Logo */}
            <div className="row justify-content-center">
              <div className="col-7 col-md-4 d-flex justify-content-center">
                <img
                  className="img-fluid h-100 shadow-2-strong btn zoomIn fadeIn w-75"
                  src="assets/img/logo-light.png"
                  alt=""
                />
              </div>
            </div>

            {/* Login Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitLoginForm()
              }}>
              <div className="row p-3 mt-2">
                <div className="col col-xl-8 mx-auto p-3 flat-card-style h-100">
                  <div className="d-flex justify-content-center">
                    {!showStatus ? (
                      <span className="mb-3 fw-bolder">
                        {"Login To PayMaker Business"}
                      </span>
                    ) : (
                      <span
                        className={`badge p-3 mb-3 ${
                          !statusCode ? "bg-danger" : "bg-success"
                        } w-100 flat-card-style`}>
                        {statusMessage}
                      </span>
                    )}
                  </div>
                  <div className="row flex-column p-1">
                    {/* Business ID */}
                    <div className="col mx-auto rounded row">
                      <div className="col-2 d-flex align-items-center justify-content-center btn">
                        <Icon style={{ color: "var(--primary-color)" }}>
                          business
                        </Icon>
                      </div>
                      <div className="col rounded form-floating custom-btn">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" "
                          required
                          value={businessID || ""}
                          onChange={(e) => setBusinessID(e.target.value)}
                        />
                        <label className="text text-nowrap">
                          Business ID | Email
                        </label>
                      </div>
                    </div>

                    {/* Authentication ID */}
                    <div className="col mx-auto rounded row mt-3">
                      <div className="col-2 d-flex align-items-center justify-content-center btn">
                        <Icon style={{ color: "var(--primary-color)" }}>
                          person
                        </Icon>
                      </div>
                      <div className="col rounded form-floating custom-btn">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" "
                          required
                          value={authID ? authID : ""}
                          onChange={(e) => setAuthID(e.target.value)}
                        />
                        <label className="text text-nowrap">
                          Email | Phone | Username
                        </label>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col mx-auto rounded row mt-3">
                      <div className="col-2 d-flex align-items-center justify-content-center btn">
                        <Icon style={{ color: "var(--primary-color)" }}>
                          password
                        </Icon>
                      </div>
                      <div className="col rounded form-floating custom-btn">
                        <input
                          type="password"
                          className="form-control"
                          placeholder=" "
                          required
                          value={password ? password : ""}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="text">Password</label>
                      </div>
                    </div>

                    {/* Button */}
                    {showBtn ? (
                      <div className="col mx-auto">
                        <button className="btn btn-block p-2 mt-5 text fw-bolder fs-5 d-flex align-items-center justify-content-center fadeIn zoomIn custom-hover">
                          <Icon>login</Icon>
                          <span className="ms-2"> Login</span>
                        </button>
                      </div>
                    ) : (
                      <span className="mt-3">{retrievingPlaceholder}</span>
                    )}

                    {/* Register */}
                    <div
                      className="row p-5 mt-3 justify-content-center"
                      onClick={() => navigate("/register")}>
                      <span
                        className="col d-flex justify-content-center flat-card-style zoomIn btn fw-bold"
                        role={"button"}>
                        No Account? | Sign Up
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="col col-xl-5 d-none d-xl-flex">
            <img
              className="img-fluid ms-3"
              src="assets/img/six.jpg"
              alt=""
              style={{ height: "95vh" }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
