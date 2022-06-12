import Axios from '../api/axios';
import React, { Component } from 'react'
import { useOutletContext } from 'react-router-dom';

class Del_ack2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbs_2: null,
      loaded_2: false,
      selected_2: [],

      url: '',
      user: '',
    }
    this.colorMap = new Map();
  }

  componentDidMount() {
    // const url = this.props.props.props.url;
    // const user = this.props.props.props.info.user;
    // console.log(url);
    // this.setState({url:url})
    const user = JSON.parse(window.sessionStorage.getItem('CSK_USER_NAME_KEY_LOCAL'));
    this.setState({ user: user })

    Axios.get(`/get/csk_del_req`).then((res) => {
      const data = res.data;
      this.setState({ dbs_2: data, loaded_2: true });
    })
  }

  approve_row_2 = async (id) => {
    await this.setState({ selected_2: [...new Set([...this.state.selected_2, id])] });

    // color the selected row green 
    for (const id of this.state.selected_2) {
      if (this.colorMap.has(id)) {
        this.colorMap.get(id).style.backgroundColor = "#a2ed5c";
      }
    }
  }

  send_del = () => {
    // console.log(this.state.selected_2);
    const to_send = {
      id_array: this.state.selected_2,
      user: this.state.user
    }
    const res = Axios.put(`/put/csk_del_apprv`, to_send);
    window.location.reload(false);
  }

  refresh = () => {
    window.location.reload(false);
  }

  render() {
    return (
      <>
        <div className="container">

          <p>SLDC Delete IP request</p>
          <table className='table table-responsive table-bordered container'>
            <thead className='table_head'>
              <tr>
                <th>IP</th>
                <th>SLDC</th>
                <th>Submitted By SLDC user</th>
                <th>Submitted On</th>
                <th>Approved by CERT-GO user</th>
                <th>Approved On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='table_body'>
              {
                this.state.loaded_2 &&
                this.state.dbs_2.map((db) => (
                  <tr key={db._id} ref={(input) => { this.colorMap.set(db._id, input) }}>
                    <td>{db.ip}</td>
                    <td>{db.sldc}</td>
                    <td>{db.del_req.del_req_sldc.sldc_user}</td>
                    <td>{db.del_req.del_req_sldc.date}</td>
                    <td>{db.del_req.apprv_req_cert_go.cert_go_user}</td>
                    <td>{db.del_req.apprv_req_cert_go.date}</td>
                    <td>
                      <button className='btn btn-success' onClick={() => this.approve_row_2(db._id)}>Acknowledge</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button className='btn btn-warning' onClick={this.send_del}>Submit</button>
          <button className='btn btn-info request_btn' onClick={this.refresh}>Reset Selection</button>
        </div>
      </>
    )
  }
}

function Del_ack(props) {
  const prop = useOutletContext();
  return <Del_ack2 props={prop} />
}

export default Del_ack;