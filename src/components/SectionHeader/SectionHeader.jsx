import React from "react"
import "./SectionHeader.css"

export const SectionHeader = ({ text, style }) => {
  return (
    <span className="section-header fw-bolder mb-3 h4" style={{ ...style }}>
      {text}
    </span>
  )
}
