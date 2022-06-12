import React, { Component } from 'react'
import Axios from 'axios';

const url_1 = "http://localhost:5000/get/active"
const url_2 = "http://localhost:5000/put/sldc_del_req"

// Here I have to do 2 things. Add Area , and Delete area.
// For delete fetch those rows with : sldc,stage=3.
// For update post data and stage = 1.
// Step 1 : make add component.

export default class Update extends Component {
    constructor(props){
        super(props);
        this.state = {
            ip : '',
            alert : false,
            dbs : null,
            loaded : false,
            selected : [],
        }
        this.ipChange = this.ipChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    ipChange(event){
        this.setState({ip: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const ip_data = {
            ip : this.state.ip,
            sldc : this.props.info.sldc,
            user : this.props.info.user,
        }
        const res = Axios.post('http://localhost:5000/post/new',ip_data);
        console.log(res);
        this.setState({ip:''})
    }

    componentDidMount(){
        Axios.get(url_1).then((res)=>{
            const data = res.data;
            this.setState({dbs:data,loaded:true});
        })
    }

    approve_row = (id) => {
        this.setState({selected : [...new Set([...this.state.selected,id])] });
    }

    send_del = ()=> {
        console.log(this.state.selected);
        const to_send = {
            id_array : this.state.selected,
            user : this.props.info.user
        }
        const res = Axios.put(url_2,to_send);
        // console.log(res);
    }

  render() {
    return (
      <>
        <div>
        <div className="container-fluid p-4 bg-primary text-white text-center">
        <h1>SLDC Portal</h1>
        <p className='h5'>WELCOME USER : {this.props.info.user}</p>
        </div>
        <br />
            <h4>Add an IP</h4>
        <form onSubmit={this.handleSubmit}>

            <div className="form">
            <label >
                        
                        <input type="text" value={this.state.ip} onChange={this.ipChange} className='ip-box form-control form-group' />
            </label>
            <input type="submit" value="Add" />
            </div>
        </form>
        <br />
        
        <h4>Delete an IP</h4>
        <br />
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
                        this.state.dbs.map((db) =>(
                            <tr key={db._id}>
                                <td>{db.ip}</td>
                                <td>
                                          <button className='btn btn-danger' onClick={()=>this.approve_row(db._id)}>Delete</button>
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
