// this is Delete component for that SLDC.
// be careful to query correct sldc IP's

import Axios from '../api/axios';
import React, { Component } from 'react'
import { useOutletContext } from 'react-router-dom';

class Delete2 extends Component {
  constructor(props) {
    super(props);
    this.state = {

      dbs: null,
      loaded: false,
      selected: [],

      url: '',
      user: '',
      sldc: '',
    }
    this.colorMap = new Map();
  }

  componentDidMount() {

    // const url = this.props.info.url;
    // const user = this.props.info.user;
    // const sldc = this.props.info.user;
    const user = JSON.parse(window.sessionStorage.getItem('SLDC_USER_NAME_KEY_LOCAL'));
    const sldc = JSON.parse(window.sessionStorage.getItem('SLDC_USER_NAME_KEY_LOCAL'));

    this.setState({ sldc: user, user: user })

    //only fetch active IP's of the corresponding SLDC's
    const to_send = { sldc: sldc }
    Axios.post(`/post/active`, to_send).then((res) => {
      const data = res.data;
      this.setState({ dbs: data, loaded: true });
    })
  }

  approve_row = async (id) => {
    await this.setState({ selected: [...new Set([...this.state.selected, id])] });

    // color the selected row red
    for (const id of this.state.selected) {
      if (this.colorMap.has(id)) {
        this.colorMap.get(id).style.backgroundColor = "#ed755a";
      }
    }
  }

  send_del = () => {
    // console.log(this.state.selected);
    const to_send = {
      id_array: this.state.selected,
      user: this.state.user,
    }
    const res = Axios.put(`/put/sldc_del_req`, to_send);
    // console.log(res);
    window.location.reload(false);
  }
  refresh = () => {
    window.location.reload(false);
  }
  render() {
    return (
      <>
        <div className="container">
          <p>Delete Active IP's</p>

          <table className='table table-responsive table-bordered container'>
            <thead className='table_head'>
              <tr>
                <th>Active IP's</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='table_body'>
              {
                this.state.loaded &&
                this.state.dbs.map((db) => (
                  <tr key={db._id} ref={(input) => { this.colorMap.set(db._id, input) }}>
                    <td>{db.ip}</td>
                    <td>
                      <button className='btn btn-danger' onClick={() => this.approve_row(db._id)}>Delete</button>
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



function Delete(props) {
  const prop = useOutletContext();
  return <Delete2 info={prop} />
}

export default Delete;