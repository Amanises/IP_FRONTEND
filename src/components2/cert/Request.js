import Axios from '../api/axios';
import React, { Component } from 'react'
import { useOutletContext } from 'react-router-dom';
import './Request.css'

class Request2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbs: null,
      loaded: false,
      selected: [],
      rejected: [],

      dbs_2: null,
      loaded_2: false,
      selected_2: [],
      rejected_2: [],

      dbs_3: null,
      loaded_3: false,

      url: '',
      user: '',
    }
    this.arryColor = [];
    this.colorMap = new Map();

    this.setColor = element => {
      this.arryColor = [...this.arryColor,element];
    }
    this.changeGreen = () => {
      for(const id of this.arryColor){
        id.style.backgroundColor = "green";
      }
    }
  }

  componentDidMount() {
    // console.log(this.props.info.props);
    // if(this.props?.info?.user){
    //   this.setState({  user: this.props?.info?.user });
    //  }
    const cert_user = JSON.parse(window.sessionStorage.getItem('CERT_USER_NAME_KEY_LOCAL'));
        this.setState({user:cert_user})

    Axios.get(`/get/cert_aprv`).then((res) => {
      const data = res.data;
      this.setState({ dbs: data, loaded: true });
    });
    Axios.get(`/get/cert_del_req`).then((res) => {
      const data = res.data;
      this.setState({ dbs_2: data, loaded_2: true });
    })
  }

  
  // for accept buttons
  approve_row = async (id) => {
    await this.setState({ selected: [...new Set([...this.state.selected, id])] });
    //if this id is in reject row array then remove it from reject row.
    const index = this.state.rejected.indexOf(id);
    if(index>-1){
      this.state.rejected.splice(index,1);
    }
    // console.log(this.state.selected);
    // console.log(this.state.rejected);
    
    // here change the all the selected ID's color to green by finding them in colorMap.
    // map.has(key) to check and map.get(key) to get the dom element.
    for(const id of this.state.selected){
      if(this.colorMap.has(id))
      {
        this.colorMap.get(id).style.backgroundColor = "#a2ed5c";
      }
    } 

  }

  reject_row = async (id) => {
    await this.setState({ rejected: [...new Set([...this.state.rejected, id])] });
    // if this id is in selected row array then remove it from selected array
    const index = this.state.selected.indexOf(id);
    if(index>-1){
      this.state.selected.splice(index,1);
    }
    // console.log(this.state.selected);
    // console.log(this.state.rejected);

    //change color of this row
    for(const id of this.state.rejected){
      if(this.colorMap.has(id))
      {
        this.colorMap.get(id).style.backgroundColor = "#ed755a";
      }
    } 
    
  }

  // for reject buttons
  approve_row_2 = async (id) => {
    await this.setState({ selected_2: [...new Set([...this.state.selected_2, id])] });

    //remove if present in reject row 2
    const index = this.state.rejected_2.indexOf(id);
    if(index>-1){
      this.state.rejected_2.splice(index,1);
    }

    // color it green
    for(const id of this.state.selected_2){
      if(this.colorMap.has(id))
      {
        this.colorMap.get(id).style.backgroundColor = "#a2ed5c";
      }
    } 

    // console LOGS =============================
    // console.log(this.state.selected_2);
    // console.log(this.state.rejected_2);
  }

  reject_row_2 = async (id) => {
    await this.setState({ rejected_2: [...new Set([...this.state.rejected_2, id])] });

    // remove if present in select row 2.
    const index = this.state.selected_2.indexOf(id);
    if(index>-1){
      this.state.selected_2.splice(index,1);
    }

    // color it red
    for(const id of this.state.rejected_2){
      if(this.colorMap.has(id))
      {
        this.colorMap.get(id).style.backgroundColor = "#ed755a";
      }
    } 

    // console LOGS =============================
    // console.log(this.state.selected_2);
    // console.log(this.state.rejected_2);
  }

  send_add = () => {
    // console.log(this.state.selected);
    // Here write the code to send a PUT approve req using array of ID's
    // set up a backend code for the same first.
    const to_send = {
      id_array: this.state.selected,
      user: this.state.user,
      rej_array: this.state.rejected,
    }
    const res = Axios.put(`/put/cert_add_apprv`, to_send);
    // console.log(res);
    window.location.reload(false);
  }

  send_del = () => {
    // console.log(this.state.selected_2);
    const to_send = {
        id_array : this.state.selected_2,
        user : this.state.user,
        rej_array:this.state.rejected_2,
    }
    const res = Axios.put(`/put/cert_del_apprv`,to_send);
    window.location.reload(false);
}

  refresh = () => {
    window.location.reload(false);
  }

  render() {
    return (
      <>
        <div className="container">
          <p>SLDC's Add IP Request's</p>

          <table className='table table-responsive table-bordered container'>
            <thead className='table_head'>
              <tr>
                <th>IP</th>
                <th>SLDC</th>
                <th>Submitted By</th>
                <th>Submitted On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='table_body'>
              {
                this.state.loaded &&
                this.state.dbs.map((db) => (
                  <tr key={db._id}  ref={(input)=>{this.colorMap.set(db._id,input)}}>
                    <td>{db.ip}</td>
                    <td>{db.sldc}</td>
                    <td>{db.add_req.add_req_sldc.sldc_user}</td>
                    <td>{db.add_req.add_req_sldc.date}</td>
                    <td>
                      <button className='btn btn-success' onClick={() => this.approve_row(db._id)}>Accept</button>
                      <button className='btn btn-danger' onClick={() => this.reject_row(db._id)}>Reject</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button className='btn btn-warning' onClick={this.send_add}>Submit</button>
          <button className='btn btn-info request_btn' onClick={this.refresh}>Reset Selection</button>


          <p>SLDC's Delete IP Request's</p>

          <table className='table table-responsive table-bordered container'>
                    <thead className='table_head'>
                        <tr>
                            <th>IP</th>
                            <th>SLDC</th>
                            <th>Submitted By</th>
                            <th>Submitted On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table_body'>
                    {
                        this.state.loaded_2 &&
                        this.state.dbs_2.map((db) =>(
                            <tr key={db._id} ref={(input)=>{this.colorMap.set(db._id,input)}}>
                                <td>{db.ip}</td>
                                <td>{db.sldc}</td>
                                <td>{db.del_req.del_req_sldc.sldc_user}</td>
                                <td>{db.del_req.del_req_sldc.date}</td>
                                <td>
                                          <button className='btn btn-success' onClick={()=>this.approve_row_2(db._id)}>Accept</button>
                                          <button className='btn btn-danger' onClick={()=>this.reject_row_2(db._id)}>Reject</button>
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

function Request(props) {
  const prop = useOutletContext();
  return <Request2 info={prop} />
}

export default Request;