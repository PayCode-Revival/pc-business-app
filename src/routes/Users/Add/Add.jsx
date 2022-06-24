import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import Form from "../Form"

export default function Add() {
  return (
    <>
      <SectionHeader text={"Add New User"} />
      <div
        id="add-user"
        className="container-fluid h-100 overflow-auto scrollbar "
        style={{ backgroundColor: "var(--tertiary-color)" }}>
        <div className="container-fluid overflow-auto scrollbar">
          <div className="row p-2">
            <div className="col col-12">
              <Form
                formTitle="New User Information"
                buttonTitle="Add New User"
              />
            </div>
            {/* <div className="col p-5 border"></div> */}
          </div>
        </div>
      </div>
    </>
  )
}
