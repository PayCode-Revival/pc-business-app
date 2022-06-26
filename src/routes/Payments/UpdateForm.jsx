import React, { useRef, useState, useContext } from "react"
import { Icon } from "@mui/material"
import {
  capitalizeFirsts,
  retrievingPlaceholder,
} from "../../statics/allFunctions"
import Toast from "../../components/Toast/Toast"
import { api } from "../../statics/api"
import { useEffect } from "react"
import { ApiDataContext } from "../../contexts/ApiDataContext"

export default function UpdateForm({ data }) {
  const { getPaymentCategories, savedBankAccounts } = useContext(ApiDataContext)
  const [categoryTitle, setCategoryTitle] = useState(null)
  const [categoryColor, setCategoryColor] = useState(null)
  const [paymentAmountType, setPaymentAmountType] = useState(null)
  const [fixedAmount, setFixedAmount] = useState(0)
  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(0)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [description, setDescription] = useState(null)
  const [showBtn, setShowBtn] = useState(true)
  const [toastOpen, setToastOpen] = useState(false)
  const [showStatus, setShowStatus] = useState(true)
  const [statusCode, setStatusCode] = useState(0)
  const [statusMessage, setStatusMessage] = useState(null)

  const closeModalRef = useRef()
  const categoryTitleRef = useRef()
  const categoryColorRef = useRef()
  const paymentAmountTypeRef = useRef()
  const fixedAmountRef = useRef()
  const minAmountRef = useRef()
  const maxAmountRef = useRef()
  const descriptionRef = useRef()
  const submitButtonRef = useRef()
  const defaultAccountRef = useRef()

  function handleModalClose(e) {
    setCategoryTitle(null)
    setCategoryColor(null)
    setPaymentAmountType(null)
    setFixedAmount(null)
    setMinAmount(null)
    setMaxAmount(null)
    setDefaultAccount(null)
    setDescription(null)
    setCategoryColor(null)
  }

  async function handleFormSubmit(categoryID) {
    submitButtonRef.current.disabled = true
    try {
      const updatePaymentCategoryRequest = await api.post(
        "business/payment-categories/update/" + categoryID,
        {
          title: categoryTitle ? categoryTitle : data.title,
          color: categoryColor ? categoryColor : data.color,
          type: paymentAmountType ? paymentAmountType : data.type,
          amount: fixedAmount ? parseFloat(fixedAmount) : data.amount,
          min_amount: minAmount ? parseFloat(minAmount) : data.min_amount,
          max_amount: maxAmount ? parseFloat(maxAmount) : data.max_amount,
          default_account: defaultAccount
            ? defaultAccount
            : data.default_account,
          description: description ? description : data.description,
        }
      )
      if (updatePaymentCategoryRequest.status == "200") {
        setStatusCode(1)
        setStatusMessage("Payment Category Updated Successfully")
        setToastOpen(true)
        setTimeout(() => {
          setToastOpen(false)
          setShowStatus(false)
          closeModalRef.current.click()
          getPaymentCategories()
        }, 1500)
      }
    } catch (err) {
      //   console.log(err.response)
      setStatusCode(0)
      setShowStatus(true)
      setStatusMessage(err.message)
    }
  }

  function checkFormDataChange() {
    const arr1 = [
      categoryTitleRef,
      categoryColorRef,
      paymentAmountTypeRef,
      fixedAmountRef,
      minAmountRef,
      maxAmountRef,
      defaultAccountRef,
      descriptionRef,
    ]
    const arr2 = [
      data.title,
      data.color,
      data.type,
      data.amount,
      data.min_amount,
      data.max_amount,
      data.default_account,
      data.description,
    ]

    for (let i = 0; i < arr1.length; i++) {
      if (
        arr1[i].current &&
        arr1[i].current.value.toString().toLowerCase() !==
          arr2[i].toString().toLowerCase()
      ) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    setShowBtn(false)
    checkFormDataChange() ? setShowBtn(true) : setShowBtn(false)
  })

  return (
    <>
      <Toast
        state={toastOpen}
        severity="success"
        message="Payment Category Updated Successfully"
      />

      {/* Modal Close Button */}
      <span
        className="p-3"
        style={{
          position: "sticky",
          float: "right",
          marginTop: "-10%",
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

      {/* Form */}
      <form
        className={`d-flex flex-column align-items-center p-3 `}
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit(data.id)
        }}>
        {showStatus && (
          <span
            className={`badge p-3 ${
              !statusCode ? "bg-danger" : "bg-success"
            } w-100 flat-card-style`}>
            {statusMessage}
          </span>
        )}

        {/* Category Title */}
        <div className="form-floating mt-5 w-100">
          <input
            type="text"
            className="form-control"
            placeholder=" "
            value={
              categoryTitle
                ? categoryTitle
                : capitalizeFirsts(data.title.toLowerCase())
            }
            onChange={(e) => {
              setCategoryTitle(e.target.value)
            }}
            autoFocus
            required
            ref={categoryTitleRef}
          />
          <label>Category Title</label>
        </div>

        {/* Category Color */}
        <div className="input-group input-group-lg mt-5 w-100">
          <span className="input-group-text p-3">
            <div className="cp_wrapper">
              <input
                type="color"
                value={categoryColor ? categoryColor : data.color.toUpperCase()}
                onChange={(e) => setCategoryColor(e.target.value)}
                ref={categoryColorRef}
              />
            </div>
          </span>
          <input
            className="form-control"
            placeholder="Category Color"
            aria-label="Category Color"
            aria-describedby="basic-addon1"
            defaultValue={
              categoryColor ? categoryColor : data.color.toUpperCase()
            }
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
              value={
                paymentAmountType
                  ? paymentAmountType
                  : capitalizeFirsts(data.type.toLowerCase())
              }
              onChange={(e) => setPaymentAmountType(e.target.value)}
              ref={paymentAmountTypeRef}>
              <option>None</option>
              <option>Fixed</option>
              <option>Range</option>
            </select>
            <label>Payment Scheme</label>
          </div>
        </div>

        {/* Fixed Payment Amount */}
        {(data.type === "fixed" || paymentAmountType === "Fixed") && (
          <div className="form-floating mt-5 fadeIn w-100 flat-card-style">
            <input
              type="number"
              className="form-control"
              placeholder=" "
              value={fixedAmount ? fixedAmount : data.amount}
              onChange={(e) => setFixedAmount(e.target.value)}
              ref={fixedAmountRef}
            />
            <label>Fixed Amount</label>
          </div>
        )}

        {/* Range Payment Amout */}
        {(data.type === "range" || paymentAmountType === "Range") && (
          <div className={`container-fluid mt-5 flat-card-style fadeIn w-100`}>
            <div className="row p-3 ">
              <div className="col col-6">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control border-bottom"
                    placeholder=" "
                    value={minAmount ? minAmount : data.min_amount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    ref={minAmountRef}
                  />
                  <label className="">Minimum Amount</label>
                </div>
              </div>
              <div className="col col-6 ">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control border-bottom"
                    placeholder=" "
                    value={maxAmount ? maxAmount : data.max_amount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    ref={maxAmountRef}
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
              ref={defaultAccountRef}
              className="form-select flat-card-style"
              value={defaultAccount ? defaultAccount : data.default_account}
              onChange={(e) => {
                setDefaultAccount(e.target.value)
              }}
              required>
              <option value={"wallet"}>Wallet</option>
              {savedBankAccounts &&
                savedBankAccounts.map(
                  (account, index) =>
                    account.active && (
                      <option key={index} value={account.id}>
                        {capitalizeFirsts(
                          `${account.bank_name} - ${account.account_name} - ${account.account_number}`.toLocaleLowerCase()
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
            value={description ? description : data.description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            ref={descriptionRef}
          />
          <label>Category Description</label>
        </div>

        {/* Button */}
        {showBtn ? (
          <div className="d-flex mt-5 mb-3 justify-content-center align-items-center">
            <button
              ref={submitButtonRef}
              className="btn btn-block fw-bolder zoomIn d-flex justify-content-center align-items-center text fs-6"
              type="submit"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              }}>
              <Icon>payments</Icon>
              <span className="ms-2 text-nowrap text-align-center">
                Update Category
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
