import React from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"

export default function Demographics() {
  return (
    <div
      className="fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar"
      id="summaries">
      {/* Demographics */}
      <div id="charts-analytics" className="container-fluid mt-3 ">
        <div className="row">
          <div className="col ">
            <div className="d-flex justify-content-between align-items-center m-1 mb-3">
              <span className="col-9 text-nowrap">
                <SectionHeader text={"Print Reports"} />
              </span>
              <select
                className="form-select w-50"
                aria-label="Default select example">
                <option value="1">Last 7 Days</option>
                <option value="2">Last 30 Days</option>
                <option value="3">Last 60 Days</option>
                <option value="3">Last 90 Days</option>
                <option value="3">All Time</option>
              </select>
            </div>
            <div className="col d-flex p-5 flat-card-style align-items-center justify-content-center text-danger fw-bolder display-6">
              No Printer Connected!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
