import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import JwtPage from './pages/JwtPage'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Link to={'/'}>JWTPAGE</Link>|
      <Link to={'/dash'}>DashBoard</Link>
      <Routes>
        <Route path='/' Component={JwtPage}></Route>
        <Route path='/dash' Component={Dashboard}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
