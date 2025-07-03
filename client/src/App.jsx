import React from 'react'
import Navbar from './components/Navbar'
import Footor from './components/Footor'


import Movies from './pages/Movies'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails' 
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorites from './pages/Favorites'
import { Routes, Route,useLocation } from 'react-router-dom'

const App = () => {

  // Check if the current route is an admin route if it starts with '/admin' it returns true.
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {
      // Render Navbar only if not on admin route
    }
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies'elset={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='*' element={<h1>Page Not Found</h1>}/>
      </Routes>
      <Footor/>
    </>
  )
}

export default App