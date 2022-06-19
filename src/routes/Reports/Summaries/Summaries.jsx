import React from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import TransactionsHistory from "../../../components/TransactionsHistory/TransactionsHistory"
import { RenderChart } from "../../../statics/chartData"

export default function Summaries() {
  return (
    <div
      className="fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar"
      id="summaries">
      {/* Charts Analytics */}
      <div id="charts-analytics" className="container-fluid mt-3 ">
        <div className="row">
          <div className="col col-8">
            <div className="d-flex justify-content-between align-items-center m-1 mb-3">
              <span className="col-9 text-nowrap">
                <SectionHeader text={"Charts Analytics"} />
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
            <div className="col p-2 flat-card-style">
              <RenderChart type="bar" />
            </div>
          </div>

          <div className="col col-4">
            <div className="row justify-content-end">
              <div className="col-6">
                <select className="form-select mb-3">
                  <option value="1">Last 7 Days</option>
                  <option value="2">Last 30 Days</option>
                  <option value="3">Last 60 Days</option>
                  <option value="3">Last 90 Days</option>
                  <option value="3">All Time</option>
                </select>
              </div>
            </div>
            <div className="p-3 flat-card-style">
              <RenderChart type="pie" />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div id="transactions-history" className="container-fluid mt-3 mb-5">
        <SectionHeader text={"Transactions History"} />
        <div className="row g-3 mt-1">
          <div className="col">
            <div className="p-3 flat-card-style">
              <TransactionsHistory />
            </div>
          </div>

          <div className="col col-4">
            <div className="p-3 flat-card-style h-100"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
