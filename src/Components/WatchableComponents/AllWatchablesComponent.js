import React from 'react';
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'

class AllWatchablesListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watchables: []
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
        this.setState({ watchables: result });
      })
  }

  render() {
    return (
      <table className="center">
        <thead>
          <tr>
            <th/>
            <th>Title</th>
            <th>Release</th>
            <th># seen</th>
            <th>Last seen</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {this.state.watchables.map(row => (
            <tr key={row.id}>
              <td> <img className='smallPosterImage' src={row.poster ?? Constants.IMAGE_NOT_FOUND_URL} /> </td>
              <td>{row.title}</td>
              <td>{StringFormatter.formatDate(row.releaseDate)}</td>
              <td>{row.timesSeen}</td>
              <td>{StringFormatter.formatDate(row.lastSeen)}</td>
              <td>{row.creator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AllWatchablesListComponent;