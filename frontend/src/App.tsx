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
import BookInfo from "./components/Books/Info";
import BookCreate from "./components/Books/Create";
import BookEdit from "./components/Books/Edit";
import BookBorrow from "./components/Books/Borrow";

import Rentals from "./components/Rentals";

import Groups from "./components/Groups";
import GroupInfo from "./components/Groups/Info";
import GroupCreate from "./components/Groups/Create";
import GroupInviteSuccess from "./components/Groups/Invite/Success";

import Invitations from "./components/Invitations";

import Profile from './components/Profile';


import { useDispatch } from 'react-redux';
import { fetchGroups } from './store/groupSlice';
import { fetchInvitations } from './store/invitationSlice';
import { fetchProfile } from './store/profileSlice';

const withHeader = (Component: any) => (<><Header /><Container><Component /></Container></>);

function App() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        console.log('setting bearer token...');
        const accessToken = await getAccessTokenSilently();
        axios.interceptors.request.use(async config => {
          const requestConfig = config;
          if (accessToken) {
            requestConfig.headers.common.Authorization = `Bearer ${accessToken}`;
          }
          return requestConfig;
        });
        dispatch(fetchGroups());
        dispatch(fetchInvitations());
        dispatch(fetchProfile());
      }
    })()
  }, [isAuthenticated, user, dispatch, getAccessTokenSilently]);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => withHeader(Index)} />
        <ProtectedRoute exact path="/home" component={() => withHeader(Home)} />
        <ProtectedRoute exact path="/books" component={() => withHeader(Books)} />
        <ProtectedRoute exact path="/books/create" component={() => withHeader(BookCreate)} />
        <ProtectedRoute exact path="/books/:id" component={() => withHeader(BookInfo)} />
        <ProtectedRoute exact path="/books/:id/edit" component={() => withHeader(BookEdit)} />
        <ProtectedRoute exact path="/books/:id/borrow" component={() => withHeader(BookBorrow)} />

        <ProtectedRoute exact path="/rentals" component={() => withHeader(Rentals)} />

        <ProtectedRoute exact path="/groups" component={Groups} />
        <ProtectedRoute exact path="/groups/create" component={GroupCreate} />
        <ProtectedRoute exact path="/groups/:id" component={GroupInfo} />
        <ProtectedRoute exact path="/groups/:id/invite/success" component={GroupInviteSuccess} />

        <ProtectedRoute exact path="/invitations" component={() => withHeader(Invitations)} />

        <ProtectedRoute exact path="/profile" component={() => withHeader(Profile)} />
      </Switch>
    </Router>
  );
}

export default App;
