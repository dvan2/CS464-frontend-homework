import './App.css';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { House } from './pages/House';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <nav className='navbar'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            <Link to='/house'>House</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/house' element={<House />} />
      </Routes>
    </>
  );
}

export default App;
