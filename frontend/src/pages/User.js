import React, { useEffect, useState } from "react"
import Contact from "../components/Contact"
import { getContacts } from "../services/services"
import "./User.css"

import LogoutIcon from "@mui/icons-material/Logout"
import useLocal from "../hook/useLocal"
import { useLocation } from "wouter"

export default function User({ params }) {
  useLocal()

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(null)
  const setLocation = useLocation()[1]

  useEffect(() => {
    setLoading(true)
    getContacts(params.id).then((res) => {
      setLoading(false)
      setContacts(res)
    })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("id")
    setLocation("/")
  }

  return (
    <>
      <span className="logout" onClick={handleLogout}>
        <LogoutIcon />
      </span>
      <h1>User {params.id} contacts</h1>
      <div className="container-contacts">
        {!loading && contacts.length > 0 ? (
          contacts.map((data) => <Contact key={data.id} data={data} />)
        ) : (
          <h3>This user doesn&apos;t have contacts</h3>
        )}
      </div>
    </>
  )
}
