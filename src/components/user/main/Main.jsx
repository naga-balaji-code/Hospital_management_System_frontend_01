import React from 'react'
import NavBar from './navbar/NavBar'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    </>
  )
}

export default Main