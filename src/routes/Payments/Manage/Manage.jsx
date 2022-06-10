import { Icon } from "@mui/material"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { paymentCategories } from "../../../statics/demoData"
import { invertHex } from "../../../statics/allFunctions"
import "./Manage.css"
export default function Manage() {
  return (
    <>
      <SectionHeader text={"Manage Saved Payment Categories"} />
      <div
        id="manage-categories"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center">
          {paymentCategories.map((category, index) => {
            return (
              <div
                key={index}
                className="col col-9 p-4 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn btn "
                role={"button"}>
                <div className="d-flex flex-column " role={"button"}>
                  <span className="fw-bolder h5">
                    <span
                      className="p-1 me-2 rounded h-50"
                      style={{
                        backgroundColor: `${category.color}`,
                      }}></span>
                    {category.title}
                  </span>
                  <hr />
                  <span className="text-light">
                    {Object.values(category).map((subCategory, subIndex) => {
                      return (
                        <span key={subIndex} className="text-white">
                          {subCategory &&
                            subCategory[0] !== "#" &&
                            Object.keys(category)[subIndex] !== "title" &&
                            `${
                              !isNaN(subCategory)
                                ? "₦" + subCategory.toLocaleString()
                                : subCategory.toUpperCase()
                            }`}

                          {subCategory &&
                            subCategory[0] !== "#" &&
                            Object.keys(category)[subIndex] !== "title" &&
                            subIndex < Object.keys(category).length - 1 &&
                            ` | `}
                        </span>
                      )
                    })}
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
