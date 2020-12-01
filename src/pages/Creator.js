import React from 'react'
import CreatorComponent from '../Components/CreatorComponents/CreatorComponent';

class CreatorDetails extends React.Component {

render() {
    return (
        <div className='center'>
            <CreatorComponent id={this.props.id}></CreatorComponent>
        </div>
    );
}
}  

export default CreatorDetails;