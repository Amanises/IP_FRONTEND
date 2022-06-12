// this page is left for last.
// for now pass the required data using props.

import React, { Component } from 'react'
import { Link, Outlet ,useNavigate, Navigate} from 'react-router-dom';
import Axios from '../api/axios';
import './Landing.css'



class Landing2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      alert: false,
      dbs: null,
      loaded: false,
      selected: [],
      user_name: '',
      password: '',
      ret: null,

      url: '',
      user: '',
      sldc: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
  }

  userChange(event) {
    this.setState({ user_name: event.target.value });
  }

  passChange(event) {
    this.setState({ password: event.target.value });
  }

  async getdata(data){
    const res = await Axios.post(`/post/auth`, data);
    const dataa = res?.data;  // there will always be reponse if db is connected.
    this.setState({dbs:dataa,loaded:true});
    return dataa;
  }

  async handleSubmit(event) {
    event.preventDefault();
    // window.localStorage.setItem('SLDC_USER_NAME_KEY_LOCAL', null);
    // window.localStorage.setItem('CSK_USER_NAME_KEY_LOCAL', null);
    // window.localStorage.setItem('CERT_USER_NAME_KEY_LOCAL', null);

    const data = {
      user: this.state.user_name,
      pass: this.state.password,
    }
    const abc = await this.getdata(data);

    //console LOGS ==================================================================
    // console.log(this.state.user_name)
    // console.log(this.state.password)
    // console.log(abc);

    //abc contains only "role" element of the users details. 
    if(abc?.auth==="true")
    {
      console.log("success, now navigate")
      // console.log(abc?.role)
      const navigation = this.props.navigate;
      if(abc?.role==="sldc"){
        navigation('/sldc',{ replace: true , state: { user: this.state.user_name } } );
        window.sessionStorage.setItem('SLDC_USER_NAME_KEY_LOCAL', JSON.stringify(this.state.user_name));
      }
      else if(abc?.role==="csk"){
        navigation('/csk',{ replace: true , state: { user: this.state.user_name } } );
        window.sessionStorage.setItem('CSK_USER_NAME_KEY_LOCAL', JSON.stringify(this.state.user_name));
      }
      else {
      navigation('/cert',{ replace: true , state: { user: this.state.user_name } } );
      window.sessionStorage.setItem('CERT_USER_NAME_KEY_LOCAL', JSON.stringify(this.state.user_name));
      }
    }
    else{
      alert('Invalid username or password')
    }
    
  }



  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className='landing_form'>
          <h3>IP Update Login Page</h3>

          <label className='landing_label' htmlFor="username">Username</label>
          <input className='form-control form-control-lg' type="text" placeholder="Username" id="username" value={this.state.user_name} onChange={this.userChange} />

          <label className='landing_label' htmlFor="password">Password</label>
          <input className='form-control form-control-lg' type="password" placeholder="Password" id="password" value={this.state.password} onChange={this.passChange} />
          <input type="submit" value="Log In" className='landing_button' />
        </form>

        {/* <div className="container-fluid">
          <p>Links <br /></p>
          <div className="navbar flex-column">

            <Link to='/sldc'>TO SLDC</Link>
            <Link to='/cert'>TO CERT</Link>
            <Link to='/csk'>TO CSK</Link>
          </div>
        </div> */}
      </>
    )
  }
}


function Landing(props) {
  const navigation = useNavigate();
  return <Landing2 navigate={navigation}/>
}

export default Landing;