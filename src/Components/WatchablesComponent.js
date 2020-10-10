import React from 'react';
import * as Constants from '../Tools/Constants'
import * as StringFormatter from '../Tools/StringFormatter'

class WatchableListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watchables: []
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
      })
      .then(result => {
        this.setState({ watchables: result });
      })
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>ReleaseDate</th>
            <th>Description</th>
            <th>TimesPlayed</th>
            <th>LastPlayed</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {this.state.watchables.map(w => (
            <tr key={w.id}>
              <td>{w.title}</td>
              <td>{StringFormatter.formatDate(w.releaseDate)}</td>
              <td>{w.description}</td>
              <td>{w.timesPlayed}</td>
              <td>{StringFormatter.formatDate(w.lastPlayed)}</td>
              <td>{w.creator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default WatchableListComponent;