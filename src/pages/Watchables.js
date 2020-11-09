import React from 'react'
import AllWatchablesListComponent from '../Components/AllWatchablesComponent';

function Watchables() {
    return (
        <div className='center'>
            <h1>All Watchables</h1>        
            <AllWatchablesListComponent type='all'></AllWatchablesListComponent>  
        </div>
    )
}

export default Watchables;