import { Alert } from "@mui/material"
import React, { useState } from "react"
import { Link, useLocation } from "wouter"
import { register } from "../services/services"

import "./Login.css"

export default function Register() {
  const [user, setUser] = useState({
    user: "",
    pass: "",
  })
  const setLocation = useLocation()[1]
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    setError(false)

    register(user).then((res) => {
      if (res.code === "error") {
        setLoading(false)
        return setError(true)
      }

      setLocation(`/`)
    })
  }

  return (
    <div className="login-container">
      <h1>Register</h1>
      {error && <Alert severity="error">This user already exists</Alert>}
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="form-input"
          id=""
          name="user"
          onChange={handleChange}
          placeholder="User"
          type="text"
        />
        <input
          className="form-input"
          id=""
          name="pass"
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
        <button className="form-button" disabled={loading}>
          Register
        </button>
      </form>
      <Link to="/">
        <button className="form-button purple">Login</button>
      </Link>
    </div>
  )
}
