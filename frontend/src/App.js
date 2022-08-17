import "./App.css"

import { Route, Router } from "wouter"
import Login from "./pages/Login"
import User from "./pages/User"
import NewContact from "./pages/NewContact"

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Login} />
        <Route path="/:id" component={User} />
        <Route path="/new-contact/:id" component={NewContact} />
      </Router>
    </div>
  )
}

export default App
