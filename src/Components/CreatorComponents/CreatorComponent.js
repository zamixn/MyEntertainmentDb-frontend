import React from 'react';
import * as Constants from '../../Tools/Constants'
import * as EnumFormatter from '../../Tools/EnumFormatter'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'

class CreatorComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      errorMessage: ''
    }
  }

  componentDidMount() {
    const url = Constants.getCreatorAPI_URL(this.props.id);

    let resStatusCode = 0;
    fetch(url)
      .then(response => {
        resStatusCode = response.status;
        if (!response.ok) {
          throw new Error(response.state);
        }
        return response.json();
      }).then(result => {
        this.setState({ data: result });
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
        <tr>
          <td> </td>
          <td className='erroMessage'> {this.state.errorMessage} </td>
        </tr>
      );
    }
    
    if (this.state.data) {

      const creator = this.state.data;

      /* else */
      return (
        <div>
          <table className="center">
            <tbody>
              <tr className='no-border'>
                <td colSpan='2' >{creator.name}</td>
              </tr>
              <tr className='no-border'>
                <td>Type:</td>
                <td>{EnumFormatter.formatCreatorType(creator.type)}</td>
              </tr>
            </tbody>
          </table>
          <br />          
          <table className="center">
            <tbody>
              <tr className='no-border'>
                <td>Info:</td>
              </tr>
              <tr className='no-border'>
                <td>{creator.info}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (<a />);
    }
  }
}

export default CreatorComponent;