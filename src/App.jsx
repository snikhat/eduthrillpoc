import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Panel } from './app/components/Panel';
import { Candidate } from './app/components/Candidate';
import { Job } from './app/components/Job';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={() => <div><p>Root</p></div>}/>
          <Route path="/panel" element={<Panel />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/job" element={<Job />} />
        </Routes>
    </div>
  );
}

export default App;
