import Navbar from './components/Navbar'
import Footor from './components/Footor'

import Movies from './pages/Movies'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails' 
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorites from './pages/Favorites'
import { Routes, Route,useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { SignIn } from '@clerk/clerk-react'
import {useAppContext} from './context/appContext'
//Toster is used to show notifications in the app

const App = () => {

  // Check if the current route is an admin route if it starts with '/admin' it returns true.
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  const {user} = useAppContext();

  return (
    <>
      <Toaster/>
      {/* if we add toaster component here so that we can use our notification feature any where in the page*/}
      {!isAdminRoute && <Navbar />}
      {/* Render Navbar only if not on admin route */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='*' element={<h1>Page Not Found</h1>}/>
        <Route path='/admin/*' element={user?<Layout/>:(<div>
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl = {'/admin'}/>
          </div>
        </div>)}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-shows' element={<AddShows/>}/>
          <Route path='list-shows' element={<ListShows/>}/>
          <Route path='list-bookings' element={<ListBookings/>}/>
        </Route>
      </Routes>
      {!isAdminRoute && <Footor/>}
    </>
  )
}

export default App