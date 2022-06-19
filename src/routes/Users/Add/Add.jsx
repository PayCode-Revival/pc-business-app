import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import Form from "../Form"

export default function Add() {
  return (
    <>
      <SectionHeader text={"Add New User"} />
      <div
        id="add-user"
        className="container-fluid flat-card-style h-100 overflow-auto scrollbar">
        <div className="row p-4 justify-content-center">
          <Form formTitle="New User Information" buttonTitle="Add New User" />
        </div>
      </div>
    </>
  )
}
