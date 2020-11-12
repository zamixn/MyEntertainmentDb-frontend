import React from 'react';
import SystemUser from '../../services/systemuser'
import * as Constants from '../../Tools/Constants'

class LoggedIn extends React.Component {

    onLogoutClick(e) {
        
        let resStatusCode = 0;
        fetch(Constants.LOGOUT_API_URL, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': SystemUser.getJWT()
            },
        }).then(response => {
            resStatusCode = response.status;
            if (!response.ok) {
              throw new Error(response.state);
            }
            const json = response.json();
            return json;
        }).then(result => {
            console.log(result);
            SystemUser.logout();
            window.location.reload(false);
        }).catch(error => {
            console.log(error.message);
            switch(resStatusCode){
                case 400:
                    this.setState({errorMessage: 'Failled to logout'});
                    break;
                default:
                    break;
            }
            SystemUser.logout();
            window.location.reload(false);
        });
    }

    render() {
        const user = SystemUser.getCurrentUser();
        return (
            <div className='login'>
                Logged in
                <br />
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td> <label>Username</label> </td>
                            <td> {user.username} </td>
                        </tr>
                        <tr>
                            <td> <label>Role</label> </td>
                            <td> {SystemUser.RoleString(user.role)} </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <button onClick={e => this.onLogoutClick(e)}>Logout</button>
            </div>
        );
    }
}

export default LoggedIn;