import { Icon } from "@mui/material"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { accounts } from "../../../statics/demoData"
import "./Manage.css"
export default function Manage() {
  return (
    <>
      <SectionHeader text={"Manage Saved Accounts"} />
      <div
        id="manage-accounts"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center">
          {accounts.map((account, index) => {
            return (
              <div
                key={index}
                className="col col-8 p-3 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn"
                role={"button"}>
                <div className="d-flex flex-column" role={"button"}>
                  <span className="fw-bolder h5">{account.accountName}</span>
                  <span className="text-light">
                    {account.bankName} | {account.accountNumber}
                  </span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className="m-2 d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                    role={"button"}>
                    <Icon style={{ color: "var(--primary-color" }}>edit</Icon>
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
          })}
        </div>
      </div>
    </>
  )
}
