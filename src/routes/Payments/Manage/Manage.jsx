import { useEffect } from "react"
import { Icon } from "@mui/material"
import { useContext, useState } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import {
  currency,
  localeStringHelper,
  retrievingPlaceholder,
} from "../../../statics/allFunctions"
import Modal from "../../../components/Modal/Modal"
import "./Manage.css"
import UpdateForm from "../UpdateForm"

export default function Manage() {
  let { paymentCategories, getPaymentCategories } = useContext(ApiDataContext)

  useEffect(() => {
    getPaymentCategories()
  }, [])

  // Parse Payment Categories
  if (paymentCategories) {
    paymentCategories = paymentCategories.map((category) => {
      return {
        id: category.id,
        color: category.color,
        title: category.title,
        amount: category.amount,
        type: category.type,
        min_amount: category.min_amount,
        max_amount: category.max_amount,
        description: category.description,
        created_at: localeStringHelper(category.created_at, 1),
        updated_at: localeStringHelper(category.updated_at, 1),
      }
    })
  }

  function processSubCategory(category) {
    const excludedOutputs = [
      "id",
      "title",
      "color",
      "created_at",
      "updated_at",
      "type",
    ]
    const objectKeys = Object.keys(category)
    const objectValues = Object.values(category)
    let output = ``
    for (let i = 0; i < objectValues.length; i++) {
      // Parse Output
      if (objectValues[i] && !excludedOutputs.includes(objectKeys[i])) {
        output += !isNaN(objectValues[i])
          ? currency(objectValues[i])
          : objectValues[i]

        // Parse Pipe Separator
        if (i > 0 && i < objectValues.length - 3) {
          output += " | "
        }
      }
    }
    return output
  }

  const [componentState, setComponentState] = useState(null)
  const [modalTitle, setModalTitle] = useState("Edit Category")
  const [modalBody, setModalBody] = useState(retrievingPlaceholder)
  const [cancelBtnText, setCancelBtnText] = useState("Cancel")
  const [saveBtnText, setSaveBtnText] = useState("Save")
  const [showModalFooter, setShowModalFooter] = useState(false)

  return (
    <>
      <SectionHeader text={"Manage Saved Payment Categories"} />
      <Modal
        title={modalTitle}
        body={modalBody}
        cancelBtnText={cancelBtnText}
        saveBtnText={saveBtnText}
        showFooter={showModalFooter}
        showCloseIcon={false}
      />
      <div
        id="manage-categories"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center">
          {paymentCategories ? (
            paymentCategories.length ? (
              paymentCategories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="col col-9 p-4 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn btn fadeIn"
                    role={"button"}>
                    <div className="d-flex flex-column p-3 " role={"button"}>
                      <span className="fw-bolder h3 d-flex">
                        <span
                          className="p-1 me-2 rounded"
                          style={{
                            backgroundColor: `${category.color}`,
                          }}></span>
                        <span className="text text-nowrap">
                          {category.title}
                        </span>
                      </span>
                      <div className="divider"></div>
                      <span
                        className="d-flex p-1"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "0.75vw",
                        }}>
                        {processSubCategory(category)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center ">
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
                        <span className="text-light m-2" role={"button"}>
                          Edit
                        </span>
                      </div>
                      <div
                        className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                        onClick={() => {
                          setModalTitle("Delete Payment Category")
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
                                {category.title})?
                              </span>
                            </span>
                          )
                        }}>
                        <Icon style={{ color: "var(--danger-color)" }}>
                          delete
                        </Icon>
                        <span className="text-light m-2" role={"button"}>
                          Delete
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
