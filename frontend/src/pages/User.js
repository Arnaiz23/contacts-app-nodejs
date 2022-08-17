import React, { useEffect, useState } from "react"
import Contact from "../components/Contact"
import { getContacts, getUserName } from "../services/services"
import "./User.css"

import LogoutIcon from "@mui/icons-material/Logout"
import useLocal from "../hook/useLocal"
import { Link, useLocation } from "wouter"

export default function User({ params }) {
  useLocal()

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(null)
  const [name, setName] = useState("")
  const setLocation = useLocation()[1]
  const [recharge, setRecharge] = useState(false)

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

  return (
    <>
      <span className="logout" onClick={handleLogout}>
        <LogoutIcon />
      </span>
      <header className="header-contacts">
        <h1>{name} contacts</h1>
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
