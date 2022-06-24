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
  const [cancelBtnText, setCancelBtnText] = useState("Cancel")
  const [saveBtnText, setSaveBtnText] = useState("Save")
  const [showModalFooter, setShowModalFooter] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [navigateAfterClose, setNavigateAfterClose] = useState(false)

  function toggleToast(state) {
    setToastOpen(state ? state : !toastOpen)
  }

  async function handleSaveBtn(accountNumber) {
    // API Call To Delete Account
    try {
      const deleteAccountRequest = await api.post(
        `business/bank-accounts/delete/${accountNumber}`
      )
    } catch (err) {}
  }

  useEffect(() => {
    async function requestSavedBankAccounts() {
      await getSavedBankAccounts()
    }
    requestSavedBankAccounts()
  }, [])

  return (
    <>
      <Toast
        state={toastOpen}
        severity="error"
        message="Account Deleted Successfully"
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
                    <Modal
                      title={modalTitle}
                      body={modalBody}
                      cancelBtnText={cancelBtnText}
                      saveBtnText={saveBtnText}
                      showFooter={showModalFooter}
                      showCloseIcon={false}
                      saveBtnOnClickFunc={() => handleSaveBtn(account.id)}
                      toastFunc={toggleToast}
                    />
                    <div
                      className="col col-10 p-3 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn"
                      role={"button"}>
                      <div className="d-flex flex-column" role={"button"}>
                        <span className="fw-bolder h5">
                          {capitalizeFirsts(account.account_name.toLowerCase())}
                        </span>
                        <span className="text-light">
                          {capitalizeFirsts(account.bank_name.toLowerCase())} |{" "}
                          {account.account_number} |{" "}
                          {
                            <span
                              className={`badge ${
                                account.active ? "bg-success" : "bg-danger"
                              }`}>
                              {account.active ? "ACTIVE" : "INACTIVE"}
                            </span>
                          }
                        </span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <div
                          className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2 btn flat-card-style"
                          role={"button"}
                          data-mdb-toggle="modal"
                          data-mdb-target={"#exampleModal"}
                          onClick={() => {
                            setModalTitle("Edit Account")
                            setModalBody(<UpdateForm data={account} />)
                            setShowModalFooter(false)
                          }}>
                          <Icon style={{ color: "var(--primary-color" }}>
                            edit
                          </Icon>
                          <span className="text-light m-2" role={"button"}>
                            Edit
                          </span>
                        </div>
                        <div
                          className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2 btn flat-card-style"
                          data-mdb-toggle="modal"
                          data-mdb-target="#exampleModal"
                          onClick={() => {
                            setModalTitle("Delete Bank Account")
                            setSaveBtnText("Delete")
                            setShowModalFooter(true)
                            setModalBody(
                              <span className="d-flex justify-content-center align-items-center">
                                <Icon style={{ color: "var(--danger-color)" }}>
                                  error
                                </Icon>
                                <span
                                  className="ms-2 fs-5"
                                  style={{ color: "var(--primary-color)" }}>
                                  Are You Sure You Want To Delete (
                                  {account.account_name}
                                  )?
                                </span>
                              </span>
                            )
                            setNavigateAfterClose("./")
                          }}>
                          <Icon style={{ color: "var(--danger-color)" }}>
                            delete
                          </Icon>
                          <span className="text-light m-2" role={"button"}>
                            Delete
                          </span>
                        </div>

                        <div
                          className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2 btn flat-card-style"
                          data-mdb-toggle="modal"
                          data-mdb-target="#exampleModal"
                          onClick={() => {
                            setModalTitle("Delete Payment Category")
                            setSaveBtnText("Delete")
                            setShowModalFooter(true)
                            setModalBody(
                              <span className="d-flex justify-content-center align-items-center">
                                <Icon style={{ color: toggleActivationColor }}>
                                  {account.active ? "cancel" : "check"}
                                </Icon>
                                <span className="ms-2 fs-5 fw-bolder">
                                  Are You Sure You Want To{" "}
                                  {account.active
                                    ? " Deactivate "
                                    : " Activate "}
                                  ({account.account_name})?
                                </span>
                              </span>
                            )
                          }}>
                          <Icon style={{ color: toggleActivationColor }}>
                            {account.active ? "cancel" : "check"}
                          </Icon>
                          <span className="text-light m-2" role={"button"}>
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
