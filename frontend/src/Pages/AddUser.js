import React from 'react'
import NavbarTop from '../Component/Navbar/NavbarTop'
import NavbarLeft from '../Component/Navbar/NavbarLeft'
import CreateUser from '../Component/Users/CreateUser'



const AddUser = () => {
  return (
    <div>
    <NavbarTop/>     
   <NavbarLeft />
   <CreateUser />
      
    </div>
  )
}
export default AddUser;