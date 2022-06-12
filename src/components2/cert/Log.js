import Axios from '../api/axios';
import React, { Component } from 'react'
import { useOutletContext } from 'react-router-dom';

class Log2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dbs_3: null,
      loaded_3: false,

      url: '',
      user: '',
    }
  }

  componentDidMount() {
    // this.setState({ user: this.props.info.user });
    const cert_user = JSON.parse(window.sessionStorage.getItem('CERT_USER_NAME_KEY_LOCAL'));
        this.setState({user:cert_user})
        
    Axios.get(`/get/log`).then((res) => {
      const data = res.data;
      this.setState({ dbs_3: data, loaded_3: true });
    })
  }

  get = (num) => {
    if(num === 6)
    {
      return <p>Completed</p>
    }
    else
    {
      return <p>In Process</p>
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <p>SLDC's IP Request's LOG</p>
          <table className='table table-responsive table-bordered container'>
            <thead className='table_head'>
              <tr>
                <th>IP</th>
                <th>SLDC</th>
                <th>Submitted to Add by SLDC user</th>
                <th>Submitted On</th>
                <th>Approved by CERT-GO user</th>
                <th>Approved on </th>
                <th>Approved by CSK user </th>
                <th>Approved on </th>
                <th>Delete Request by SLDC user</th>
                <th>Submitted on </th>
                <th>Approved by Cert-Go user</th>
                <th>Approved on</th>
                <th>Approved by CSK user</th>
                <th>Approved on</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className='table_body'>
              {
                this.state.loaded_3 &&
                this.state.dbs_3.map((db) => (
                  <tr key={db._id}>
                    <td>{db.ip}</td>
                    <td>{db.sldc}</td>
                    <td>{db.add_req.add_req_sldc.sldc_user}</td>
                    <td>{db.add_req.add_req_sldc.date}</td>
                    <td>{db.add_req.apprv_req_cert_go.cert_go_user}</td>
                    <td>{db.add_req.apprv_req_cert_go.date}</td>
                    <td>{db.add_req.apprv_req_csk.csk_user}</td>
                    <td>{db.add_req.apprv_req_csk.date}</td>
                    <td>{db.del_req.del_req_sldc.sldc_user}</td>
                    <td>{db.del_req.del_req_sldc.date}</td>
                    <td>{db.del_req.apprv_req_cert_go.cert_go_user}</td>
                    <td>{db.del_req.apprv_req_cert_go.date}</td>
                    <td>{db.del_req.apprv_req_csk.csk_user}</td>
                    <td>{db.del_req.apprv_req_csk.date}</td>
                    <td>{this.get(db.stage) }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      </>
    )
  }
}

function Log(props) {
  const prop = useOutletContext();
  return <Log2 info={prop} />
}

export default Log;