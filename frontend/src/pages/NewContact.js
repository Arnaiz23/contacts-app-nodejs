import React, { useState } from "react"
import { Alert } from "@mui/material"

import "./Login.css"
import { newContact } from "../services/services"
import { useLocation } from "wouter"

export default function NewContact({ params }) {
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    tel: 0,
  })
  const [error, setError] = useState(null)
  const [errorText, setErrorText] = useState("")
  const setLocation = useLocation()[1]
  const [loading, setLoading] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)

    if (contact.tel.length !== 9) {
      //   return alert("El telefono no es valido")
      setErrorText("Telephone number not valid")
      setError(true)
      return setLoading(false)
    }

    setError(null)

    newContact(params.id, contact).then((res) => {
      if (res.code === "error") {
        setError(true)
        setLoading(false)
        return setErrorText("Error saving the contact. Try again later")
      }

      setLoading(false)
      setLocation(`/${params.id}`)
    })
  }

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="login-container">
      <h1>New contact</h1>
      {error && <Alert severity="error">{errorText}</Alert>}
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="name"
          id=""
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="text"
          name="lastName"
          id=""
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="tel"
          name="tel"
          id=""
          placeholder="Tel"
          onChange={handleChange}
        />
        <button className="form-button" disabled={loading}>
          Add
        </button>
      </form>
    </div>
  )
}
