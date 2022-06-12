// CERT Home landing page.

import React, { Component } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Cert.css'

class Cert2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            cert_user : '',
            location_prop: null,
            logged : false,
        }
        
    }

    
    componentDidMount(){
        // console.log(this.props.location.state);
        // this.setState({cert_user:this.props.location.state?.user})
        // this.setState({location_prop:this.props.location.state})
        
        const user = JSON.parse(window.sessionStorage.getItem('CERT_USER_NAME_KEY_LOCAL'));
        this.setState({cert_user:user})

        
        // console.log(user?.length);
        if(user){
            this.setState({logged:true});
        }
        //if user.length
    }

    logout = () =>{
        const navigation = this.props.navigate;
        window.sessionStorage.removeItem('CERT_USER_NAME_KEY_LOCAL')
        navigation('/',{ replace: true  } );
        // window.location.reload(false);
        alert("logged out successfully");
        console.log('inside logout')
    }

    render() {
        return (
            <> {(this.state.logged &&
                <div className="container-fluid">
                    <div className="headr">
                        <p>  CERT-GO IP PORTAL</p>

                        {/* <p>Welcome User : {this.props.props.info.user} </p>  */}
                        <p>Welcome User : {this.state.cert_user}</p>
                    </div>

                    <div className="d-flex flex-column flex-shrink-0 p-3 navb cert_nav" >
                        <div className="bgcolor">

                        <Link to='req'><button>IP Request's</button></Link>
                        <Link to='log'><button>Log</button></Link>
                        <button className='logout' onClick={this.logout}>Logout</button>
                        </div>
                    </div>

                    <Outlet context={this.state.location_prop}/>
                </div>) || <div> <h1>LOGGED OUT</h1></div>
                        
                        }
            </>
        )
    }
}


function Cert(props) {
    const location = useLocation();
    const navigation = useNavigate();
    return <Cert2 props={props} location={location} navigate={navigation}/>
}

export default Cert;