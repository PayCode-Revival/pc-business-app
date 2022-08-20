import React, { useContext, useState, useRef } from "react"
import { Icon } from "@mui/material"
import {
  capitalizeFirsts,
  currency,
  retrievingPlaceholder,
} from "../../statics/allFunctions"
import { SectionHeader } from "../../components/SectionHeader/SectionHeader"
import Toast from "../../components/Toast/Toast"
import { api } from "../../statics/api"
import { ApiDataContext } from "../../contexts/ApiDataContext"

export default function Form() {
  const { getPaymentCategories, savedBankAccounts } = useContext(ApiDataContext)
  const [categoryTitle, setCategoryTitle] = useState("")
  const [categoryColor, setCategoryColor] = useState("#000000")
  const [paymentAmountType, setPaymentAmountType] = useState("None")
  const [fixedAmount, setFixedAmount] = useState(0)
  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(0)
  const [defaultAccount, setDefaultAccount] = useState("Wallet")
  const [showBtn, setShowBtn] = useState(true)
  const [toastOpen, setToastOpen] = useState(false)
  const [showStatus, setShowStatus] = useState(true)
  const [statusCode, setStatusCode] = useState(0)
  const [statusMessage, setStatusMessage] = useState(null)
  const [description, setDescription] = useState("")

  async function handleFormSubmit() {
    setShowBtn(false)
    try {
      const addPaymentCategoryRequest = await api(
        "business/payment-categories/add",
        "post",
        {
          title: categoryTitle,
          color: categoryColor,
          type: paymentAmountType,
          amount: parseFloat(fixedAmount),
          min_amount: parseFloat(minAmount),
          max_amount: parseFloat(maxAmount),
          default_account: defaultAccount,
          description: description,
        }
      )
      if (addPaymentCategoryRequest.status == "201") {
        setStatusCode(1)
        setStatusMessage("Payment Category Added Successfully")
        setToastOpen(true)
        await getPaymentCategories()
        setTimeout(() => {
          setToastOpen(false)
          setShowStatus(false)
          setCategoryTitle("")
          setCategoryColor("#000000")
          setPaymentAmountType("None")
          setFixedAmount(0)
          setMinAmount(0)
          setMaxAmount(0)
          setDescription("")
          setDefaultAccount("Wallet")
        }, 1000)
      }
    } catch (err) {
      console.log(err.response.data)
      setStatusCode(0)
      setShowStatus(true)
      setStatusMessage(err.message)
    }
    setShowBtn(true)
  }

  return (
    <>
      <Toast
        state={toastOpen}
        severity="success"
        message="Payment Category Added Successfully"
      />
      <form
        className={`d-flex flex-column align-items-center p-3`}
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit()
        }}>
        <SectionHeader text={"Category Information"} />

        {showStatus && (
          <span
            className={`badge p-3 ${
              !statusCode ? "bg-danger" : "bg-success"
            } w-100 flat-card-style`}>
            {statusMessage}
          </span>
        )}
        {/* Category Title */}
        <div className="form-floating mt-2 w-100">
          <input
            type="text"
            className="form-control"
            placeholder=" "
            value={categoryTitle}
            onChange={(e) => {
              setCategoryTitle(e.target.value)
            }}
            autoFocus
            required
          />
          <label>Category Title</label>
        </div>

        {/* Category Color */}
        <div className="input-group input-group-lg mt-5 w-100">
          <span className="input-group-text p-3">
            <div className="cp_wrapper">
              <input
                type="color"
                value={categoryColor}
                onChange={(e) =>
                  setCategoryColor(e.target.value.toLocaleUpperCase())
                }
                required
              />
            </div>
          </span>
          <input
            className="form-control"
            placeholder="Category Color"
            aria-label="Category Color"
            aria-describedby="basic-addon1"
            value={categoryColor}
            readOnly
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "var(--text-color)",
            }}
          />
        </div>

        {/* Payment Amount Type */}
        <div className="input-group mt-5 flex-column justify-content-between">
          <div className="form-floating w-100">
            <select
              className="form-select flat-card-style"
              value={paymentAmountType}
              onChange={(e) => {
                setPaymentAmountType(e.target.value)
              }}
              required>
              <option>None</option>
              <option>Fixed</option>
              <option>Range</option>
            </select>
            <label>Payment Scheme</label>
          </div>
        </div>

        {/* Fixed Payment Amount */}
        {paymentAmountType === "Fixed" && (
          <div className="form-floating mt-5 fadeIn w-100 flat-card-style">
            <input
              type="text"
              className="form-control"
              placeholder=" "
              value={fixedAmount}
              onChange={(e) => {
                setFixedAmount(e.target.value)
              }}
            />
            <label>Fixed Amount</label>
          </div>
        )}

        {/* Range Payment Amout */}
        {paymentAmountType === "Range" && (
          <div className={`container-fluid mt-5 flat-card-style fadeIn w-100`}>
            <div className="row p-3 ">
              {/* Minimum Amount */}
              <div className="col col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control border-bottom"
                    placeholder=" "
                    value={minAmount}
                    onChange={(e) => {
                      setMinAmount(e.target.value)
                    }}
                  />
                  <label className="">Minimum Amount</label>
                </div>
              </div>

              {/* Maximum Amount */}
              <div className="col col-6 ">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control border-bottom"
                    placeholder=" "
                    value={maxAmount}
                    onChange={(e) => {
                      setMaxAmount(e.target.value)
                    }}
                  />
                  <label className="">Maximum Amount</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Default Account */}
        <div className="input-group mt-5 flex-column justify-content-between">
          <div className="form-floating w-100">
            <select
              className="form-select flat-card-style"
              value={defaultAccount}
              onChange={(e) => {
                setDefaultAccount(e.target.value)
              }}
              required>
              <option>Wallet</option>
              {savedBankAccounts &&
                savedBankAccounts.map(
                  (account, index) =>
                    account.active && (
                      <option key={index} value={account.id}>
                        {capitalizeFirsts(
                          `${account.bank_name} - ${account.account_name} - ${account.account_number}`.toLowerCase()
                        )}
                      </option>
                    )
                )}
            </select>
            <label>Default Account</label>
          </div>
        </div>

        {/* Description*/}
        <div className="form-floating mt-5 fadeIn w-100 flat-card-style">
          <input
            type="text"
            className="form-control"
            placeholder=" "
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
          <label>Category Description</label>
        </div>

        {/* Button */}
        {showBtn ? (
          <div className="d-flex mt-5 mb-3 justify-content-center align-items-center">
            <button
              className="btn btn-block fw-bolder zoomIn d-flex justify-content-center align-items-center text fs-6"
              type="submit"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              }}>
              <Icon>add</Icon>
              <span className="ms-2 text-nowrap text-align-center">
                Add Category
              </span>
            </button>
          </div>
        ) : (
          <span className="d-flex justify-content-center mt-5">
            {retrievingPlaceholder}
          </span>
        )}
      </form>
    </>
  )
}
