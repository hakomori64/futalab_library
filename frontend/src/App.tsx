import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './widgits/header';
import Home from './components/Home';
import Books from './components/Books';
import Rentals from './components/Rentals';
import Information from "./components/Information";
import RegisteringBooks from "./components/RegisteringBooks";
import Borrowing from "./components/Borrowing";


function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/rentals" component={Rentals} />
          <Route exact path="/Info/:id" component={Information} />
          <Route exact path="/Register" component={RegisteringBooks} />
          <Route exact path="/Borrow" component={Borrowing} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
