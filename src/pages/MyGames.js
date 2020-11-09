import React from 'react'
import MyGameListComponent from '../Components/MyGameComponet';

function Games() {
    return (
        <div className='center'>
            <h1>My Games</h1>        
            <MyGameListComponent></MyGameListComponent>  
        </div>
    )
}

export default Games;