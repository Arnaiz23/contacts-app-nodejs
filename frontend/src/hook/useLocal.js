import { useLocation } from "wouter"

export default function useLocal() {
  const setLocation = useLocation()[1]

  if (localStorage.getItem("id")) {
    setLocation(`/${localStorage.getItem("id")}`)
  } else {
    setLocation("/")
  }
}
