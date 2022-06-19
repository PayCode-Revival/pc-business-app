import { Icon } from "@mui/material"
import { useContext } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import { retrievingPlaceholder } from "../../../statics/allFunctions"
import { accounts } from "../../../statics/demoData"
import "./Manage.css"
export default function Manage() {
  const { savedBankAccounts } = useContext(ApiDataContext)
  return (
    <>
      <SectionHeader text={"Manage Saved Accounts"} />
      <div
        id="manage-accounts"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center">
          {savedBankAccounts
            ? savedBankAccounts.map((account, index) => {
                return (
                  <div
                    key={index}
                    className="col col-8 p-3 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn"
                    role={"button"}>
                    <div className="d-flex flex-column" role={"button"}>
                      <span className="fw-bolder h5">
                        {account.account_name}
                      </span>
                      <span className="text-light">
                        {account.bank_name} | {account.account_number}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <div
                        className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                        role={"button"}>
                        <Icon style={{ color: "var(--primary-color" }}>
                          edit
                        </Icon>
                        <span className="text-light m-2" role={"button"}>
                          Edit
                        </span>
                      </div>
                      <div className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2">
                        <Icon style={{ color: "#A95C68" }}>delete</Icon>
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
