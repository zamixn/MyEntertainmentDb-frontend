import React from 'react';
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'
import { Link } from 'react-router-dom'

class AllGameListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    }
  }

  componentDidMount() {
    const url = Constants.GAME_LIST_API_URL;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
      }).then(result => {
        this.setState({ games: result });
      }).catch(error => {
        console.log(error.message)
    });
  }

  render() {
    let index = 1;
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th/>
            <th>Title</th>
            <th>Release</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {this.state.games.map(row => (
            <tr key={row.game.id}>
              <td>{index++}</td>
              <td> <img className='smallPosterImage' src={row.game.poster ? row.game.poster : Constants.IMAGE_NOT_FOUND_URL}  alt='img'/> </td>
              <td><Link className='link' to={Constants.getGameURL(row.game.id)}>{row.game.title}</Link></td>
              <td>{StringFormatter.formatDate(row.game.releaseDate)}</td>
              { row.creator.creator_id != -1 ?
              <td><Link className='link' to={Constants.getCreatorURL(row.creator.creator_id)}>{row.creator.name}</Link></td> :
              <td><a>-</a></td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AllGameListComponent;