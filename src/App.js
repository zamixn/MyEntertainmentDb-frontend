import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Games from './pages/Games';
import Watchables from './pages/Watchables';
import Creators from './pages/Creators';
import MyGames from './pages/MyGames';
import GameDetailsPage from './pages/Game';
import WatchableDetailsPage from './pages/Watchable';
import CreatoreDetailsPage from './pages/Creator';
import MyWatchables from './pages/MyWatchables';
import CreateGame from './pages/CreateGame';
import CreateWatchable from './pages/CreateWatchable';
import User from './pages/User';
import RegisterPage from './pages/Register';
import SystemUser from './services/systemuser';
import 'react-pro-sidebar/dist/css/styles.css';
import * as Constants from './Tools/Constants'
import Sidebar from './Components/Sidebar/Sidebar'

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

  return (

    <div className='main'>
      <Router>
        
        <Sidebar />
        
        <div className="body">
            <Switch>
              <Route path='/' exact component={User} />
              <Route path={Constants.GAMES_URL} component={Games} />
              <Route path={Constants.WATCHABLES_URL} component={Watchables} />
              <Route path={Constants.CREATORS_URL} component={Creators} />
              <Route path={Constants.USER_URL} component={User} />
              <Route path={Constants.REGISTER_URL} component={RegisterPage} />
              {SystemUser.isLoggedIn() ? <Route path={Constants.MY_GAME_LIST_URL} component={MyGames} /> : null}
              {SystemUser.isLoggedIn() ? <Route path={Constants.MY_WATCHABLE_LIST_URL} component={MyWatchables} /> : null}
              <Route exact path={Constants.GAME_URL + '/:id'} render={props => <GameDetailsPage id={props.match.params.id} />} />
              <Route exact path={Constants.WATCHABLE_URL + '/:id'} render={props => <WatchableDetailsPage id={props.match.params.id} />} />
              <Route exact path={Constants.CREATOR_URL + '/:id'} render={props => <CreatoreDetailsPage id={props.match.params.id} />} />
              {SystemUser.IsAdmin() ? <Route path={Constants.GAME_CREATE_URL} component={CreateGame} /> : null}
              {SystemUser.IsAdmin() ? <Route path={Constants.WATCHABLE_CREATE_URL} component={CreateWatchable} /> : null}
            </Switch>            
        </div>
      </Router>
    </div>
  );
}

export default App;
