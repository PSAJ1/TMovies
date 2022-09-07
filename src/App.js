/* eslint-disable react/jsx-no-comment-textnodes */
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import MovieList from './Component/MovieList';
import Favourite from './Component/Favourate';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<><Banner/><MovieList/></>}/>
          <Route path='/favourate' element={<Favourite/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
