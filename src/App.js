import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Games from './pages/Games';
import Watchables from './pages/Watchables';
import Creators from './pages/Creators';
import MyGames from './pages/MyGames';
import MyWatchables from './pages/MyWatchables';
import User from './pages/User';
import RegisterPage from './pages/Register';
import SystemUser from './services/systemuser';
import Test from './Components/ViewportProvider';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import * as GiIcons from 'react-icons/gi'
import * as AiIcons from "react-icons/ai";
import * as Constants from './Tools/Constants'

function App() {
  if(SystemUser.isLoggedIn()){    
    // validate log in
    const url = Constants.VALIDATE_LOGIN_URL;
    let authHeader = {'Authorization': SystemUser.getJWT()};
    fetch(url, {headers:authHeader})
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(result => {
        console.log("User validated");
      }).catch(error => {
        console.log("User unautherized");
        SystemUser.logout();
        window.location.reload(false);
      });
    

    console.log("logged in as: " + SystemUser.getCurrentUser().id);
  }
  const userLabel = SystemUser.isLoggedIn() ? 'Logged in as: ' + SystemUser.getCurrentUser().username : 'Log in';
  return (
    <div className='main'>
      <Router>
        <div className='navbar'>
          <ProSidebar>
            <Menu iconShape="circle">
              <MenuItem icon={<AiIcons.AiFillHome />}>Dashboard <Link to="/" /> </MenuItem>
              <SubMenu title="Games" icon={<GiIcons.GiGamepad />}>
                <MenuItem>Games<Link to={Constants.GAME_LIST_URL} /></MenuItem>                
                {SystemUser.isLoggedIn() && <MenuItem>My Games<Link to={Constants.MY_GAME_LIST_URL} /></MenuItem>}
              </SubMenu>
              <SubMenu title="Watchables" icon={<GiIcons.GiGamepad />}>
                <MenuItem>Watchables<Link to={Constants.WATCHABLE_LIST_URL} /></MenuItem>
                {SystemUser.isLoggedIn() && <MenuItem>My Watchables<Link to={Constants.MY_WATCHABLE_LIST_URL} /></MenuItem>}
              </SubMenu>
              <SubMenu title="Creators" icon={<GiIcons.GiGamepad />}>
                <MenuItem>Creators<Link to={Constants.CREATORS_LIST_URL} /></MenuItem>
              </SubMenu>
            </Menu>
            <SidebarFooter>
              <Menu iconShape="circle">
                  <MenuItem>{userLabel}<Link to={Constants.USER_URL} /></MenuItem>
                  <MenuItem>Register<Link to={Constants.REGISTER_URL} /></MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
        <div className="body">
            <Switch>
              <Route path='/' exact component={User} />
              <Route path={Constants.GAME_LIST_URL} component={Games} />
              <Route path={Constants.WATCHABLE_LIST_URL} component={Watchables} />
              <Route path={Constants.CREATORS_LIST_URL} component={Creators} />
              <Route path={Constants.USER_URL} component={User} />
              <Route path={Constants.REGISTER_URL} component={RegisterPage} />
              {SystemUser.isLoggedIn() && <Route path={Constants.MY_GAME_LIST_URL} component={MyGames} />}
              {SystemUser.isLoggedIn() && <Route path={Constants.MY_WATCHABLE_LIST_URL} component={MyWatchables} />}
            </Switch>            
        </div>
      </Router>
    </div>
  );
}

export default App;
