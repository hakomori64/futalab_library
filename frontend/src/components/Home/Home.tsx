import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Welcome !!</h1>
        <Link to="/books">Books</Link>
        <Link to="/borrows">Borrows</Link>
    </div>
);

export default Home;