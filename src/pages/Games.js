import React from 'react'
import GameListComponent from '../Components/GameComponnet';

function Games() {
    return (
        <div className='center'>
            <h1>All Games</h1>        
            <GameListComponent></GameListComponent>  
        </div>
    )
}

export default Games;