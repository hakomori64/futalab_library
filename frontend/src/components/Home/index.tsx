import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectGroup, fetchGroups } from '../../store/groupSlice';

const Home = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const signup = user ? user!['https://example.com/signup'] ?? false : false;

  const dispatch = useDispatch();
  const { loading, error, groups } = useSelector(selectGroup);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);
  
  useEffect(() => {
    (async () => {
      if (signup) {
        if (user === null) return;

        // register user information
        console.log('register user info');
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_ENDPOINT
        });

        const api_endpoint = `${process.env.REACT_APP_API_ENDPOINT}/users`;
        if (user!.email === null) return;
        const email: string = user!.email! as string;

        //TODO(hakomori64): すでに登録されていればなにもしない
        const result = await fetch(api_endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            name: user!.name || user!.nickname || 'ゲスト'
          })
        })
        console.log('fetch complete');
      }
    })()
  }, [signup])

  console.log("groups");
  console.log(groups);
  return (
    <div>Hello This is your home page</div>
  );
};

export default Home;