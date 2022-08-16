import React, { useState } from "react"
import "./Login.css"

import { login } from "../services/services"
import { useLocation } from "wouter"

import useLocal from "../hook/useLocal"

export default function Login() {
  useLocal()

  const [user, setUser] = useState()
  const [pass, setPass] = useState()
  const setLocation = useLocation()[1]

  const handleChangeUser = (e) => {
    setUser(e.target.value)
  }

  const handleChangePass = (e) => {
    setPass(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      user,
      pass,
    }

    login(data).then((res) => {
      if (res.code === "error") return alert("error")

      alert("Correcto")
      localStorage.setItem("id", res.object)
      setLocation(`/${res.object}`)
    })
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="User"
          onChange={handleChangeUser}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          onChange={handleChangePass}
        />
        <button>Login</button>
      </form>
    </div>
  )
}
