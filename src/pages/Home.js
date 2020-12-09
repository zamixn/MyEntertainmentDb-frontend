import React from 'react'
import {ReactComponent as Logo} from '../logo.svg';



function Home() {
    return (
        <div className='center'>
            <h1>Home</h1>
            
            <Logo className='homePageLogo' />
        </div>
    )
}

export default Home;