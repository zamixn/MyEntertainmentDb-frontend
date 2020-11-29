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
            <tr key={row.id}>
              <td> <img className='smallPosterImage' src={row.poster ?? Constants.IMAGE_NOT_FOUND_URL} /> </td>
              <td>{row.title}</td>
              <td>{StringFormatter.formatDate(row.releaseDate)}</td>
              <td>{row.timesPlayed}</td>
              <td>{StringFormatter.formatDate(row.lastPlayed)}</td>
              <td>{row.creator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AllGameListComponent;