import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import Games from './pages/Games';
import Watchables from './pages/Watchables';
import Creators from './pages/Creators';
import User from './pages/User';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import * as FaIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi'
import * as AiIcons from "react-icons/ai";
import * as Constants from './Tools/Constants'

function App() {
  return (
    <div className='main'>
      <Router>
        <div className='navbar'>
          <ProSidebar>
            <Menu iconShape="circle">
              <MenuItem icon={<AiIcons.AiFillHome />}>Dashboard <Link to="/" /> </MenuItem>
              <SubMenu title="Games" icon={<GiIcons.GiGamepad />}>
                <MenuItem>Games<Link to={Constants.GAME_LIST_URL} /></MenuItem>
                <MenuItem>Post (TBD)</MenuItem>
              </SubMenu>
              <SubMenu title="Watchables" icon={<GiIcons.GiGamepad />}>
                <MenuItem>Watchables<Link to={Constants.WATCHABLE_LIST_URL} /></MenuItem>
                <MenuItem>Post (TBD)</MenuItem>
              </SubMenu>
              <SubMenu title="Creators" icon={<GiIcons.GiGamepad />}>
                <MenuItem>Creators<Link to={Constants.CREATORS_LIST_URL} /></MenuItem>
                <MenuItem>Post (TBD)</MenuItem>
              </SubMenu>
            </Menu>
            <SidebarFooter>
              <Menu iconShape="circle">
                  <MenuItem>User<Link to={Constants.USER_URL} /></MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
        <div className="body">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path={Constants.GAME_LIST_URL} component={Games} />
            <Route path={Constants.WATCHABLE_LIST_URL} component={Watchables} />
            <Route path={Constants.CREATORS_LIST_URL} component={Creators} />
            <Route path={Constants.USER_URL} component={User} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
