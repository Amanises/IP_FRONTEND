import Axios from '../api/axios';
import React, { Component } from 'react'
import { useOutletContext } from 'react-router-dom';

class Add_ack2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbs: null,
      loaded: false,
      selected: [],
      dbs_2: null,
      loaded_2: false,
      selected_2: [],

      url: '',
      user: '',
    }
    this.colorMap = new Map();
  }

  componentDidMount() {

    // const user = this.props.props.props.info.user;
    // this.setState({url:url})
    const user = JSON.parse(window.sessionStorage.getItem('CSK_USER_NAME_KEY_LOCAL'));
    this.setState({ user: user })
    // console.log(url);
    Axios.get(`/get/csk_apprv`).then((res) => {
      const data = res.data;
      this.setState({ dbs: data, loaded: true });
    })

  }

  approve_row = async (id) => {
    await this.setState({ selected: [...new Set([...this.state.selected, id])] });

    // color the selected row green 
    for (const id of this.state.selected) {
      if (this.colorMap.has(id)) {
        this.colorMap.get(id).style.backgroundColor = "#a2ed5c";
      }
    }
  }

  send_add = () => {
    // console.log(this.state.selected);
    const to_send = {
      id_array: this.state.selected,
      user: this.state.user,
    }
    // send to put url of server.
    const res = Axios.put(`/put/csk_add_apprv`, to_send);
    window.location.reload(false);
  }
  
  refresh = () => {
    window.location.reload(false);
  }

  render() {
    return (
      <>
        <div className="container">
          <p>Acknowledge SLDC Add IP request's</p>

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
                this.state.loaded &&
                this.state.dbs.map((db) => (
                  <tr key={db._id} ref={(input) => { this.colorMap.set(db._id, input) }}>
                    <td>{db.ip}</td>
                    <td>{db.sldc}</td>
                    <td>{db.add_req.add_req_sldc.sldc_user}</td>
                    <td>{db.add_req.add_req_sldc.date}</td>
                    <td>{db.add_req.apprv_req_cert_go.cert_go_user}</td>
                    <td>{db.add_req.apprv_req_cert_go.date}</td>
                    <td>
                      <button className='btn btn-success' onClick={() => this.approve_row(db._id)}>Acknowledge</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <button className='btn btn-warning' onClick={this.send_add}>Submit</button>
          <button className='btn btn-info request_btn' onClick={this.refresh}>Reset Selection</button>

        </div>
      </>
    )
  }
}

function Add_ack(props) {
  const prop = useOutletContext();
  return <Add_ack2 props={prop} />
}

export default Add_ack;