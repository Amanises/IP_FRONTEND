// this component takes user IP and send it to server endpoints

import Axios from '../api/axios';
import React, { Component } from 'react'
import { useOutletContext } from 'react-router-dom';
import './Add.css'

class Addc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      alert: false,
      dbs: null,
      loaded: false,
      selected: [],

      url:'',
      user:'',
      sldc:'',
    }
    this.ipChange = this.ipChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    // the required 3 data for this component to function.
    const user = JSON.parse(window.sessionStorage.getItem('SLDC_USER_NAME_KEY_LOCAL'));
       
    this.setState({ sldc:user, user:user})
    // console.log('inside sldc add')
    // console.log(this.props.info.user)
  }

  ipChange(event) {
    this.setState({ ip: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const ip_data = {
        ip : this.state.ip,
        sldc : this.state.sldc,
        user : this.state.user,
    }
    const res = Axios.post(`/post/new`,ip_data);
    console.log(res);

    // console.log(this.props.info)
    this.setState({ip:''})
}

  render() {
    return (
      <>
        <div className="container">

          <p>Add IP</p>

          <form onSubmit={this.handleSubmit}>

            <div className="form">

              <label >
                <input type="text" value={this.state.ip} onChange={this.ipChange} className='ip-box form-control form-group' />
              </label>
              
              <div className="btn-add">
              <input type="submit" value="Add" />
              </div>

            </div>
          </form>

        </div>
      </>
    )
  }
}

function Add(props) {
  const prop = useOutletContext();
  return <Addc info={prop} />
}

export default Add;