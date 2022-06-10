import React, { useState } from "react"
import "./Withdraw.css"
import "./../../../assets/css/styles-dark-mode.css"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { generateRandomNumber } from "../../../statics/allFunctions"
import { appConfig } from "../../../statics/config"

export default function TopUp() {
  const [amountInput, setAmountInput] = useState("")
  const [amountWarning, setAmountWarning] = useState(
    `Enter An Amount Between ${appConfig.minDeposit.toLocaleString()} & ${appConfig.maxDeposit.toLocaleString()}`
  )
  const handleAmountInput = (val) => {
    let parsedVal = Number(val.replace(/,/gi, ""))
    if (parsedVal <= appConfig.maxDeposit) {
      setAmountWarning(
        "Amount Value Must Be Less Than " +
          appConfig.maxDeposit.toLocaleString()
      )
      setAmountInput(parsedVal.toLocaleString())
    }
  }
  return (
    <>
      <SectionHeader text={"Withdraw From Wallet"} />
      <div id="top-up" className="container-fluid flat-card-style">
        <div className="row g-5 p-5 justify-content-center">
          <div id="top-up-wallet-form" className="col col-6 flat-card-style">
            <div className="p-3">
              {/* Amount */}
              <>
                <div className="input-group input-group-lg mb-2">
                  <span className="input-group-text fw-bolder border-none outline-none">
                    ₦
                  </span>
                  <input
                    autoFocus
                    type={"text"}
                    className="form-control"
                    aria-label="Amount"
                    value={amountInput}
                    onInput={(e) => handleAmountInput(e.target.value)}
                  />
                </div>
                <span
                  className="text-light h6 text-nowrap ps-1 py-2 px-1"
                  style={{ fontSize: "1vw" }}>
                  {amountWarning}
                </span>
              </>

              {/* Select Card */}
              <div class="form-floating mt-5">
                <select
                  class="form-select"
                  id="select-card"
                  aria-label="Select Account">
                  <option selected>Select A Saved Account...</option>
                  <option value="1">Account One</option>
                  <option value="2">Account Two</option>
                  <option value="3">Account Three</option>
                </select>
                <label for="select-card">Select Bank Account</label>
              </div>

              {/* Submit Button */}
              <div class="d-grid gap-2 col-6 mx-auto mt-5">
                <button
                  class="btn btn-block text-white fw-bolder zoomIn"
                  type="button"
                  style={{ backgroundColor: "var(--accent-color)" }}>
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="col col-4">
            <div
              id="wallet-balance"
              className="p-3 flat-card-style p-3 flat-card-style">
              <span className="h6 text-muted text-nowrap d-block">
                Wallet Balance
              </span>
              <span
                className="fw-bolder h4 text-light text-nowrap"
                style={{ letterSpacing: "2.5px" }}>
                ₦{generateRandomNumber(168870, 100000000).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
