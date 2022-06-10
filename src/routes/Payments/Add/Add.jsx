import { useState, useEffect } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { Icon } from "@mui/material"
import "./Add.css"

export default function Add() {
  const [categoryColor, setCategoryColor] = useState("#fff000")
  const [paymentAmountType, setPaymentAmountType] = useState("None")

  const [value, setValue] = useState([0, 10])
  const handleChange = (event, newValue) => setValue(newValue)

  return (
    <>
      <SectionHeader text={"Add New Payment Category"} />
      <div
        id="add-account"
        className="container-fluid flat-card-style overflow-auto scrollbar">
        <div className="row p-4 justify-content-center">
          <div
            id="add-payment-category"
            className="col col-4 col-sm-8 flat-card-style">
            <span className="h5 d-flex justify-content-center align-items-center mt-3 text-white fw-bolder">
              Payment Category Data
            </span>
            <div className="p-3">
              {/* Category Title */}
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="category-title"
                  placeholder=" "
                  autoFocus
                />
                <label htmlFor="category-title">Category Title</label>
              </div>

              {/* Category Color */}
              <div className="input-group input-group-lg mt-5">
                <span className="input-group-text p-3">
                  <div className="cp_wrapper">
                    <input
                      id="category-color"
                      type="color"
                      value={categoryColor}
                      onChange={(e) => setCategoryColor(e.target.value)}
                    />
                  </div>
                </span>
                <input
                  className="form-control"
                  placeholder="Category Color"
                  aria-label="Category Color"
                  aria-describedby="basic-addon1"
                  value={categoryColor.toUpperCase()}
                  readOnly
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--text-color)",
                  }}
                />
              </div>

              {/* Payment Amount Type */}
              <div
                className="input-group mt-5 flex-column justify-content-between"
                onChange={(e) => setPaymentAmountType(e.target.value)}>
                <span className="mb-2 fw-bolder">Payment Amount Type</span>
                <span className="d-flex flex-row justify-content-between">
                  <span
                    className="input-group-text p-2 text-white border-dark radio-container flat-card-style zoomIn"
                    role={"button"}>
                    <div className="form-check form-check-inline">
                      <input
                        id="payment-amount-type-none"
                        className="form-check-input"
                        type="radio"
                        name="payment-amount-type"
                        defaultValue={"none"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="payment-amount-type-none"
                        name="payment-amount-type">
                        None
                      </label>
                    </div>
                  </span>

                  <span
                    className="input-group-text p-2 text-white border-dark radio-container flat-card-style zoomIn"
                    role={"button"}>
                    <div className="form-check form-check-inline">
                      <input
                        id="payment-amount-type-fixed"
                        className="form-check-input"
                        type="radio"
                        name="payment-amount-type"
                        defaultValue={"fixed"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="payment-amount-type-fixed">
                        Fixed
                      </label>
                    </div>
                  </span>

                  <span
                    className="input-group-text p-2 text-white border-dark radio-container flat-card-style zoomIn"
                    role={"button"}>
                    <div className="form-check form-check-inline">
                      <input
                        id="payment-amount-type-range"
                        className="form-check-input"
                        type="radio"
                        name="payment-amount-type"
                        defaultValue={"range"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="payment-amount-type-range">
                        Range
                      </label>
                    </div>
                  </span>
                </span>
              </div>

              {/* Fixed Payment Amount */}
              {paymentAmountType === "fixed" && (
                <div className="form-floating mt-5 fadeIn">
                  <input
                    type="number"
                    className="form-control"
                    id="fixed-payment-amount"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="fixed-payment-amount">Fixed Amount</label>
                </div>
              )}

              {/* Range Payment Amout */}
              {paymentAmountType === "range" && (
                <div className={`container-fluid mt-5 flat-card-style fadeIn`}>
                  <div className="row p-3 ">
                    <div className="col col-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control border-bottom"
                          id="floatingInput"
                          placeholder=" "
                        />
                        <label htmlFor="floatingInput" className="">
                          Minimum Amount
                        </label>
                      </div>
                    </div>
                    <div className="col col-6 ">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control border-bottom"
                          id="floatingInput"
                          placeholder=" "
                        />
                        <label htmlFor="floatingInput" className="">
                          Maximum Amount
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="d-grid gap-2 col-6 mx-auto mt-5 mb-3 animated slide-in-left">
                <button
                  className="btn btn-block text-white fw-bolder zoomIn d-flex justify-content-center align-items-center"
                  type="button"
                  style={{ backgroundColor: "var(--accent-color)" }}>
                  <Icon>payments</Icon>
                  <span className="ms-2 text-nowrap text-align-center">
                    Add Payment Category
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
