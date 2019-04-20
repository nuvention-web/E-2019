import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/home';
import Main from './components/homec';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const routing = (
    <Router>
      <div>
      <Switch>
          <Redirect exact from={`/`} to={`/app`} />
        <Route path="/home" component={Home} >
        </Route>
        <Route path="/app" component={App} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
