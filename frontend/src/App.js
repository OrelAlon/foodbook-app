import React from "react";
import "./App.css";
import RouterConfig from "./routes/RouterConfig";
import TestApi from "./api/TestApi";

function App() {
  return (
    <>
      <div className='App'>
        <RouterConfig />
        <TestApi />
      </div>
    </>
  );
}

export default App;
