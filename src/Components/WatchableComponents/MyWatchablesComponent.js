import React from 'react'
import { format } from 'date-fns';

import systemuser from '../../services/systemuser'
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'
import { Link } from 'react-router-dom'
import * as EnumFormatter from '../../Tools/EnumFormatter'

class MyWatchablesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watchables: [],
      errorMessage:''
    }
  }

  componentDidMount() {
    const url = Constants.MY_WATCHABLE_LIST_API_URL;
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
        this.setState({ watchables: result });
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
    const newWatchables = state.watchables.map(row => {
      var newItem = row;
      if (('rating_'+row.watchable.watchable.id) === e.target.id) {
        newItem.rating.rating = e.target.value;
      } 
      return newItem;
    });

    this.setState({
      watchables: newWatchables
    });
  }

  timesChanged(e, state) {
    if(e.target.validity.valid){
      const newWatchables = state.watchables.map(row => {
        var newItem = row;
        if ('times_'+row.watchable.watchable.id === e.target.id) {
          newItem.rating.timesConsumed = e.target.value;
        } 
        return newItem;
      });

      this.setState({
        watchables: newWatchables
      });
    }
  }

  lastChanged(e, state) {
    if(e.target.validity.valid){
      const newWatchables = state.watchables.map(row => {
        var newItem = row;
        if ('last_'+row.watchable.watchable.id === e.target.id) {
          newItem.rating.lastConsumed = e.target.value;
        } 
        return newItem;
      });

      this.setState({
        watchables: newWatchables
      });
    }
  }

  saveChanges(e, state) {
    const newWatchables = state.watchables.map(row => {
      var newItem = row;
      if (row.watchable.watchable.id === parseInt(e.target.id)) {
        this.UploadChanges(newItem, newItem.rating.rating, newItem.rating.timesConsumed, newItem.rating.lastConsumed);
      } 
      return newItem;
    });

    this.setState({
      watchables: newWatchables
    });
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
      <table className="center">
        <thead>
          <tr>
            <th>#</th>
            <th/>
            <th>Title</th>
            <th>Type</th>
            <th>Release</th>
            <th>Creator</th>
            <th># seen</th>
            <th>Last seen</th>
            <th>Rating</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {this.state.watchables.map(row => (
            <tr key={row.watchable.watchable.id}>
              <td>{index++}</td>
              <td> <img className='smallPosterImage' src={row.watchable.watchable.poster ? row.watchable.watchable.poster : Constants.IMAGE_NOT_FOUND_URL} alt='img'/> </td>
              <td><a className='link' href={Constants.WATCHABLE_URL + '/' + row.watchable.watchable.id}>{row.watchable.watchable.title}</a></td> 
              <td>{EnumFormatter.formatWatchableType(row.watchable.watchable.type)}</td>
              <td>{StringFormatter.formatDate(row.watchable.watchable.releaseDate)}</td>
              {row.watchable.creator.creator_id != -1 ? 
              <td><Link className='link' to={Constants.getCreatorURL(row.watchable.creator.creator_id)}>{row.watchable.creator.name}</Link></td> :
              <td><a>-</a></td>
              }
              <td> <input className='numberInputField' pattern="[0-9]*" id={'times_'+row.watchable.watchable.id} type='number' value={row.rating.timesConsumed} onChange={(e) => this.timesChanged(e, this.state)}/> </td>
              <td> <input className='dateInputField' id={'last_'+row.watchable.watchable.id} type='date' value={format(new Date(row.rating.lastConsumed), 'yyyy-MM-dd')} onChange={(e) => this.lastChanged(e, this.state)}></input></td>
              <td> <input className='numberInputField' id={'rating_'+row.watchable.watchable.id} type='number' value={row.rating.rating} onChange={(e) => this.ratingsChanged(e, this.state)}/> </td>
              <td> <input id={row.watchable.watchable.id} type='button' value='save' onClick={(e) => this.saveChanges(e, this.state)}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MyWatchablesComponent;