import { Icon } from "@mui/material"
import React from "react"
import TitleBar from "./../../components/TitleBar/TitleBar"
import { SectionHeader } from "./../../components/SectionHeader/SectionHeader"

import "./Login.css"

export default function Login() {
  return (
    <>
      <TitleBar />
      <div className="container-fluid h-100 overflow-hidden">
        <div className="row">
          <div className="col">
            {/* Logo */}
            <div className="row mx-auto ms-3">
              <div className="col-4 mx-auto">
                <img
                  className="img-fluid h-100 shadow-2-strong btn zoomIn fadeIn"
                  src="assets/img/default.png"
                  alt=""
                />
              </div>
            </div>

            {/* Login Form */}
            <div className="row p-3 mt-5 ms-3 me-1">
              <div className="col-10 mx-auto p-5 flat-card-style h-100">
                <div className="d-flex justify-content-center">
                  <SectionHeader text={"Login To PayMaker Business"} />
                </div>

                <div className="row flex-column p-3">
                  {/* Authentication ID */}
                  <div className="col mx-auto rounded row">
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
                      />
                      <label className="fs-6 text text-nowrap">
                        Email | Phone Number | PayMaker ID
                      </label>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="col mx-auto rounded row mt-5">
                    <div className="col-2 d-flex align-items-center justify-content-center btn">
                      <Icon style={{ color: "var(--primary-color)" }}>
                        password
                      </Icon>
                    </div>
                    <div className="col rounded form-floating custom-btn">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=" "
                      />
                      <label className="fs-6 text ">Password</label>
                    </div>
                  </div>

                  <div className="col mx-auto">
                    <button className="btn btn-block p-3 mt-5 text fw-bolder fs-5 d-flex align-items-center justify-content-center fadeIn zoomIn custom-hover">
                      <Icon>login</Icon>
                      <span className="ms-2"> Login</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col login-right">
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
