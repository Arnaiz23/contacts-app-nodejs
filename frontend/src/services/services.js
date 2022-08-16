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
