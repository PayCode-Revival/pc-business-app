import { Icon } from "@mui/material"
import { useContext, useState } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import {
  capitalizeFirsts,
  retrievingPlaceholder,
} from "../../../statics/allFunctions"
import Modal from "../../../components/Modal/Modal"
import UpdateForm from "../UpdateForm"
import "./Manage.css"
import { useEffect } from "react"
import { api } from "../../../statics/api"
import Toast from "../../../components/Toast/Toast"

export default function Manage() {
  const { savedBankAccounts, getSavedBankAccounts } = useContext(ApiDataContext)
  const [modalTitle, setModalTitle] = useState("Edit Account")
  const [modalBody, setModalBody] = useState(retrievingPlaceholder)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastSeverity, setToastSeverity] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  async function deleteAccount(accountID) {
    // API Call To Delete Account
    try {
      const deleteAccountRequest = await api(
        `business/bank-accounts/delete/${accountID}`,
        "post"
      )

      if (
        deleteAccountRequest.status == "200" ||
        deleteAccountRequest.status == "201"
      ) {
        setToastMessage("Bank Account Deleted Successfully")
        setToastSeverity("success")
        setToastOpen(true)
        setTimeout(() => {
          setToastOpen(false)
          getSavedBankAccounts()
        }, 1500)
      }
    } catch (err) {
      setToastOpen(false)
      setToastSeverity("error")
      setToastMessage(err.message)
    }
  }

  async function toggleAccountState(accountID, state) {
    // API Call To Toggle Account
    try {
      const toggleAccountStateRequest = await api(
        `business/bank-accounts/toggle/${accountID}?state=${state}`,
        "post"
      )

      if (
        toggleAccountStateRequest.status == "200" ||
        toggleAccountStateRequest.status == "201"
      ) {
        setToastMessage("Bank Account State Updated Successfully")
        setToastSeverity("success")
        setToastOpen(true)
        setTimeout(() => {
          setToastOpen(false)
          getSavedBankAccounts()
        }, 1500)
      }
    } catch (err) {
      console.log(err.response)
      setToastOpen(true)
      setToastSeverity("error")
      setToastMessage(err.message)
    }
  }

  return (
    <>
      <Toast
        state={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
      />

      <Modal
        title={modalTitle}
        body={modalBody}
        showFooter={false}
        showCloseIcon={false}
      />

      <SectionHeader text={"Manage Saved Accounts"} />
      <div
        id="manage-accounts"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center">
          {savedBankAccounts ? (
            savedBankAccounts.length ? (
              savedBankAccounts.map((account, index) => {
                account.active = Number(account.active)
                let toggleActivationColor = account.active
                  ? "var(--danger-color)"
                  : "green"
                return (
                  <span key={index} className="d-flex justify-content-center">
                    <div
                      className="col col-10 p-3 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn"
                      role={"button"}>
                      <div className="d-flex flex-column" role={"button"}>
                        <span className="fw-bolder text text-nowrap fs-4">
                          {capitalizeFirsts(account.account_name.toLowerCase())}
                        </span>
                        <div className="divider"></div>
                        <span
                          className="text"
                          style={{
                            color: "var(--primary-color",
                            fontSize: "0.9vw",
                          }}>
                          {account.account_name} | {account.account_number} |{" "}
                          {
                            <span
                              className={`badge ${
                                account.active ? "bg-success" : "bg-danger"
                              }`}>
                              {account.active ? "ACTIVE" : "INACTIVE"}
                            </span>
                          }{" "}
                          |{" "}
                          {
                            <span
                              className={`badge ${
                                account.verfied ? "bg-success" : "bg-danger"
                              }`}>
                              {account.verfied ? "VERIFIED" : "UNVERIFIED"}
                            </span>
                          }
                        </span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        {/* Edit Button */}
                        <div
                          className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2 btn flat-card-style"
                          role={"button"}
                          data-mdb-toggle="modal"
                          data-mdb-target={"#exampleModal"}
                          onClick={() => {
                            setModalTitle("Edit Account")
                            setModalBody(<UpdateForm data={account} />)
                          }}>
                          <Icon style={{ color: "var(--primary-color" }}>
                            edit
                          </Icon>
                          <span className="text m-2" role={"button"}>
                            Edit
                          </span>
                        </div>

                        {/* Delete Button */}
                        <div
                          className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2 btn flat-card-style"
                          data-mdb-toggle="modal"
                          data-mdb-target="#exampleModal"
                          onClick={() => {
                            setModalTitle("Delete Bank Account")

                            setModalBody(
                              <>
                                <span className="d-flex flex-column justify-content-center align-items-center p-4 ">
                                  <Icon
                                    style={{ color: "var(--danger-color)" }}>
                                    error
                                  </Icon>
                                  <span className="ms-2 fs-6 fw-bolder align-self-end me-5">
                                    Are You Sure You Want To Delete (
                                    {account.account_name}
                                    )?
                                  </span>
                                  <div className="d-flex align-self-end me-5">
                                    <button
                                      className="btn btn-danger mt-3"
                                      data-mdb-dismiss="modal">
                                      Cancel
                                    </button>

                                    <button
                                      data-mdb-dismiss="modal"
                                      className="btn btn-primary mt-3 ms-3"
                                      onClick={() => {
                                        deleteAccount(account.id)
                                      }}>
                                      Delete
                                    </button>
                                  </div>
                                </span>
                              </>
                            )
                          }}>
                          <Icon style={{ color: "var(--danger-color)" }}>
                            delete
                          </Icon>
                          <span className="text m-2" role={"button"}>
                            Delete
                          </span>
                        </div>

                        {/* Activate/Deactivate Button */}
                        <div
                          className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2 btn flat-card-style"
                          data-mdb-toggle="modal"
                          data-mdb-target="#exampleModal"
                          onClick={() => {
                            setModalTitle(
                              account.active
                                ? "Deactivate"
                                : " Activate" + " Bank Account"
                            )

                            setModalBody(
                              <span className="d-flex flex-column justify-content-center align-items-center p-4 ">
                                <span className="ms-2 fs-6 fw-bolder align-self-end me-5 d-flex align-items-center fadeIn">
                                  <Icon
                                    style={{ color: toggleActivationColor }}>
                                    {account.active ? "cancel" : "check"}
                                  </Icon>
                                  <span className="fadeIn">
                                    Are You Sure You Want To{" "}
                                    {account.active
                                      ? " Deactivate "
                                      : " Activate "}
                                    ({account.account_name})?
                                  </span>
                                </span>
                                <div className="d-flex align-self-end me-5">
                                  <button
                                    className="btn btn-danger mt-3"
                                    data-mdb-dismiss="modal">
                                    Cancel
                                  </button>

                                  <button
                                    data-mdb-dismiss="modal"
                                    className="btn btn-primary mt-3 ms-3"
                                    onClick={() => {
                                      toggleAccountState(
                                        account.id,
                                        account.active
                                      )
                                    }}>
                                    {account.active
                                      ? " Deactivate "
                                      : " Activate "}
                                  </button>
                                </div>
                              </span>
                            )
                          }}>
                          <Icon style={{ color: toggleActivationColor }}>
                            {account.active ? "cancel" : "check"}
                          </Icon>
                          <span className="text m-2" role={"button"}>
                            {account.active ? "Deactivate" : "Activate"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </span>
                )
              })
            ) : (
              <span className="fs-4 text-danger fw-bolder d-flex justify-content-center">
                No Saved Account Found
              </span>
            )
          ) : (
            retrievingPlaceholder
          )}
        </div>
      </div>
    </>
  )
}
