import React from 'react';
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'

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
    return (
      <table>
        <thead>
          <tr>
            <th/>
            <th>Title</th>
            <th>Release</th>
            <th># played</th>
            <th>Last played</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {this.state.games.map(row => (
            <tr key={row.game.id}>
              {console.log(row.game.poster)}
              <td> <img className='smallPosterImage' src={row.game.poster ? row.game.poster : Constants.IMAGE_NOT_FOUND_URL}  alt='img'/> </td>
              <td><a className='link' href={Constants.GAME_URL + '/' + row.game.id}>{row.game.title}</a></td>
              <td>{StringFormatter.formatDate(row.game.releaseDate)}</td>
              <td>{row.game.timesPlayed}</td>
              <td>{StringFormatter.formatDate(row.game.lastPlayed)}</td>
              <td><a className='link' href={Constants.CREATOR_URL + '/' + row.creator.creator_id}>{row.creator.name}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AllGameListComponent;