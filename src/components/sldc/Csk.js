import React, { Component } from 'react'
import Axios from 'axios';

// fetch add approve request. i.e. those at stage = 2.
const url_1 = "http://localhost:5000/get/csk_apprv"
const url_2 = "http://localhost:5000/put/csk_add_apprv"
const url_3 = "http://localhost:5000/get/csk_del_req"
const url_4 = "http://localhost:5000/put/csk_del_apprv"

export default class Csk extends Component {
    constructor(props){
        super(props);
        this.state = {
            dbs : null,
            loaded : false,
            selected : [],
            dbs_2 : null,
            loaded_2 : false,
            selected_2 : [],
        }
    }

    componentDidMount(){
        Axios.get(url_1).then((res)=>{
            const data = res.data;
            this.setState({dbs:data,loaded:true});
        })
        Axios.get(url_3).then((res)=>{
            const data = res.data;
            this.setState({dbs_2:data,loaded_2:true});
        })
    }

    approve_row = (id) => {
        this.setState({selected : [...new Set([...this.state.selected,id])] });
    }
    approve_row_2 = (id) => {
        this.setState({selected_2 : [...new Set([...this.state.selected_2,id])] });
    }

    send_add = () => {
        console.log(this.state.selected);
        const to_send = {
            id_array : this.state.selected,
            user : this.props.info.user
        }
        // send to put url of server.
        const res = Axios.put(url_2,to_send);
    }

    // send del approve data
    send_del = () => {
        console.log(this.state.selected_2);
        const to_send = {
            id_array : this.state.selected_2,
            user : this.props.info.user
        }
        const res = Axios.put(url_4,to_send);
    }
    
  render() {
    return (
    <>
      <div>
      <div className="container-fluid p-4 bg-primary text-white text-center">
        <h1>CSK Portal</h1>
        <p className='h5'>WELCOME USER : {this.props.info.user}</p>
        </div>
        <p><br /></p>
        <h3>Approve SLDC's - Add IP request's</h3>

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
                    this.state.dbs.map((db) =>(
                        <tr key={db._id}>
                            <td>{db.ip}</td>
                            <td>{db.sldc}</td>
                            <td>{db.add_req.add_req_sldc.sldc_user}</td>
                            <td>{db.add_req.add_req_sldc.date}</td>
                            <td>{db.add_req.apprv_req_cert_go.cert_go_user}</td>
                            <td>{db.add_req.apprv_req_cert_go.date}</td>
                            <td>
                                      <button className='btn btn-success' onClick={()=>this.approve_row(db._id)}>Acknowledge</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button className='btn btn-warning' onClick={this.send_add}>Submit</button>
            <p><br /><br /></p>
            <h3>Approve SLDC's - Delete IP's request</h3>

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
                    this.state.dbs_2.map((db) =>(
                        <tr key={db._id}>
                            <td>{db.ip}</td>
                            <td>{db.sldc}</td>
                            <td>{db.del_req.del_req_sldc.sldc_user}</td>
                            <td>{db.del_req.del_req_sldc.date}</td>
                            <td>{db.del_req.apprv_req_cert_go.cert_go_user}</td>
                            <td>{db.del_req.apprv_req_cert_go.date}</td>
                            <td>
                                      <button className='btn btn-success' onClick={()=>this.approve_row_2(db._id)}>Acknowledge</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button className='btn btn-warning' onClick={this.send_del}>Submit</button>
      </div>
    </>
    )
  }
}
