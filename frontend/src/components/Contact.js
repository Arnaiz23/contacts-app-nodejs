import React from "react"
import "./Contact.css"
import CallIcon from "@mui/icons-material/Call"
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar"

export default function Contact({ data }) {
  return (
    <div className="container-contact">
      <h4>
        <PermContactCalendarIcon fontSize="large" /> : {data.name}{" "}
        {data.last_name}
      </h4>
      <p>
        <CallIcon /> : {data.tel}
      </p>
    </div>
  )
}
