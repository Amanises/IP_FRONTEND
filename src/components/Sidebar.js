import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function Sidebar(props) {
    const divStyle = {
        width : '280px',
        height : '300px'
    };

    const [home, setHome] = useState('active')
    const [act, setAct] = useState('')
    const [update, setUpdate] = useState('')
    const [log, setLog] = useState('')

    const all_disable = () => {
        setHome('');
        setAct('');
        setLog('');
        setUpdate('');
    }

    const h_set = () => {
        all_disable();
    }

    const act_set = () => {
        all_disable();
        setAct('active');
    }
    const upd_set = () => {
        all_disable();
        setUpdate('active');
    }
    const log_set = () => {
        all_disable();
        setLog('active');
    }
  return (
    <>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={divStyle}>
        <Link to='/home'  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" onClick={h_set}>
      <svg className="bi pe-none me-2" width="40" height="32"></svg>
      <span className="fs-4">SLDC Portal</span>
        </Link>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto" >

        <Link to="/active" className={`nav-link text-white  ${act}`} onClick={act_set}>
            <li className="nav-item" >
                <svg className="bi pe-none me-2" width="16" height="16"></svg>
                Active IP's
            </li>
        </Link>
        <Link className={`nav-link text-white  ${update}`} onClick={upd_set} to="/update">
            <li>
                <svg className="bi pe-none me-2" width="16" height="16"></svg>
                Update IP's
            </li>
        </Link>
        <Link className={`nav-link text-white  ${log}`} onClick={log_set} to="/log">
            <li>
                <svg className="bi pe-none me-2" width="16" height="16"></svg>
                Log
            </li>
        </Link>

    </ul>
    <hr/>
    
  </div>
    </>
  )
}

export default Sidebar