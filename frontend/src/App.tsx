import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './widgits/Header';
import Home from './components/Home/Home';
import Books from './components/Books/Books';
import Rentals from './components/Rentals/Rentals';


function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/rentals" component={Rentals} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
