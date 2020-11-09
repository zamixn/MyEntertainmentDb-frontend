import React from 'react';
import systemuser from '../services/systemuser';
import * as Constants from '../Tools/Constants'
import * as StringFormatter from '../Tools/StringFormatter'

class AllGameListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      errorMessage: ''
    }
  }

  componentDidMount() {
    const url = Constants.MY_GAME_LIST_API_URL;
    let authHeader = {'Authorization': systemuser.getJWT()};

    let resStatusCode = 0;
    fetch(url, {headers:authHeader})
      .then(response => {
        resStatusCode = response.status;
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
      }).then(result => {
        this.setState({ games: result });
      }).catch(error => {
        console.log(error.message)
        switch(resStatusCode){
          case 401:
            this.setState({errorMessage: 'Unautherized access'});
            break;
        }
      });
  }

  render() {
    /*show error message if it's not empty */
    if(this.state.errorMessage)
    {
      return (
        <tr>
            <td> </td>
            <td className='erroMessage'> {this.state.errorMessage} </td>
        </tr>
      );
    }

    /* else */
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>ReleaseDate</th>
            <th>TimesPlayed</th>
            <th>LastPlayed</th>
            <th>Creator</th>
            <th>MyRating</th>
          </tr>
        </thead>
        <tbody>
          {this.state.games.map(row => (
            <tr key={row.id}>
              <td>{row.game.title}</td>
              <td>{StringFormatter.formatDate(row.game.releaseDate)}</td>
              <td>{row.game.timesPlayed}</td>
              <td>{StringFormatter.formatDate(row.game.lastPlayed)}</td>
              <td>{row.game.creator}</td>
              <td>{row.rating.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AllGameListComponent;