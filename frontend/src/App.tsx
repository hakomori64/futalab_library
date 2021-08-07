import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import "./App.css";

import { ProtectedRoute } from './widgets/Routes';

import Header from "./widgets/Header";
import Home from './components/Home';
import Index from "./components/Index";
import Books from "./components/Books";
import Rentals from "./components/Rentals";
import BookInfo from "./components/Books/Info";
import BookEdit from "./components/Books/Edit";
import RegisteringBooks from "./components/RegisteringBooks";
import Borrowing from "./components/Borrowing";

import { useDispatch } from 'react-redux';
import { fetchGroups } from './store/groupSlice';

const withHeader = (Component: any) => (<><Header /><Container><Component /></Container></>);

function App() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        axios.interceptors.request.use(async config => {
          const requestConfig = config;
          if (accessToken) {
            requestConfig.headers.common.Authorization = `Bearer ${accessToken}`;
          }
          return requestConfig;
        });
        dispatch(fetchGroups());
      }
    })()
  }, [isAuthenticated, user, dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => withHeader(Index)} />
        <ProtectedRoute exact path="/home" component={() => withHeader(Home)} />
        <ProtectedRoute exact path="/books" component={() => withHeader(Books)} />
        <ProtectedRoute exact path="/books/:id" component={() => withHeader(BookInfo)} />
        <ProtectedRoute exact path="/books/:id/edit" component={() => withHeader(BookEdit)} />
        <ProtectedRoute exact path="/rentals" component={() => withHeader(Rentals)} />
        <ProtectedRoute exact path="/register" component={() => withHeader(RegisteringBooks)} />
        <ProtectedRoute exact path="/borrow/:id" component={() => withHeader(Borrowing)} />
      </Switch>
    </Router>
  );
}

export default App;
