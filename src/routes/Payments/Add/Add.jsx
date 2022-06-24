import { useState, useEffect } from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { Icon } from "@mui/material"
import "./Add.css"
import Form from "../Form"

export default function Add() {
  return (
    <>
      <SectionHeader text={"Add New Payment Category"} />
      <div
        id="add-account"
        className="container-fluid flat-card-style overflow-auto scrollbar">
        <div className="row p-4 justify-content-center">
          <div
            id="add-payment-category"
            className="col col-4 col-sm-8 flat-card-style">
            <Form showFormTitle={false} buttonTitle="Add New Category" />
          </div>
        </div>
      </div>
    </>
  )
}
