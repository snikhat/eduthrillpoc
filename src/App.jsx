import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Panel } from './app/components/Panel';
import { Candidate } from './app/components/Candidate';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<App/>}/>
          <Route path="/panel" element={<Panel />} />
          <Route path="/candidate" element={<Candidate />} />
        </Routes>
    </div>
  );
}

export default App;
