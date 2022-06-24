import { Icon } from "@mui/material"
import { useContext, useState } from "react"
import Modal from "../../../components/Modal/Modal"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import { retrievingPlaceholder } from "../../../statics/allFunctions"
import Form from "../Form"
import "./Manage.css"
export default function Manage() {
  const { userAccounts } = useContext(ApiDataContext)
  const [modalTitle, setModalTitle] = useState("Edit User")
  const [modalBody, setModalBody] = useState(retrievingPlaceholder)
  const [cancelBtnText, setCancelBtnText] = useState("Cancel")
  const [saveBtnText, setSaveBtnText] = useState("Save")
  const [showModalFooter, setShowModalFooter] = useState(false)

  return (
    <>
      <SectionHeader text={"Manage Users"} />
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
          {userAccounts
            ? userAccounts.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="col col-9 p-4 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn btn "
                    role={"button"}>
                    <div className="d-flex flex-column" role={"button"}>
                      <span className="d-flex align-items-center p-2">
                        <img
                          className="img-fluid border border-3 rounded"
                          src={`https://picsum.photos/200?random=${index}`}
                          style={{ width: "20%" }}
                        />
                        <span
                          className="ms-2 h4 m-auto"
                          style={{ color: "var(--cruise-color)" }}>
                          {user.first_name} {user.last_name}
                        </span>
                      </span>
                      <hr />
                      <span
                        className="d-flex p-2 fw-bolder"
                        style={{ color: "var(--primary-color)" }}>
                        {user.username} | {user.email}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center ">
                      <div
                        className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                        style={{ display: "relative" }}
                        role={"button"}
                        data-mdb-toggle="modal"
                        data-mdb-target={"#exampleModal"}
                        onClick={() => {
                          setModalTitle("Edit User")
                          setModalBody(
                            <Form
                              data={user}
                              formTitle={"Edit User"}
                              mode="update"
                              iconName="update"
                              buttonTitle="Update User"
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
                          setModalTitle("Delete User")
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
                                {user.first_name + " " + user.last_name})?
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
            : retrievingPlaceholder}
        </div>
      </div>
    </>
  )
}
