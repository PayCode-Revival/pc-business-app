import React from "react"
import { Icon } from "@mui/material"
import "./FlatCard.css"
import PropTypes from "prop-types"

export const FlatCard = ({
  iconName = "person",
  styles = {},
  title = "Title",
  text = "Text",
}) => {
  return (
    <div
      className="flat-card d-flex justify-content-between align-items-center p-3 btn"
      style={{ ...styles.cardContainer }}>
      {/* Icon Container */}
      <div
        className="icon-container d-flex justify-content-between align-items-center p-2"
        style={{ ...styles.iconContainer }}>
        <Icon
          style={{
            color: "var(--primary-color)",
            fontSize: "1.5vw",
            ...styles.icon,
          }}>
          {iconName}
        </Icon>
      </div>

      {/* Title & Text */}
      <div className="title-text d-flex flex-column justify-content-between flex-grow-1 me-5">
        {/* Title */}
        <span
          className="d-flex flat-card-title text-nowrap fw-bolder"
          style={{ color: "var(--fun-color)", ...styles.title }}>
          {title}
        </span>

        {/* Text */}
        <span
          className="flat-card-text text-nowrap py-2 d-flex"
          style={{ ...styles.text }}>
          {text}
        </span>
      </div>
    </div>
  )
}

FlatCard.propTypes = {
  styles: PropTypes.object,
}
