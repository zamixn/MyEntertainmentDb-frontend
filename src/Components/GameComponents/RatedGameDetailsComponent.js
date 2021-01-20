import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'

import systemuser from '../../services/systemuser';
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'
import * as EnumFormatter from '../../Tools/EnumFormatter'

class RatedGameDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      errorMessage: ''
    }
  }

  componentDidMount() {
    const url = Constants.getRatedGameAPI_URL(this.props.id);
    let authHeader = { 'Authorization': systemuser.getJWT() };

    let resStatusCode = 0;
    fetch(url, { headers: authHeader })
      .then(response => {
        resStatusCode = response.status;
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
      }).then(result => {
        this.setState({ data: result });
      }).catch(error => {
        console.log(error.message)
        switch (resStatusCode) {
          case 401:
            this.setState({ errorMessage: 'Unautherized access' });
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  }

  UploadChanges(ratingData, newRating, newTimesConsumed, newLastConsumed) {
    let body = JSON.stringify({
      "rating": newRating,
      "entry_id": ratingData.entry_id,
      "user_id": ratingData.user_id,
      "timesConsumed": newTimesConsumed,
      "lastConsumed": newLastConsumed
    });
    console.log(body);
    let resStatusCode = 0;
    fetch(Constants.RATEENTRY_API_URL, {
      method: Constants.METHOD_POST,
      headers: {
        ...Constants.AUTH_HEADER,
        ...Constants.JSON_CONTENT_TYPE
      },
      body: body
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
      switch (resStatusCode) {
        case 401:
          this.setState({ errorMessage: error.message });
          break;
        default:
          console.log(error.message);
          break;
      }
    });
  }

  ratingsChanged(e, state) {
    state.data.rating.rating = e.target.value;
    this.setState({
      data: state.data
    });
  }

  timesChanged(e, state) {
    if (e.target.validity.valid) {
      state.data.rating.timesConsumed = e.target.value;
      this.setState({
        data: state.data
      });
    }
  }

  lastChanged(e, state) {
    if (e.target.validity.valid) {
      state.data.rating.lastConsumed = e.target.value;
      this.setState({
        data: state.data
      });
    }
  }

  saveChanges(e, state) {
    if (e.target.validity.valid) {        
      this.UploadChanges(state.data.rating, state.data.rating.rating, state.data.rating.timesConsumed, state.data.rating.lastConsumed);
    }
  }

  render() {
    /*show error message if it's not empty */
    if (this.state.errorMessage) {
      return (
        <h1 className='erroMessage'> {this.state.errorMessage} </h1>
      );
    }
    
    if (this.state.data) {

      const game = this.state.data.game.game;
      const creator = this.state.data.game.creator;
      const rating = this.state.data.rating;

      /* else */
      return (
        <div>
          <table className="center">
            <tbody>
              <tr className='no-border'>
                <td rowSpan='2'> <img className='largePosterImage' src={game.poster ? game.poster : Constants.IMAGE_NOT_FOUND_URL} alt='img' /> </td>
                <td>{game.title}</td>
              </tr>
              <tr className='no-border'>
                <td className='description'>{game.description}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table className="center">
            <tbody>
              <tr className='no-border'>
                <td>Release date:   </td>
                <td>{StringFormatter.formatDate(game.releaseDate)}</td>
                <td></td>
                <td></td>
                <td>{EnumFormatter.formatCreatorType(creator.type)}:   </td>
                { creator.creator_id != -1 ?
                <td><Link className='link' to={Constants.getCreatorURL(creator.creator_id)}>{creator.name}</Link></td> :
                <td><a>-</a></td>
                }
              </tr>
            </tbody>
          </table>
          <br />
          <table className="center">
            <tbody>
              <tr className='no-border'>
                <td>Times played:   </td>
                <td> <input className='numberInputField' pattern="[0-9]*" id={'times_'+game.id} type='number' value={rating.timesConsumed} onChange={(e) => this.timesChanged(e, this.state)}/> </td>
                <td></td>
                <td></td>
                <td>Last played:   </td>
                <td> <input className='dateInputField' id={'last_'+game.id} type='date' value={format(new Date(rating.lastConsumed), 'yyyy-MM-dd')} onChange={(e) => this.lastChanged(e, this.state)}></input> </td>
              </tr>
              <tr className='no-border'>
                <td>Rating:   </td>
                <td>  <input className='numberInputField' id={'rating_'+game.id} type='number' value={rating.rating} onChange={(e) => this.ratingsChanged(e, this.state)}/> </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className='no-border'>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td> <input id={game.id} type='button' value='save' onClick={(e) => this.saveChanges(e, this.state)}/> </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (<a />);
    }
  }

}

export default RatedGameDetailsComponent;