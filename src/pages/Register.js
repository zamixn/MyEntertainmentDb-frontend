
import React from 'react'
import Register from '../Components/UserComponents/register.component'
import SystemUser from '../services/systemuser'

function RegisterInfo() {
    if (SystemUser.isLoggedIn()) {
        return <h3>Logout first</h3>;
    }
    else {
        return <Register />;
    }
}

function RegisterPage() {
    return (
        <div className='center'>
            <h1>Register</h1>
            <RegisterInfo />
        </div>
    )
}

export default RegisterPage;