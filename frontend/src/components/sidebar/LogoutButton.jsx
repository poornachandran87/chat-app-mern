import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import useLogut from '../../hooks/useLogout.js'
const LogoutButton = () => {
  const {logout,loading} = useLogut();
  return (
    <div className='mt-auto'>
     {!loading ? ( <BiLogOut className='w-6 h-6 text-white cursor-pointer'  onClick={logout}/>) : (<span className='loading loading-spinner'></span>)}
    </div>
  )
}

export default LogoutButton
