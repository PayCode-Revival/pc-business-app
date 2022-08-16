import {} from "react"
import { Icon } from "@mui/material"
import { useContext, useState } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import {
  capitalizeFirstLetter,
  capitalizeFirsts,
  currency,
  retrievingPlaceholder,
} from "../../../statics/allFunctions"
import Modal from "../../../components/Modal/Modal"
import "./Manage.css"
import UpdateForm from "../UpdateForm"
import Toast from "../../../components/Toast/Toast"
import { api } from "../../../statics/api"

export default function Manage() {
  let { paymentCategories, getPaymentCategories, savedBankAccounts } =
    useContext(ApiDataContext)

  function getBankAccountName(id) {
    for (let i = 0; i < savedBankAccounts.length; i++) {
      if (id == savedBankAccounts[i].id) {
        return (
          savedBankAccounts[i].bank_name +
          " - " +
          savedBankAccounts[i].account_name
        )
      }
    }
    return false
  }

  const [modalTitle, setModalTitle] = useState("Edit Category")
  const [modalBody, setModalBody] = useState(retrievingPlaceholder)
  const [cancelBtnText, setCancelBtnText] = useState("Cancel")
  const [saveBtnText, setSaveBtnText] = useState("Save")
  const [toastOpen, setToastOpen] = useState(false)
  const [toastSeverity, setToastSeverity] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  async function deletePaymentCategory(id) {
    // console.log(paymentID)
    try {
      const deletePaymentCategoryRequest = await api(
        "business/payment-categories/delete/" + id,
        "post"
      )
      if (
        deletePaymentCategoryRequest.status == "200" ||
        deletePaymentCategoryRequest.status == "201"
      ) {
        setToastMessage("Payment Category Deleted Successfully")
        setToastSeverity("success")
        setToastOpen(true)
        setTimeout(() => {
          setToastOpen(false)
          getPaymentCategories()
        }, 1500)
      }
    } catch (err) {
      setToastOpen(false)
      setToastSeverity("error")
      setToastMessage(err.message)
      setTimeout(() => {
        setToastOpen(false)
      }, 1500)
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
        cancelBtnText={cancelBtnText}
        saveBtnText={saveBtnText}
        saveBtnOnClickFunc={deletePaymentCategory}
      />

      <div
        id="manage-categories"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar fadeIn">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center fadeIn">
          {paymentCategories ? (
            paymentCategories.length ? (
              paymentCategories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="col col-9 p-4 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn btn fadeIn"
                    role={"button"}>
                    <div className="d-flex flex-column p-3" role={"button"}>
                      <span className="fw-bolder h3 d-flex">
                        <span
                          className="p-1 me-2 rounded"
                          style={{
                            backgroundColor: `${category.color}`,
                          }}></span>
                        <span className="text">{category.title}</span>
                      </span>
                      <div className="divider mb-3"></div>
                      <span
                        className="d-flex justify-content-start"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "0.75vw",
                        }}>
                        {/* Payment Type */}
                        {category.type.toLowerCase() !== "none" &&
                          capitalizeFirstLetter(
                            category.type.toLowerCase() + " | "
                          )}

                        {/* Fixed Amount */}
                        {category.type.toLowerCase() === "fixed" &&
                          category.amount &&
                          currency(category.amount) + " | "}

                        {/* Minimum Amount */}
                        {category.type.toLowerCase() === "range" &&
                          category.min_amount &&
                          currency(category.min_amount) + " | "}

                        {/* Maximum Amount */}
                        {category.type.toLowerCase() === "range" &&
                          category.max_amount &&
                          currency(category.max_amount) + " | "}

                        {/* Default Account */}
                        {category.default_account.toLowerCase() == "wallet"
                          ? "Wallet | "
                          : `${getBankAccountName(
                              category.default_account
                            )} | `}

                        {/* Description */}
                        {category.description &&
                          capitalizeFirsts(category.description)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-center align-items-center ">
                      {/* Edit */}
                      <div
                        className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                        role={"button"}
                        data-mdb-toggle="modal"
                        data-mdb-target={"#exampleModal"}
                        onClick={() => {
                          setModalTitle("Edit Category")
                          setModalBody(
                            <UpdateForm
                              data={category}
                              showFormTitle={false}
                              mode="update"
                              iconName="update"
                              buttonTitle="Update Category"
                            />
                          )
                        }}>
                        <Icon style={{ color: "var(--primary-color" }}>
                          edit
                        </Icon>
                        <span className="text m-2" role={"button"}>
                          Edit
                        </span>
                      </div>

                      {/* Delete */}
                      <div
                        className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                        onClick={() => {
                          setModalTitle("Delete Payment Category")
                          setSaveBtnText("Delete")
                          setModalBody(
                            <>
                              <span className="d-flex flex-column justify-content-center align-items-center p-4">
                                <span className="d-flex align-items-center ms-2 fs-6 fw-bolder align-self-end me-5">
                                  <Icon
                                    style={{ color: "var(--danger-color)" }}>
                                    error
                                  </Icon>
                                  <span className="ms-2">
                                    Are You Sure You Want To Delete (
                                    {category.title}
                                    )?
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
                                      deletePaymentCategory(category.id)
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
                        <span
                          className="text m-2"
                          role={"button"}
                          style={{ color: "var(--primary-color)" }}>
                          Delete
                        </span>
                      </div>

                      {/* Delete */}
                      <div
                        className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                        onClick={() => {
                          setModalTitle("QR Code")
                          setSaveBtnText("Save")
                          setModalBody(<>QR Generated...</>)
                        }}>
                        <Icon style={{ color: "var(--primary-color)" }}>
                          qr_code
                        </Icon>
                        <span
                          className="text m-2"
                          role={"button"}
                          style={{ color: "var(--primary-color)" }}>
                          QR Code
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <span className="fs-4 text-danger fw-bolder d-flex justify-content-center">
                No Saved Payment Categories Found
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
