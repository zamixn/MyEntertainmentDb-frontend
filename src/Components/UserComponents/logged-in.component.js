import React from 'react';
import SystemUser from '../../services/systemuser'

class LoggedIn extends React.Component {

    onLogoutClick(e) {
        SystemUser.logout();
        window.location.reload(false);
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