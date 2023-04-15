import './App.css';
import { Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import NoRoutesFound from './components/NoRoutesFound';
import NavbarTop from './components/NavbarTop';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';

function App() {
  return (
    <div className="App">
      {/* <Routes1/> */}
      <NavbarTop/>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<NoRoutesFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
