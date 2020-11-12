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

  UpdateRating(entryRating, newVal){    
    let e = entryRating.rating;
    let body = JSON.stringify({
      "rating": newVal,
      "entry_id": e.entry_id,
      "user_id":  e.user_id
    });
    let resStatusCode = 0;
    fetch(Constants.RATEENTRY_API_URL, {
      method:Constants.METHOD_POST,
      headers:{
        ...Constants.AUTH_HEADER, 
        ...Constants.JSON_CONTENT_TYPE
      },
      body:body
    }).then(response => {
        resStatusCode = response.status;
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
    }).then(result => {
      console.log(result);
      window.location.reload(false);
    }).catch(error => {
      console.log(error.message)
      switch(resStatusCode){
        case 401:
          this.setState({errorMessage: error.message});
          break;
      }
    });
  }

  ratingsChanged(e, state) {
    const newGames = state.games.map(row => {
      var newItem = row;
      if (row.game.id === parseInt(e.target.id)) {
        newItem.rating.rating = e.target.value;
      } 
      return newItem;
    });

    this.setState({
      games: newGames
    });
  }

  saveRatings(e, state) {
    const newGames = state.games.map(row => {
      var newItem = row;
      if (row.game.id === parseInt(e.target.id)) {
        this.UpdateRating(newItem, newItem.rating.rating);
      } 
      return newItem;
    });

    this.setState({
      games: newGames
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
            <th>Rating</th>
            <th></th>
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
              <td> <input id={row.game.id} type='number' value={row.rating.rating} onChange={(e) => this.ratingsChanged(e, this.state)}/> </td>
              <td> <input id={row.game.id} type='button' value='save' onClick={(e) => this.saveRatings(e, this.state)}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AllGameListComponent;