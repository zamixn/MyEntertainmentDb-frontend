import React from 'react';
import * as Constants from '../Tools/Constants'
import * as StringFormatter from '../Tools/StringFormatter'

class GameListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    }
  }

  componentDidMount() {
    const url = Constants.WATCHABLE_LIST_API_URL;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
      })
      .then(result => {
        this.setState({ games: result });
      })
  }

  render() {
    return (
      <table className="center">
        <thead>
          <tr>
            <th>Title</th>
            <th>ReleaseDate</th>
            <th>Description</th>
            <th>TimesSeen</th>
            <th>LastSeen</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {this.state.games.map(game => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{StringFormatter.formatDate(game.releaseDate)}</td>
              <td>{game.description}</td>
              <td>{game.timesSeen}</td>
              <td>{StringFormatter.formatDate(game.lastSeen)}</td>
              <td>{game.creator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GameListComponent;