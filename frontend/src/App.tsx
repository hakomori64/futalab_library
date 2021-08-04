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
import Information from "./components/Information";
import EditingBook from "./components/EditingBook";
import RegisteringBooks from "./components/RegisteringBooks";
import Borrowing from "./components/Borrowing";

import { store } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroup, fetchGroups } from './store/groupSlice';

const withHeader = (Component: any) => (<><Header /><Container><Component /></Container></>);

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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
  }, [isAuthenticated, dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => withHeader(Index)} />
        <ProtectedRoute exact path="/home" component={() => withHeader(Home)} />
        <ProtectedRoute exact path="/books" component={() => withHeader(Books)} />
        <ProtectedRoute exact path="/rentals" component={() => withHeader(Rentals)} />
        <ProtectedRoute exact path="/info/:id" component={() => withHeader(Information)} />
        <ProtectedRoute exact path="/edit/:id" component={() => withHeader(EditingBook)} />
        <ProtectedRoute exact path="/register" component={() => withHeader(RegisteringBooks)} />
        <ProtectedRoute exact path="/borrow/:id" component={() => withHeader(Borrowing)} />
      </Switch>
    </Router>
  );
}

export default App;
