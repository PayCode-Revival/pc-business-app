import React, { useState } from "react"
import { Icon } from "@mui/material"
import { Nuban, ACCOUNT_NUMBER_LENGTH } from "../../statics/NubanValidator"
import {
  capitalizeFirsts,
  retrievingPlaceholder,
} from "../../statics/allFunctions"
import { api } from "../../statics/api"
import { useEffect } from "react"
import Toast from "../../components/Toast/Toast"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ApiDataContext } from "../../contexts/ApiDataContext"

export default function Form() {
  const { getSavedBankAccounts } = useContext(ApiDataContext)
  const allBanks = Nuban.allBankNames()

  const [bankName, setBankName] = useState(allBanks[0])
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState(null)

  const [isValidAccountInfo, setIsValidAccountInfo] = useState(false)
  const [accountInfoError, setAccountInfoError] = useState(null)
  const [showBtn, setShowBtn] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const accountNumberValidator = new Nuban()
  const navigate = useNavigate()

  async function handleFormSubmit() {
    let formData = {
      header: {},
      bank_name: bankName,
      account_number: accountNumber,
      account_name: accountName,
    }
    if (accountName) {
      setShowBtn(false)
      try {
        const submitAccountInfo = await api(
          "business/bank-accounts/add",
          "post",
          formData
        )
        if (
          submitAccountInfo.status == 200 ||
          submitAccountInfo.status == 201
        ) {
          getSavedBankAccounts()
          setBankName(allBanks[0])
          setAccountNumber(null)
          setAccountName(null)
          setShowToast(true)
          setAccountInfoError(null)
          getSavedBankAccounts()
          setTimeout(() => {
            setShowToast(false)
          }, 1500)
          setTimeout(() => {
            navigate("/accounts/Manage")
          }, 2000)
        }
      } catch (err) {
        // console.log(err.response.data)
        if (err.response.status == 409) {
          setAccountInfoError("Account Already Exists")
        }
      }
      setShowBtn(true)
    }
  }

  useEffect(() => {
    async function handleAccountInfoChange() {
      if (
        accountNumber &&
        accountNumber.toString().length === ACCOUNT_NUMBER_LENGTH
      ) {
        accountNumberValidator.setAccountNumber(accountNumber)
        if (accountNumberValidator.isValidForBankName(bankName)) {
          setIsValidAccountInfo(true)
          setAccountInfoError("Retrieving Account Details")
          // API Call For Account Name
          try {
            const accountDetails = await api(
              `nuban/${accountNumber}?bank_code=${Nuban.bankCode(
                bankName.toUpperCase()
              )}`
            )
            setAccountName(accountDetails.data[0].account_name)
            setAccountInfoError(null)
          } catch (err) {
            setAccountName(null)
            setIsValidAccountInfo(false)
            setAccountInfoError("No Such Account Exists")
          }
        } else {
          setAccountName(null)
          setIsValidAccountInfo(false)
          setAccountInfoError("Invalid Bank & Account Number Combination")
        }
      } else {
        setAccountName(null)
        setIsValidAccountInfo(false)
        setAccountInfoError(
          "Account Number Must Be " + ACCOUNT_NUMBER_LENGTH + " Digits"
        )
      }
    }
    handleAccountInfoChange()
  }, [accountNumber, bankName])

  return (
    <>
      <Toast state={showToast} message="Account Successfully Added" />
      <form
        noValidate
        className={`d-flex flex-column align-items-center p-3 needs-validation`}
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit()
        }}>
        {accountInfoError && (
          <span
            className={`badge p-3 ${
              accountInfoError !== "Retrieving Account Details" &&
              accountInfoError !== "Account Added Successfully"
                ? "bg-danger"
                : "bg-success"
            } w-100 flat-card-style`}>
            {accountInfoError}
          </span>
        )}

        {/* Select Bank */}
        <div className="form-floating mt-5 w-100">
          <select
            className="form-select scrollbar flat-card-style zoomIn"
            aria-label="Select Bank"
            value={
              bankName
                ? capitalizeFirsts(bankName.toLowerCase())
                : allBanks[0].name
            }
            onChange={(e) => {
              setBankName(e.target.value)
            }}
            role={"button"}>
            {allBanks.map((bank, index) => {
              return (
                <option key={index} className="mb-2">
                  {capitalizeFirsts(bank.toLowerCase())}
                </option>
              )
            })}
          </select>
          <label>Select Bank</label>
        </div>

        {/* Account Number */}
        <div className="form-floating mt-5 w-100">
          <input
            type="text"
            className="form-control flat-card-style zoomIn form-label"
            placeholder="Account Number"
            value={accountNumber ? accountNumber : ""}
            minLength={ACCOUNT_NUMBER_LENGTH}
            maxLength={ACCOUNT_NUMBER_LENGTH}
            onInput={(e) => {
              setAccountNumber(e.target.value.toString())
            }}
            required
            autoFocus
          />
          <label>Account Number</label>
        </div>

        {/* Account Name */}
        {accountName ? (
          <div className="form-floating mt-5 w-100 fadeIn">
            <input
              type="text"
              className="form-control flat-card-style zoomIn"
              placeholder="Account Name"
              value={accountName ? accountName : ""}
              onChange={(e) => setAccountName(e.target.value)}
              disabled
              readOnly
              required
              style={{
                backgroundColor: "var(--secondary-color)",
                cursor: "not-allowed",
              }}
            />
            <label>Account Name</label>
          </div>
        ) : (
          isValidAccountInfo && (
            <span className="mt-3">{retrievingPlaceholder}</span>
          )
        )}

        {/* Button */}
        {showBtn ? (
          !accountInfoError && (
            <div className="d-flex mt-5 rounded">
              <button
                className="btn btn-block text-white fw-bolder zoomIn d-flex justify-content-center align-items-center p-2"
                type="submit"
                style={{ backgroundColor: "var(--accent-color)" }}>
                <Icon>add</Icon>
                <span className="ms-2 text-nowrap text-align-center">
                  Add New Account
                </span>
              </button>
            </div>
          )
        ) : (
          <span className="mt-3">{retrievingPlaceholder}</span>
        )}
      </form>
    </>
  )
}
