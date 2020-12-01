import React from 'react';
import * as Constants from '../../Tools/Constants'
import * as StringFormatter from '../../Tools/StringFormatter'
import { Link } from 'react-router-dom'

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
    let index = 1;
    return (
      <table className="center">
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
          {this.state.watchables.map(row => (
            <tr key={row.watchable.id}>              
              <td>{index++}</td>
              <td> <img className='smallPosterImage' src={row.watchable.poster ? row.watchable.poster : Constants.IMAGE_NOT_FOUND_URL}  alt='img'/> </td>
              <td><a className='link' href={Constants.WATCHABLE_URL + '/' + row.watchable.id}>{row.watchable.title}</a></td>
              <td>{StringFormatter.formatDate(row.watchable.releaseDate)}</td>              
              {row.creator.creator_id != -1 ? 
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

export default AllWatchablesListComponent;