import React from 'react';
import * as Constants from '../../Tools/Constants'
import SystemUser from '../../services/systemuser'

class Register extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    ValidateInput() {
        return this.state.username && this.state.password;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.ValidateInput())
            return;
        const body = JSON.stringify(
            {
                username: this.state.username,
                passwordHash: this.state.password
            }
        );

        let resStatusCode = 0;
        fetch(Constants.REGISTER_API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        }).then(function (response) {
            resStatusCode = response.status;
            if (!response.ok) {
                throw new Error(response.state);
            }
            const userData = response.json();
            return userData;
        }).then(result => {
            SystemUser.loginWithUser(result);
            window.location.reload(false);
        }).catch(error => {
            console.log(error.message)
            this.setState({errorMessage: 'Oops, failed to register with code ' + resStatusCode + ', try using a different username and password'});
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className='login'>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td> <label htmlFor="username">Enter username</label> </td>
                                <td> <input onChange={e => this.onChange(e)} id="username" name="username" type="text" /> </td>
                            </tr>
                            <tr>
                                <td> <label htmlFor="password">Enter your password</label> </td>
                                <td> <input onChange={e => this.onChange(e)} id="password" name="password" type="password" /> </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td> <button>Register</button> </td>
                            </tr> 
                            { /*show error message if it's not empty */}
                            { this.state.errorMessage ?
                            <tr>
                                <td> </td>
                                <td className='erroMessage'> {this.state.errorMessage} </td>
                            </tr> : null
                            }
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default Register;