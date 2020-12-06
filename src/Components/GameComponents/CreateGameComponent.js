import React from 'react';
import systemuser from '../../services/systemuser';
import * as Constants from '../../Tools/Constants'
import { Redirect } from "react-router-dom";

class CreateGameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      date: '',
      poster: '',
      errorMessage: '',
      postSuccess: ''
    }
  }

  dateChanged(e, state){
    if (e.target.validity.valid) {
      state.date = e.target.value;
      this.setState({
        date: state.date,
      });
    }
  }

  descChanged(e, state){
    if (e.target.validity.valid) {
      state.desc = e.target.value;
      this.setState({
        desc: state.desc,
      });
    }
  }

  titleChanged(e, state){
    if (e.target.validity.valid) {
      state.title = e.target.value;
      this.setState({
        title: state.title,
      });
    }
  }

  posterChanged(e, state){
    if (e.target.validity.valid) {
      state.poster = e.target.value;
      this.setState({
        poster: state.poster,
      });
    }
  }

  createEntry(e, state) {
    if (e.target.validity.valid) {
        if(!state.date){
            this.setState({errorMessage: 'Invalid date'});
            return;
        }
        if(!state.title){
            this.setState({errorMessage: 'Invalid title'});
            return;
        }

        let body = JSON.stringify({
          "releaseDate": state.date,
          "title": state.title,
          "description": state.desc,
          "creator": systemuser.getUserId(),
          "poster": state.poster
        });
        console.log(body);
        let resStatusCode = 0;
        fetch(Constants.GAME_LIST_API_URL, {
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
          this.setState({postSuccess:'true'});
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
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td> <input id={'title_input'} type='text' value={this.state.title} onChange={(e) => this.titleChanged(e, this.state)}/> </td>
          </tr>
          <tr>
            <td>Poster URL</td>
            <td> <input id={'poster_input'} type='text' value={this.state.poster} onChange={(e) => this.posterChanged(e, this.state)}/> </td>
          </tr>
          <tr>
            <td>Description</td> 
            <td> <textarea  id={'desc_input'} value={this.state.desc} onChange={(e) => this.descChanged(e, this.state)}/> </td>
          </tr>
          <tr>
            <td>Release Date</td>
            <td> <input id={'date_input'} type='date' value={this.state.date} onChange={(e) => this.dateChanged(e, this.state)}></input> </td>
          </tr>
          <tr className='no-border'><td><br/></td></tr>
          <tr className='no-border'><td><br/></td></tr>
          <tr>
            <td>Creator</td>
            <td>{systemuser.getCurrentUser().username}</td>
          </tr>
          <tr className='no-border'><td><br/></td></tr>
          <tr className='no-border'><td><br/></td></tr>
          <tr className='no-border'><td><br/></td></tr>
          <tr className='no-border' >
            <td colSpan='2'> <input id={'create'} type='button' value='create' onClick={(e) => this.createEntry(e, this.state)}/> </td>
          </tr>
          <tr className='no-border' >
            <td colSpan='2'> <h1 className='erroMessage'> {this.state.errorMessage} </h1> </td>
          </tr>
        </tbody>
        {this.state.postSuccess ? <Redirect to={Constants.GAMES_URL} push/> : null}
      </table>
    );
  }
}

export default CreateGameComponent;