import React, { useEffect, useState } from "react"
import { ACCOUNT_NUMBER_LENGTH } from "../../statics/NubanValidator"

export default function FormInput({
  type = "text",
  value = "",
  placeholder = "",
}) {
  const [inputValue, setInputValue] = useState(value)
  useEffect(() => setInputValue(value))
  return (
    <div className="form-floating mt-5 w-100">
      <input
        type="text"
        className="form-control flat-card-style zoomIn form-label"
        placeholder="Account Number"
        value={inputValue}
        minLength={ACCOUNT_NUMBER_LENGTH}
        maxLength={ACCOUNT_NUMBER_LENGTH}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        required
      />
      <label>Account Number</label>
    </div>
  )
}
