import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <h1>Orel</h1>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
