import React, { useEffect, useState } from "react"
import Contact from "../components/Contact"
import { deleteUser, getContacts, getUserName } from "../services/services"
import "./User.css"

import LogoutIcon from "@mui/icons-material/Logout"
import DeleteIcon from "@mui/icons-material/Delete"
import useLocal from "../hook/useLocal"
import { Link, useLocation } from "wouter"
import { Alert } from "@mui/material"

export default function User({ params }) {
  useLocal()

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(null)
  const [name, setName] = useState("")
  const setLocation = useLocation()[1]
  const [recharge, setRecharge] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    getContacts(params.id).then((res) => {
      setLoading(false)
      setContacts(res)
    })
  }, [recharge])

  useEffect(() => {
    getUserName(params.id).then((res) => setName(res.name))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("id")
    setLocation("/")
  }

  const handleDelete = () => {
    deleteUser(params.id).then((res) => {
      setError(false)

      if (res.code === "error") {
        return setError(true)
      }

      localStorage.removeItem("id")
      setLocation("/")
    })
  }

  return (
    <>
      <span className="delete-user" onClick={handleDelete}>
        <DeleteIcon />
      </span>
      <span className="logout" onClick={handleLogout}>
        <LogoutIcon />
      </span>
      <header className="header-contacts">
        <h1>{name} contacts</h1>
        {error && (
          <Alert severity="error">
            This user could not be deleted. Try again later.
          </Alert>
        )}
        <Link to={`/new-contact/${params.id}`}>
          <button className="add-contact">Add contact</button>
        </Link>
      </header>
      <div className="container-contacts">
        {!loading && contacts.length > 0 ? (
          contacts.map((data) => (
            <Contact key={data.id} data={data} recharge={setRecharge} />
          ))
        ) : (
          <h3>This user doesn&apos;t have contacts</h3>
        )}
      </div>
    </>
  )
}
