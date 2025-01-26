import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import JwtPage from './pages/JwtPage'
import Dashboard from './pages/Dashboard'
import './App.css'
import { useAuth } from './AuthProvider'
import requireAuth from './RequireAuth'

function App() {

  const {isAuthenticated} = useAuth()

  return (
    <BrowserRouter>
      <Link to={'/'}>JWTPAGE</Link>|
      {isAuthenticated?<Link to={'/dash'}>DashBoard</Link>:null}
      <Routes>
        <Route path='/' Component={JwtPage}></Route>
        <Route path='/dash' Component={requireAuth(Dashboard)}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
