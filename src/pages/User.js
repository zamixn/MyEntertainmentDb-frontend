import React from 'react'
import Login from '../Components/UserComponents/login.component'
import LoggedIn from '../Components/UserComponents/logged-in.component'
import SystemUser from '../services/systemuser'

function UserInfo()
{    
    if(SystemUser.isLoggedIn())
    {
        return <LoggedIn/>;
    }
    else
    {
        return <Login/>;
    }
}

function User() {
    return (
        <div className='center'>
            <h1>Log in</h1>
            <UserInfo/>
        </div>
    )
}

export default User;