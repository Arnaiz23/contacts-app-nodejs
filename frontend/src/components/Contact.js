import React, { useState } from "react"
import "./Contact.css"
import CallIcon from "@mui/icons-material/Call"
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { deleteContact } from "../services/services"
// import { useLocation } from "wouter"

export default function Contact({ data, recharge }) {
  // const setLocation = useLocation()[1]
  const [error, setError] = useState(null)

  const handleDelete = () => {
    deleteContact(data.id).then((res) => {
      if (res.code === "error") {
        alert("Error")
        console.log(error)
        return setError(true)
      }

      setError(false)

      recharge(true)
    })
  }

  return (
    <div className="container-contact">
      <h4>
        <PermContactCalendarIcon fontSize="large" /> : {data.name}{" "}
        {data.last_name}
      </h4>
      <p>
        <CallIcon /> : {data.tel}
      </p>
      <button className="trash-contact" onClick={handleDelete}>
        <DeleteForeverIcon fontSize="large" />
      </button>
    </div>
  )
}
