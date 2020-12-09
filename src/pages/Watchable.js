import React from 'react'
import systemuser from '../services/systemuser';
import WatchableDetailsComponent from '../Components/WatchableComponents/WatchableDetailsComponent';
import RatedWatchableDetailsComponent from '../Components/WatchableComponents/RatedWatchableDetailsComponent';
import * as Constants from '../Tools/Constants'

class WatchableDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showrated: false,
        }
    }

    componentDidMount() {
        const url = Constants.getHasRatedEntryAPI_URL(this.props.id);
        let authHeader = {'Authorization': systemuser.getJWT()};
    
        let resStatusCode = 0;
        fetch(url, {headers:authHeader})
          .then(response => {
            resStatusCode = response.status;
            if (!response.ok) {
              throw new Error(response.state);
            }
            return response.json();
          })
          .then(result => {
            this.setState({ showrated: systemuser.isLoggedIn() });
          }).catch(error => {
            console.log(error.message)
            switch(resStatusCode){
              case 401:
                this.setState({errorMessage: 'Unautherized access'});
                break;
              default:
                console.log(error.message);
                break;
            }
          });
      }

    render() {
        return (
            <div className='center'>
                {this.state.showrated ?
                 <RatedWatchableDetailsComponent id={this.props.id}></RatedWatchableDetailsComponent> :
                 <WatchableDetailsComponent id={this.props.id}></WatchableDetailsComponent>}  
            </div>
        );
    }
}  

export default WatchableDetails;