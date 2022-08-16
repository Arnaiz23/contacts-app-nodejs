import "./App.css"

import { Route, Router } from "wouter"
import Login from "./pages/Login"

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Login} />
      </Router>
    </div>
  )
}

export default App
