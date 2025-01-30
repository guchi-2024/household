
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import './App.css'
import Home from './pages/Home'
import Report from './pages/Report'
import NoMactch from './pages/NoMactch'
import AppLayout from './components/layout/AppLayout'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme'
import { CssBaseline } from '@mui/material'


function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />  
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/report" element={<Report />}/>
            <Route path="/*" element={<NoMactch />}/>
          </Route>
        </Routes>
      </Router>
   </ThemeProvider> 
  )
}

export default App
