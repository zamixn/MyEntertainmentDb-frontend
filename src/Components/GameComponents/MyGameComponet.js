import React from 'react';
import { format } from 'date-fns';

import systemuser from '../../services/systemuser';
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'
import { Link } from 'react-router-dom';

class MyGameListComponent extends React.Component {
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
          default:
            console.log(error.message);
            break;
        }
      });
  }

  UploadChanges(entryRating, newRating, newTimesConsumed, newLastConsumed){    
    let e = entryRating.rating;
    let body = JSON.stringify({
      "rating": newRating,
      "entry_id": e.entry_id,
      "user_id":  e.user_id,
      "timesConsumed": newTimesConsumed,
      "lastConsumed": newLastConsumed
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
        default:
          console.log(error.message);
          break;
      }
    });
  }

  ratingsChanged(e, state) {
    const newGames = state.games.map(row => {
      var newItem = row;
      if (('rating_'+row.game.game.id) === e.target.id) {
        newItem.rating.rating = e.target.value;
      } 
      return newItem;
    });

    this.setState({
      games: newGames
    });
  }

  timesChanged(e, state) {
    if(e.target.validity.valid){
      const newGames = state.games.map(row => {
        var newItem = row;
        if ('times_'+row.game.game.id === e.target.id) {
          newItem.rating.timesConsumed = e.target.value;
        } 
        return newItem;
      });

      this.setState({
        games: newGames
      });
    }
  }

  lastChanged(e, state) {
    if(e.target.validity.valid){
      const newGames = state.games.map(row => {
        var newItem = row;
        if ('last_'+row.game.game.id === e.target.id) {
          newItem.rating.lastConsumed = e.target.value;
        } 
        return newItem;
      });

      this.setState({
        games: newGames
      });
    }
  }

  saveChanges(e, state) {
    if(e.target.validity.valid){
      const newGames = state.games.map(row => {
        var newItem = row;
        if (row.game.game.id === parseInt(e.target.id)) {
          this.UploadChanges(newItem, newItem.rating.rating, newItem.rating.timesConsumed, newItem.rating.lastConsumed);
        } 
        return newItem;
      });

      this.setState({
        games: newGames
      });
    }
  }

  render() {
    /*show error message if it's not empty */
    if(this.state.errorMessage)
    {
      return (
        <h1 className='erroMessage'> {this.state.errorMessage} </h1>
      );
    }

    let index = 1;

    /* else */
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th/>
            <th>Title</th>
            <th>Release</th>
            <th>Creator</th>
            <th># played</th>
            <th>Last played</th>
            <th>Rating</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.state.games.map(row => (
            <tr key={row.game.game.id}>
              <td>{index++}</td>
              <td> <img className='smallPosterImage' src={row.game.game.poster ? row.game.game.poster : Constants.IMAGE_NOT_FOUND_URL} alt='img'/> </td>
              <td><Link className='link' to={Constants.getGameURL(row.game.game.id)}>{row.game.game.title}</Link></td>
              <td> {StringFormatter.formatDate(row.game.game.releaseDate)}</td>
              { row.game.creator.creator_id != -1 ?
              <td><Link className='link' to={Constants.getCreatorURL(row.game.creator.creator_id)}>{row.game.creator.name}</Link></td> :
              <td><a>-</a></td>
              }
              <td> <input className='numberInputField' pattern="[0-9]*" id={'times_'+row.game.game.id} type='number' value={row.rating.timesConsumed} onChange={(e) => this.timesChanged(e, this.state)}/> </td>
              <td> <input className='dateInputField' id={'last_'+row.game.game.id} type='date' value={format(new Date(row.rating.lastConsumed), 'yyyy-MM-dd')} onChange={(e) => this.lastChanged(e, this.state)}></input></td>
              <td> <input className='numberInputField' id={'rating_'+row.game.game.id} type='number' value={row.rating.rating} onChange={(e) => this.ratingsChanged(e, this.state)}/> </td>
              <td> <input id={row.game.game.id} type='button' value='save' onClick={(e) => this.saveChanges(e, this.state)}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MyGameListComponent;