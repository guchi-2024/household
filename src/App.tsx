
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import './App.css'
import Home from './pages/Home'
import Report from './pages/Report'
import NoMactch from './pages/NoMactch'


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/report" element={<Report />}/>
      <Route path="/*" element={<NoMactch />}/>
    </Routes>
   </Router>
  )
}

export default App
