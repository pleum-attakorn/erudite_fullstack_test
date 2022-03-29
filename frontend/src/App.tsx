import React, {useEffect, useState} from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import SheetsContainer from './containers/SheetsContainer'

const App = () => {
  const [message, setMessage] = useState('test message');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/weather/')
      .then(res => res.json())
      .then(obj => {
        setMessage(obj.message);
      });
  },[]);

  return (
    <RecoilRoot>
      <SheetsContainer />
      <div>{message}</div>
    </RecoilRoot>      
  );
}

export default App;
