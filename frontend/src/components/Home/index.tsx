import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { Container, } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const signup = user ? user!['https://example.com/signup'] ?? false : false;

  useEffect(() => {
    (async () => {
      if (signup) {
        if (user === null) return;

        // register user information
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_ENDPOINT
        });

        const api_endpoint = `${process.env.REACT_APP_API_ENDPOINT}/users`;
        if (user!.email === null) return;
        const email: string = user!.email! as string;

        //TODO(hakomori64): すでに登録されていればなにもしない 現在、500エラーが起きてなにもしないって感じになってる
        await fetch(api_endpoint, {
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
      }
    })()
  }, [signup, user, getAccessTokenSilently ])

  return (
    <Container>
      <div>このアプリはグループ共有の本棚を管理するためのアプリです。</div>
      <div>書籍の管理は<Link to="/books">こちら</Link>から</div>
      <div>貸出・返却は<Link to="/rentals">こちら</Link>から</div>
    </Container>
  );
};

export default Home;