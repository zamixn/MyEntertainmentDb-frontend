import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'

import systemuser from '../../services/systemuser';
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'
import * as EnumFormatter from '../../Tools/EnumFormatter'

class GameDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: '',
      errorMessage: ''
    }
  }

  componentDidMount() {
    const url = Constants.getGameAPI_URL(this.props.id);

    let resStatusCode = 0;
    fetch(url)
      .then(response => {
        resStatusCode = response.status;
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
      }).then(result => {
        this.setState({ game: result });
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

  render() {
    /*show error message if it's not empty */
    if (this.state.errorMessage) {
      return (
        <h1 className='erroMessage'> {this.state.errorMessage} </h1>
      );
    }

    if (this.state.game) {

      const game = this.state.game.game;
      const creator = this.state.game.creator;

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
                <td>{game.description}</td>
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
        </div>
      );
    }
    else {
      return (<a></a>);
    }
  }

}

export default GameDetailsComponent;