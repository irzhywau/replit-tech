import "./App.css"
import { Todos } from './features/todos/Todos'
import logo from "./logo.svg"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Todos />
      </header>
    </div>
  )
}

export default App
