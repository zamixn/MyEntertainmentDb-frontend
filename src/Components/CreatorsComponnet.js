import React from 'react';
import * as Constants from '../Tools/Constants'
import * as EnumFormatter from '../Tools/EnumFormatter'

class CreatorsListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creators: []
    }
  }

  componentDidMount() {
    const url = Constants.CREATORS_LIST_API_URL;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
      })
      .then(result => {
        this.setState({ creators: result });
      })
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {this.state.creators.map(creator => (
            <tr key={creator.creator_id}>
              <td><a className='link' href={Constants.CREATOR_URL + '/' + creator.creator_id}>{creator.name}</a></td>
              <td>{EnumFormatter.formatCreatorType(creator.type)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default CreatorsListComponent;