
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React /* { useState } */ from 'react';

// import Sidebar from './components/Sidebar';
// import Active from './components/Active';
// import Update from './components/sldc/Update';
// import Log from './components/Log';
// import Home from './components/Home';
// import SLDC_home from './components/sldc/SLDC_home';
// import Cert from './components/sldc/Cert'
// import Csk from './components/sldc/Csk';
// import Update2 from './components/Update';
// import Error from './components/Error'

//components2 
import Landing from './components2/landing/Landing';
//components2 //SLDC
import Sldc from './components2/sldc/Sldc';
import Add from './components2/sldc/Add';
import Delete from './components2/sldc/Delete';
import Status from './components2/sldc/Status';
//components2 //CERT
import Cert from './components2/cert/Cert';
import Log from './components2/cert/Log';
import Request from './components2/cert/Request';
// components2 // CSK
import Csk from './components2/csk/Csk';
import Add_ack from './components2/csk/Add_ack';
import Del_ack from './components2/csk/Del_ack';

function App() {

  // from here pass the username,sldc name as prop, to various other components
  const prop = { user: 'PUNEET_SLDC', sldc: 'Bihar-SLDC' };
  const prop2 = { user: 'AMIT_CERT' }
  const prop3 = { user: 'NAVNEET_CSK' }
  const url = 'http://localhost:5000'
  // const url = 'https://cert-app-react.herokuapp.com'

  return (
    <>
      <Router>

        <div className='App'>

          {/* <Sidebar /> */}
          {/* <p>THIS IS HOME</p> */}
          <Routes>
            {/* <Route path="/home" element={<Home />} />        
            <Route path="/active" element={<Active />} />
            <Route path="/update" element={<Update2 />}/>
            <Route path="/log" element={<Log />} />
            <Route path="/sldc" element={<SLDC_home user={'Puneet_SLDC'} sldc={'UP-SLDC'} />} />
            <Route path="/sldc/update" element={<Update info={prop} />} />
            <Route path="/sldc/cert" element={<Cert info={prop2} />} />
            <Route path="/sldc/csk" element={<Csk info={prop3} />} />
            <Route path='/*' element={<Error/>}/> */}

            <Route path='/' element={<Landing url={url}/>} />
            <Route path='/sldc' element={<Sldc url={url} info={prop} />}>
              <Route path='add' element={<Add />} />
              <Route path='del' element={<Delete />} />
              <Route path='status' element={<Status />} />
            </Route>
            <Route path='/cert' element={<Cert url={url} info={prop2} />}>
              <Route path='req' element={<Request />} />
              <Route path='log' element={<Log />} />
            </Route>
            <Route path='/csk' element={<Csk url={url} info={prop3} />} >
              <Route path='add' element={<Add_ack />} />
              <Route path='del' element={<Del_ack />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}


export default App;
