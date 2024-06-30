import React from 'react'
import AuthNavbar from '../../components/AuthNavbar'

const AuthLayout = ({children}) => {
  return (
    <div>
        <AuthNavbar />
        {children}
    </div>
  )
}

export default AuthLayout