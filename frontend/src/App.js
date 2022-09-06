import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
