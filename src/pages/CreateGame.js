import React from 'react'
import CreateGameComponent from '../Components/GameComponents/CreateGameComponent';

class CreateGame extends React.Component {

render() {
    return (
        <div className='center'>
            <h1>Create new game</h1>       
            <CreateGameComponent></CreateGameComponent>
        </div>
    );
}
}  

export default CreateGame;