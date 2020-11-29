import React from 'react'
import systemuser from '../../services/systemuser'
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'

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
        console.log(result);
        this.setState({ watchables: result });
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
    const newWatchables = state.watchables.map(row => {
      var newItem = row;
      if (row.watchable.id === parseInt(e.target.id)) {
        newItem.rating.rating = e.target.value;
      } 
      return newItem;
    });

    this.setState({
      watchables: newWatchables
    });
  }

  saveRatings(e, state) {
    const newWatchables = state.watchables.map(row => {
      var newItem = row;
      if (row.watchable.id === parseInt(e.target.id)) {
        this.UpdateRating(newItem, newItem.rating.rating);
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
        <tr>
            <td> </td>
            <td className='erroMessage'> {this.state.errorMessage} </td>
        </tr>
      );
    }

    /* else */
    return (
      <table className="center">
        <thead>
          <tr>
            <th>Title</th>
            <th>ReleaseDate</th>
            <th>TimesSeen</th>
            <th>LastSeen</th>
            <th>Creator</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.watchables.map(row => (
            <tr key={row.watchable.id}>
              <td>{row.watchable.title}</td>
              <td>{StringFormatter.formatDate(row.watchable.releaseDate)}</td>
              <td>{row.watchable.timesSeen}</td>
              <td>{StringFormatter.formatDate(row.watchable.lastSeen)}</td>
              <td>{row.watchable.creator}</td>
              <td> <input id={row.watchable.id} type='number' value={row.rating.rating} onChange={(e) => this.ratingsChanged(e, this.state)}/> </td>
              <td> <input id={row.watchable.id} type='button' value='save' onClick={(e) => this.saveRatings(e, this.state)}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MyWatchablesComponent;