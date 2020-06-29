import React, { useState } from 'react';
import Appbar from './components/appbar'
import Drawer from './components/drawer'

import './components/components.scss';

function App() {
  const [drawerOpen, setDrawer] = useState(false)
  return (
    <>
      <div className="App">
        <Appbar drawerOpen={drawerOpen} setDrawer={setDrawer} />
        <Drawer drawerOpen={drawerOpen} setDrawer={setDrawer} />
      </div>
    </>
  );
}

export default App;
