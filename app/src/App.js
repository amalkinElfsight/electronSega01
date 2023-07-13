import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Main from './main';
import Pingtest from './pingtest';

// https://github.com/electron/electron/issues/7300
// We don't want to bundle electron in the webpack process so we use it's globally
// exposed require method.
// const electron = window.require('electron');
// const fs = electron.remote.require('fs');
// var files = fs.readdirSync('./');

const Home = () => (
<Main />
);

/* const User = () => (
<Calendar/>
  <Route path="/calendar" component={User}/>
); */

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>  
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/usr/src/app/build/index.html" exact component={Home}/>
            <Route path="/pingtest" exact component={Pingtest}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
