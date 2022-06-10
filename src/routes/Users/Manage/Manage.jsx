import { Icon } from "@mui/material"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { users } from "../../../statics/demoData"
import "./Manage.css"
export default function Manage() {
  return (
    <>
      <SectionHeader text={"Manage Users"} />
      <div
        id="manage-categories"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center">
          {users.map((user, index) => {
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
                    <span className="text-light ms-2 h4 m-auto">
                      {user.firstName} {user.lastName}
                    </span>
                  </span>
                  <hr />
                  <span className="d-flex p-2 fw-bolder text-muted">
                    {user.username} | {user.email}
                  </span>
                </div>
                <div className="d-flex justify-content-center align-items-center ">
                  <div
                    className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                    role={"button"}>
                    <Icon style={{ color: "var(--primary-color" }}>edit</Icon>
                    <span className="text-light m-2" role={"button"}>
                      Edit
                    </span>
                  </div>
                  <div className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2">
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
