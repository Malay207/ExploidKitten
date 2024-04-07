import {React} from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import store from './state/store';
import Game from './components/Game';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {

  
  return (
    <Provider store={store}>
      <Router>
      <div className='app'>
        
        <Routes>
          <Route exact  path="/" element={<Game />} />
          <Route exact  path="/signup" element={<Signup/>} />
          <Route exact  path="/login" element={<Login/>} />
        </Routes>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
