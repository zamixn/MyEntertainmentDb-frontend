import React from 'react'
import systemuser from '../services/systemuser';
import GameDetailsComponent from '../Components/GameComponents/GameDetailsComponent';
import RatedGameDetailsComponent from '../Components/GameComponents/RatedGameDetailsComponent';

class GameDetails extends React.Component {

render() {
    return (
        <div className='center'>
            {systemuser.isLoggedIn() ?
                 <RatedGameDetailsComponent id={this.props.id}></RatedGameDetailsComponent> :
                 <GameDetailsComponent id={this.props.id}></GameDetailsComponent>}  
        </div>
    );
}
}  

export default GameDetails;