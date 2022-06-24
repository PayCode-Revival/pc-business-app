import React, { useRef, forwardRef } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
export default function Toast({
  state = true,
  severity = "success",
  message = "",
}) {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={state}
          autoHideDuration={500}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert> */}
      </Stack>
    </>
  )
}
