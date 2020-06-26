import React, { useState } from 'react';
import Navbar from './components/static/navbar'
import Drawer from './components/static/drawer'

import './components/components.scss';
import './components/static/static.scss';

function App() {
  const [optionsOpen, setOptions] = useState(false)
  return (
    <>
      <div className="App">
        <Navbar optionsOpen={optionsOpen} setOptions={setOptions} />
      </div>
      <Drawer optionsOpen={optionsOpen} setOptions={setOptions} />
    </>
  );
}

export default App;
