import "./App.css"

import { Route, Router } from "wouter"
import Login from "./pages/Login"
import User from "./pages/User"

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Login} />
        <Route path="/:id" component={User} />
      </Router>
    </div>
  )
}

export default App
