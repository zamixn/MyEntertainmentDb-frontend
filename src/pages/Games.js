import React from 'react'
import AllGameListComponent from '../Components/AllGameComponet';

function Games() {
    return (
        <div className='center'>
            <h1>All Games</h1>        
            <AllGameListComponent type='all'></AllGameListComponent>  
        </div>
    )
}

export default Games;