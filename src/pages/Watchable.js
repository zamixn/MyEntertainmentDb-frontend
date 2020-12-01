import React from 'react'
import systemuser from '../services/systemuser';
import WatchableDetailsComponent from '../Components/WatchableComponents/WatchableDetailsComponent';
import RatedWatchableDetailsComponent from '../Components/WatchableComponents/RatedWatchableDetailsComponent';

class WatchableDetails extends React.Component {

render() {
    console.log("asdf");
    return (
        <div className='center'>
            {systemuser.isLoggedIn() ?
                 <RatedWatchableDetailsComponent id={this.props.id}></RatedWatchableDetailsComponent> :
                 <WatchableDetailsComponent id={this.props.id}></WatchableDetailsComponent>}  
        </div>
    );
}
}  

export default WatchableDetails;