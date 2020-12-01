import React from "react";

import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import * as GiIcons from 'react-icons/gi'
import * as AiIcons from "react-icons/ai"
import * as CgIcons from 'react-icons/cg'
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'
import * as HiIcons from 'react-icons/hi'

import SystemUser from '../../services/systemuser';
import * as Constants from '../../Tools/Constants'


class SidebarFull extends React.Component {

    render() {  
        const userLabel = SystemUser.isLoggedIn() ? 'Logged in as: ' + SystemUser.getCurrentUser().username : 'Log in';
        return (
            <div className='navbar'>
                <ProSidebar>
                <Menu iconShape="circle">
                    <MenuItem icon={<AiIcons.AiFillHome />}>Home <Link to="/" /> </MenuItem>
                    <SubMenu title="Games" icon={<GiIcons.GiGamepad />}>
                    <MenuItem>Games<Link to={Constants.GAMES_URL} /></MenuItem>                
                    {SystemUser.isLoggedIn() && <MenuItem>My Games<Link to={Constants.MY_GAME_LIST_URL} /></MenuItem>}
                    </SubMenu>
                    <SubMenu title="Watchables" icon={<RiIcons.RiMovieFill />}>
                    <MenuItem>Watchables<Link to={Constants.WATCHABLES_URL} /></MenuItem>
                    {SystemUser.isLoggedIn() && <MenuItem>My Watchables<Link to={Constants.MY_WATCHABLE_LIST_URL} /></MenuItem>}
                    </SubMenu>
                    <SubMenu title="Creators" icon={<HiIcons.HiUsers />}>
                    <MenuItem>Creators<Link to={Constants.CREATORS_URL} /></MenuItem>
                    </SubMenu>
                </Menu>
                <SidebarFooter>
                    <Menu iconShape="circle">
                        <MenuItem icon={<BsIcons.BsPersonFill />}>{userLabel}<Link to={Constants.USER_URL} /></MenuItem>
                        <MenuItem icon={<CgIcons.CgLogIn />}>Register<Link to={Constants.REGISTER_URL} /></MenuItem>
                    </Menu>
                </SidebarFooter>
                </ProSidebar>
            </div>
        );
    }
}

export default SidebarFull;