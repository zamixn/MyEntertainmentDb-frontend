import React from 'react';
import * as Constants from '../Tools/Constants'
import * as StringFormatter from '../Tools/StringFormatter'

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
            <th>Info</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {this.state.creators.map(creator => (
            <tr key={creator.id}>
              <td>{creator.name}</td>
              <td>{creator.info}</td>
              <td>{creator.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default CreatorsListComponent;