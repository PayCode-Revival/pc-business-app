import { Icon } from "@mui/material"
import { useContext } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { ApiDataContext } from "../../../contexts/ApiDataContext"
import {
  currency,
  localeStringHelper,
  retrievingPlaceholder,
} from "../../../statics/allFunctions"
import { paymentCategories as paymentCategories2 } from "../../../statics/demoData"
import "./Manage.css"
export default function Manage() {
  let { paymentCategories } = useContext(ApiDataContext)
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

  return (
    <>
      <SectionHeader text={"Manage Saved Payment Categories"} />
      <div
        id="manage-categories"
        className="container-fluid flat-card-style p-5 overflow-auto scrollbar border">
        <div className="row d-flex flex-column g-5 align-items-center justify-content-center">
          {paymentCategories
            ? paymentCategories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="col col-9 p-4 rounded secondary-flat d-flex justify-content-between align-items-center rounded zoomIn btn"
                    role={"button"}>
                    <div className="d-flex flex-column  p-3" role={"button"}>
                      <span className="fw-bolder h3 d-flex ">
                        <span
                          className="p-1 me-2 rounded"
                          style={{
                            backgroundColor: `${category.color}`,
                          }}></span>
                        <span>{category.title}</span>
                      </span>
                      <div className="divider"></div>
                      <span
                        className=""
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "1vw",
                        }}>
                        {processSubCategory(category)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center ">
                      <div
                        className="m-2 btn d-flex flex-column justify-content-center align-items-center zoomIn action-buttons rounded p-2"
                        role={"button"}>
                        <Icon style={{ color: "var(--primary-color" }}>
                          edit
                        </Icon>
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
              })
            : retrievingPlaceholder}
        </div>
      </div>
    </>
  )
}
