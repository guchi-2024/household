
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import './App.css'
import Home from './pages/Home'
import Report from './pages/Report'
import NoMactch from './pages/NoMactch'
import AppLayout from './components/layout/AppLayout'


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/report" element={<Report />}/>
        <Route path="/*" element={<NoMactch />}/>
      </Route>
    </Routes>
   </Router>
  )
}

export default App
