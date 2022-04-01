import React, {useEffect, useState} from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import SheetsContainer from './containers/SheetsContainer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App()  { 

  return (
    <RecoilRoot>      
      <SheetsContainer />
    </RecoilRoot>      
  );
}

export default App;
