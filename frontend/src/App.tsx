import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import "./App.css";

import { ProtectedRoute } from './widgets/Routes';

import Header from "./widgets/Header";
import Login from './components/Login';
import Home from './components/Home';
import Index from "./components/Index";
import Books from "./components/Books";
import Rentals from "./components/Rentals";
import Information from "./components/Information";
import EditingBook from "./components/EditingBook";
import RegisteringBooks from "./components/RegisteringBooks";
import Borrowing from "./components/Borrowing";
import { useEffect } from "react";

const withHeader = (Component: any) => (<><Header /><Container><Component /></Container></>);

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const signup = user ? user!['https://example.com/signup'] ?? false : false;

  useEffect(() => {
    (async () => {
      if (signup) {
        // register user information
        console.log('register user info');
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_ENDPOINT
        });

        const api_endpoint = `${process.env.REACT_APP_API_ENDPOINT}/users`;
        const result = fetch(api_endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    })()
  }, [signup])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => withHeader(Index)} />
        <Route exact path="/login" component={Login} />
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
