import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Index = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/home');
    }
  }, [history, isAuthenticated]);

  //TODO show loading screen
  if (isLoading) {
    return (<div>Loaidng</div>);
  }

  return (
    <div>
      <h1>書籍管理システム</h1>
      <div>これはあなたの本棚を整理するツールです。いろいろと機能があるのでぜひとも試してみてください。</div>
    </div>
  );
}

export default Index;
