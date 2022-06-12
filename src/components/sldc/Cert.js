import React, { Component } from 'react'
import Axios from 'axios';

// Here the goal is to make a table and update button.
const url = "http://localhost:5000/get/cert_aprv"
const url_2 = "http://localhost:5000/put/cert_add_apprv"
const url_3 = "http://localhost:5000/put/cert_del_apprv"
const url_4 = "http://localhost:5000/get/cert_del_req"
const url_5 = "http://localhost:5000/get/log"

export default class Cert extends Component {
    constructor(props){
        super(props);
        this.state = {
            dbs : null,
            loaded : false,
            selected : [],
            dbs_2 : null,
            loaded_2 : false,
            selected_2 : [],
            dbs_3 : null,
            loaded_3 : false,
        }
    }

    componentDidMount(){
        Axios.get(url).then((res)=>{
            const data = res.data;
            this.setState({dbs:data,loaded:true});
        });
        Axios.get(url_4).then((res)=>{
            const data = res.data;
            this.setState({dbs_2:data,loaded_2:true});
        })
        Axios.get(url_5).then((res)=>{
            const data = res.data;
            this.setState({dbs_3:data,loaded_3:true});
        })
    }

    approve_row = (id) => {
        this.setState({selected : [...new Set([...this.state.selected,id])] });
    }

    approve_row_2 = (id) => {
        this.setState({selected_2 : [...new Set([...this.state.selected_2,id])] });
    }

    send_add = ()=> {
        console.log(this.state.selected);
        // Here write the code to send a PUT approve req using array of ID's
        // set up a backend code for the same first.
        const to_send = {
            id_array : this.state.selected,
            user : this.props.info.user
        }
        const res = Axios.put(url_2,to_send);
        // console.log(res);
    }

    // send del approve data
    send_del = () => {
        console.log(this.state.selected_2);
        const to_send = {
            id_array : this.state.selected_2,
            user : this.props.info.user
        }
        const res = Axios.put(url_3,to_send);
    }

  render() {
    return (
      <>
        <div>
        <div className="container-fluid p-4 bg-primary text-white text-center">
        <h1>CERT-GO Portal</h1>
        <p className='h5'>WELCOME USER : {this.props.info.user}</p>
        </div>
        <p><br /></p>
        <h3>Approve SLDC Add IP request's</h3>

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
                        this.state.dbs.map((db) =>(
                            <tr key={db._id}>
                                <td>{db.ip}</td>
                                <td>{db.sldc}</td>
                                <td>{db.add_req.add_req_sldc.sldc_user}</td>
                                <td>{db.add_req.add_req_sldc.date}</td>
                                <td>
                                          <button className='btn btn-success' onClick={()=>this.approve_row(db._id)}>Accept</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button className='btn btn-warning' onClick={this.send_add}>Submit</button>
            <p><br /><br /></p>
            <h3>Approve SLDC Delete IP request</h3>
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
                            <tr key={db._id}>
                                <td>{db.ip}</td>
                                <td>{db.sldc}</td>
                                <td>{db.del_req.del_req_sldc.sldc_user}</td>
                                <td>{db.del_req.del_req_sldc.date}</td>
                                <td>
                                          <button className='btn btn-success' onClick={()=>this.approve_row_2(db._id)}>Accept</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
            </table>
            <button className='btn btn-warning' onClick={this.send_del}>Submit</button>
            <p><br /></p>
            <h3>SLDC IP LOG's</h3>
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
                        </tr>
                    </thead>
                    <tbody className='table_body'>
                    {
                        this.state.loaded_3 &&
                        this.state.dbs_3.map((db) =>(
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
