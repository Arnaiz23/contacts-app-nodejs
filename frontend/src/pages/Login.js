import React, { useState } from "react"
import "./Login.css"

import { login } from "../services/services"
import { Link, useLocation } from "wouter"

import useLocal from "../hook/useLocal"
import { Alert } from "@mui/material"

export default function Login() {
  useLocal()

  const [user, setUser] = useState()
  const [pass, setPass] = useState()
  const setLocation = useLocation()[1]
  const [disabled, setDisabled] = useState(null)
  const [error, setError] = useState(null)

  const handleChangeUser = (e) => {
    setUser(e.target.value)
  }

  const handleChangePass = (e) => {
    setPass(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setDisabled(true)
    setError(false)

    const data = {
      user,
      pass,
    }

    login(data).then((res) => {
      if (res.code === "error") {
        setDisabled(false)
        return setError(true)
      }

      localStorage.setItem("id", res.object)
      setLocation(`/user/${res.object}`)
    })
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <Alert severity="error">User not valid</Alert>}
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name=""
          id=""
          placeholder="User"
          onChange={handleChangeUser}
        />
        <input
          className="form-input"
          type="password"
          name=""
          id=""
          placeholder="Password"
          onChange={handleChangePass}
        />
        <button className="form-button" disabled={disabled}>
          Login
        </button>
      </form>
      <Link to={`/register`}>
        <button className="form-button purple">Register</button>
      </Link>
    </div>
  )
}
