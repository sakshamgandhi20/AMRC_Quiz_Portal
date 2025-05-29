import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from "./Context/ConfigContext";
import './App.css'
import Home from './Pages/Home'
import Instructions from './Pages/Instructions'
import Result from './Pages/Result'
import Quiz from './Pages/Quiz'
import Admin from './Pages/Admin'
import Leaderboard from './Pages/Leadboard';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/result" element={<Result />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </ConfigProvider>

    </>
  )
}

export default App
