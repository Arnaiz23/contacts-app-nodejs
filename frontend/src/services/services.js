export function login(data) {
  return fetch(`${process.env.REACT_APP_NODE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((response) => response)
}

export function getContacts(id) {
  return fetch(`${process.env.REACT_APP_NODE_URL}/contacts/${id}`)
    .then((res) => res.json())
    .then((res) => res)
}

export function getUserName(id) {
  return fetch(`${process.env.REACT_APP_NODE_URL}/user/${id}`)
    .then((res) => res.json())
    .then((res) => res)
}

export function newContact(id, body) {
  return fetch(`${process.env.REACT_APP_NODE_URL}/contact/${id}`, {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
    }),
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res)
}

export function deleteContact(id) {
  return fetch(`${process.env.REACT_APP_NODE_URL}/contact/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => res)
}

export function register(body) {
  return fetch(`${process.env.REACT_APP_NODE_URL}/user`, {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
    }),
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res)
}

export function deleteUser(id) {
  return fetch(`${process.env.REACT_APP_NODE_URL}/user/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => res)
}
