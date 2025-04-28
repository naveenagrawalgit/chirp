import { Route,Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/HomePage'
import { SignUp } from './pages/SignUp'
import { LoginPage } from './pages/LoginPage'
import { SettingPage } from './pages/SettingPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
function App() {

  const {authUser,checkAuth} = useAuthStore();

  useEffect(()=>{
    
    checkAuth()

  },[checkAuth])
  console.log({authUser})

  return (
    <>
    <NavBar/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/setting' element={<SettingPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>



      </Routes>
    </>
  )
}

export default App
