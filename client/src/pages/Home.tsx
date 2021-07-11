import { Link } from 'react-router-dom';

interface HomeProps {
  isAuth: boolean;
}

const Home = ({ isAuth }: HomeProps) => {
  return (
    <div>
      <h1>Home</h1>
      {!isAuth && (
        <>
          <Link to="/signin">Signin</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
};

export default Home;
