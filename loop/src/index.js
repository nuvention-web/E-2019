import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./components/home";
import Main from "./components/homec";
import * as serviceWorker from "./serviceWorker";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MainReducer from "./services/store";
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
const store = createStore(MainReducer);
const client = new ApolloClient({
  uri: 'https://us-central1-e-2019.cloudfunctions.net/api/graphql'
});

library.add(fab);

const routing = (
  <ApolloProvider client={client}>
  <Provider store={store}>
  <Router>
    <div>
      <Switch>
        <Redirect exact from={`/`} to={`/app`} />
        <Route path="/home" component={Home} />
        <Route path="/app" component={App} />
      </Switch>
    </div>
  </Router>
  </Provider>
  </ApolloProvider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
