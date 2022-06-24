import React, { useState, useEffect, useRef, useContext } from "react"
import { Icon } from "@mui/material"
import { SectionHeader } from "../../components/SectionHeader/SectionHeader"
import { Nuban, ACCOUNT_NUMBER_LENGTH } from "../../statics/NubanValidator"
import {
  capitalizeFirsts,
  retrievingPlaceholder,
} from "../../statics/allFunctions"
import { api } from "../../statics/api"
import { useNavigate } from "react-router-dom"
import Toast from "../../components/Toast/Toast"
import { ApiDataContext } from "../../contexts/ApiDataContext"

export default function UpdateForm({ data }) {
  const { getSavedBankAccounts } = useContext(ApiDataContext)
  const allBanks = Nuban.allBankNames()
  const closeModalRef = useRef()

  const [bankName, setBankName] = useState(null)
  const [accountNumber, setAccountNumber] = useState(null)
  const [accountName, setAccountName] = useState(null)
  const [isValidAccountInfo, setIsValidAccountInfo] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [accountInfoError, setAccountInfoError] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const accountNumberValidator = new Nuban()

  function handleModalClose(e) {
    setBankName(null)
    setAccountNumber(null)
    setAccountName(null)
    setAccountInfoError(null)
  }

  // Handle Account Information Change
  async function handleAccountInfoChange(
    currentAccountNumber,
    currentBankName
  ) {
    currentAccountNumber = accountNumber ? accountNumber : data.account_number
    currentBankName = bankName ? bankName : data.bank_name

    if (
      String(currentAccountNumber) !== String(data.account_number) ||
      currentBankName !== data.bank_name
    ) {
      if (String(currentAccountNumber).length === ACCOUNT_NUMBER_LENGTH) {
        accountNumberValidator.setAccountNumber(currentAccountNumber)
        if (accountNumberValidator.isValidForBankName(currentBankName)) {
          setIsValidAccountInfo(true)
          setAccountInfoError("Retrieving Account Details")

          // API Call For Account Name
          try {
            const accountDetails = await api.get(
              `nuban/${currentAccountNumber}?bank_code=${Nuban.bankCode(
                currentBankName.toUpperCase()
              )}`
            )
            setAccountName(accountDetails.data[0].account_name)
            setAccountInfoError(null)
            setShowBtn(true)
          } catch (err) {
            // console.log(err.message)
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
    } else {
      setAccountInfoError("Change Account Information To Update")
    }
  }

  // Handle Form Submit
  async function handleFormSubmit(accountId) {
    if (accountName) {
      setShowBtn(false)
      try {
        const submitAccountInfo = await api.post(
          "business/bank-accounts/update/" + accountId,
          {
            header: {},
            bank_name: bankName ? bankName : data.bank_name,
            account_number: accountNumber ? accountNumber : data.account_number,
            account_name: accountName ? accountName : data.account_name,
          }
        )
        if (
          submitAccountInfo.status == 200 ||
          submitAccountInfo.status == 201
        ) {
          setBankName(allBanks[0])
          setAccountNumber(null)
          setAccountName(null)
          setShowToast(true)
          setAccountInfoError(null)
          setTimeout(() => {
            setShowToast(false)
          }, 1000)
          closeModalRef.current.click()
          setTimeout(() => {
            getSavedBankAccounts()
          }, 1500)
        }
      } catch (err) {
        console.log(err.response)
        if (err.response.status == 409) {
          setAccountInfoError("Account Already Exists")
        }
      }
      setShowBtn(true)
    }
  }

  useEffect(() => {
    handleAccountInfoChange()
  }, [accountNumber, bankName])

  return (
    <>
      <span
        className="p-3"
        style={{
          position: "sticky",
          float: "right",
          marginTop: "-11%",
          right: "17%",
        }}>
        <button
          ref={closeModalRef}
          className="btn btn-danger fw-bolder"
          type="button"
          data-mdb-dismiss="modal"
          onClick={() => {
            handleModalClose()
          }}>
          Close
        </button>
      </span>

      <Toast state={showToast} message="Account Successfully Updated" />

      <form
        noValidate
        className={`d-flex flex-column align-items-center p-3 needs-validation`}
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit(data.id)
        }}>
        <SectionHeader text={"Update Account Information"} />

        {/* Account Error Message */}
        {accountInfoError && (
          <span
            className={`badge p-3 ${
              accountInfoError !== "Retrieving Account Details"
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
                ? bankName
                : capitalizeFirsts(data.bank_name.toLowerCase())
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
            value={accountNumber ? accountNumber : data.account_number}
            onChange={(e) => {
              setAccountNumber(e.target.value)
            }}
            minLength={ACCOUNT_NUMBER_LENGTH}
            maxLength={ACCOUNT_NUMBER_LENGTH}
            required
          />
          <label>Account Number</label>
        </div>

        {/* Account Name */}
        <div className="form-floating mt-5 w-100 fadeIn">
          <input
            type="text"
            className="form-control flat-card-style zoomIn"
            placeholder="Account Name"
            value={accountName ? accountName : data.account_name}
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

        {/* Button */}
        {showBtn && !accountInfoError && (
          <div className="d-flex mt-5 rounded w-50">
            <button
              className="btn btn-block text-white fw-bolder zoomIn d-flex justify-content-center align-items-center p-2 fs-6"
              type="submit"
              style={{ backgroundColor: "var(--accent-color)" }}>
              <Icon>account_balance</Icon>
              <span className="ms-2 text-nowrap text-align-center">
                Update Account
              </span>
            </button>
          </div>
        )}
      </form>
    </>
  )
}
