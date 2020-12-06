import React from 'react'
import CreateWatchableComponent from '../Components/WatchableComponents/CreateWatchableComponent';

class CreateWatchable extends React.Component {

render() {
    return (
        <div className='center'>
            <h1>Create new watchable</h1>     
            <CreateWatchableComponent></CreateWatchableComponent>
        </div>
    );
}
}  

export default CreateWatchable;