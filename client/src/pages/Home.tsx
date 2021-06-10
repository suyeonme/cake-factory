import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/signin">Signin</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Home;
