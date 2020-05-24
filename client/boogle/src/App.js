import React from 'react';

import './App.css';
import MainLayout from './Components/Layout/Layout'; 
import BoogleContainer from './Containers/BoogleContainer/BoogleContainer';

function App() {
  return (
    <div className="App">      
      <MainLayout>
        <BoogleContainer />
      </MainLayout>
    </div>
  );
}

export default App;
