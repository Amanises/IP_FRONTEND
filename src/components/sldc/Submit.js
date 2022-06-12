import Axios  from 'axios';
import { relativeTimeRounding } from 'moment';
import React, { Component } from 'react'
import './Submit.css'

// this is a dummy form which we will use to get some sample data.

export default class Submit extends Component {
    constructor(props){
        super(props);

        this.state = {
            ip : '127.0.0.1',
            sldc : 'UP-SLDC',
            stage : '6',
            add_sldc : 'Amit-sldc',
            add_cert : 'Puneet-cert',
            add_csk : 'Navneet-csk',
            del_sldc : 'Amit-sldc',
            del_cert : 'Navneet-cert',
            del_csk : 'Puneet-csk',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ipChange = this.ipChange.bind(this);
        this.stageChange = this.stageChange.bind(this);
        this.sldcChange = this.sldcChange.bind(this);
        this.asldcChange = this.asldcChange.bind(this);
        this.acertChange = this.acertChange.bind(this);
        this.acskChange = this.acskChange.bind(this);
        this.dsldcChange = this.dsldcChange.bind(this);
        this.dcertChange = this.dcertChange.bind(this);
        this.dcskChange = this.dcskChange.bind(this);
    }

    handleChange(event){

    }
    ipChange(event){
        this.setState({ip: event.target.value});
    }
    sldcChange(event){
        this.setState({sldc: event.target.value});
    }
    stageChange(event){
        this.setState({stage: event.target.value});
    }
    asldcChange(event){
        this.setState({add_sldc: event.target.value});
    }
    acertChange(event){
        this.setState({add_cert: event.target.value});
    }
    acskChange(event){
        this.setState({add_csk: event.target.value});
    }
    dsldcChange(event){
        this.setState({del_sldc: event.target.value});
    }
    dcertChange(event){
        this.setState({del_cert: event.target.value});
    }
    dcskChange(event){
        this.setState({del_csk: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const ip_data = {
            ip : this.state.ip,
            sldc : this.state.sldc,
            stage : this.state.stage,
            add_sldc : this.state.add_sldc,
            add_cert : this.state.add_cert,
            add_csk : this.state.add_csk,
            del_sldc : this.state.del_sldc,
            del_cert : this.state.del_cert,
            del_csk : this.state.del_csk,
        }
        console.log(ip_data);
        const res = Axios.post('http://localhost:5002/post/dummy',ip_data);
        console.log(res);
    }

  render() {
    return (
        <>
            <div>Submit</div>
            <div className="form-div">

            <form onSubmit={this.handleSubmit}>
                <div className="form-holder">

                    <label >
                        IP : 
                        <input type="text" value={this.state.ip} onChange={this.ipChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        SLDC : 
                        <input type="text" value={this.state.sldc} onChange={this.sldcChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        Stage : 
                        <input type="text" value={this.state.stage} onChange={this.stageChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        ADD Request SLDC : 
                        <input type="text" value={this.state.add_sldc} onChange={this.asldcChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        Approve request cert : 
                        <input type="text" value={this.state.add_cert} onChange={this.acertChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        Approve request csk : 
                        <input type="text" value={this.state.add_csk} onChange={this.acskChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        Delete request sldc : 
                        <input type="text" value={this.state.del_sldc} onChange={this.dsldcChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        Approve Delete request cert : 
                        <input type="text" value={this.state.del_cert} onChange={this.dcertChange} className='ip-box form-control form-group' />
                    </label>
                    <label >
                        Approve Delete request csk : 
                        <input type="text" value={this.state.del_csk} onChange={this.dcskChange} className='ip-box form-control form-group' />
                    </label>
                    <input type="submit" value="Submit" />
                </div>
            </form>
                    <label htmlFor="cars">Choose a car:</label>
                    <select id="cars" name="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option>
                    </select>
            </div>
        </>
      
    )
  }
}

