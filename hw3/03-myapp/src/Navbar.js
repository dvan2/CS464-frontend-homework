import { Link, Route, Routes } from 'react-router-dom';
import { Home } from 'Home.js';

export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<Search />} />
      </Routes>
    </>
  );
}
