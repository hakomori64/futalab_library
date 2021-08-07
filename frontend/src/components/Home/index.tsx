import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectGroup, fetchGroups } from '../../store/groupSlice';

const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const signup = user ? user!['https://example.com/signup'] ?? false : false;

  const dispatch = useDispatch();
  const { loading, error, groups } = useSelector(selectGroup);
  
  useEffect(() => {
    (async () => {
      if (signup) {
        if (user === null) return;

        // register user information
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_ENDPOINT
        });

        const api_endpoint = `${process.env.REACT_APP_API_ENDPOINT}/users`;
        if (user!.email === null || user!.sub == null) return;
        const email: string = user!.email! as string;

        //TODO(hakomori64): すでに登録されていればなにもしない 現在、500エラーが起きてなにもしないって感じになってる
        const result = await fetch(api_endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            name: user!.name || user!.nickname || 'ゲスト',
            sub: user!.sub
          })
        })
      }
    })()
  }, [signup])

  return (
    <div>
      <button onClick={async () => {
        await axios.post('http://localhost:3001/api/groups/4/users/join', { user_id: 65 });
      }}>add user</button>
    </div>
  );
};

export default Home;