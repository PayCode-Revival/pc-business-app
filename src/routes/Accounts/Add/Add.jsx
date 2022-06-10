import { useState } from "react"
import { allBanks } from "../../../statics/allBanks"
import { generateRandomNumber } from "../../../statics/allFunctions"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { Icon } from "@mui/material"
export default function Add() {
  const [accountName, setAccountName] = useState(false)

  return (
    <>
      <SectionHeader text={"Add New Bank Account"} />
      <div id="add-account" className="container-fluid flat-card-style">
        <div className="row p-4 justify-content-center">
          <div id="top-up-wallet-form" className="col col-5 flat-card-style">
            <span className="h5 d-flex justify-content-center align-items-center mt-3 text-white fw-bolder">
              Bank Account Information
            </span>
            <div className="p-3">
              {/* Select Bank */}
              <div className="form-floating mt-3">
                <select
                  className="form-select scrollbar"
                  id="select-bank"
                  aria-label="Select Bank">
                  {allBanks.map((bank, index) => {
                    return (
                      <option key={index} className="mb-2">
                        {bank.Name}
                      </option>
                    )
                  })}
                </select>
                <label htmlFor="select-bank">Select Bank</label>
              </div>

              {/* Account Number */}
              <div className="form-floating mt-5">
                <input
                  type=""
                  className="form-control"
                  id="account-number"
                  placeholder="Account Number"
                />
                <label htmlFor="account-number">Account Number</label>
              </div>

              {/* Account Name */}
              {accountName && (
                <div className="form-floating mt-5">
                  <input
                    type=""
                    className="form-control"
                    id="account-name"
                    placeholder="Account Name"
                    readOnly
                  />
                  <label htmlFor="account-name">Account Name</label>
                </div>
              )}

              {/* Submit Button */}
              <div className="d-grid gap-2 col-6 mx-auto mt-5 mb-3">
                <button
                  className="btn btn-block text-white fw-bolder zoomIn d-flex justify-content-center align-items-center"
                  type="button"
                  style={{ backgroundColor: "var(--accent-color)" }}>
                  <Icon>account_balance</Icon>
                  <span className="ms-1 text-nowrap text-align-center">
                    Add Bank Account
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
