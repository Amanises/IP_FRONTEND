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

            hide_status : false,
            
        }

        this.sideBar = React.createRef();
        this.hideBtn = React.createRef();

        this.hideBar = () => {
            // this.sideBar.current.style.width = "0px";
            
            if(!this.state.hide_status){
                this.sideBar.current.style.visibility = "hidden";
                this.hideBtn.current.style.marginLeft = "0";
                this.setState({hide_status:true});
                document.getElementById('btn_id').innerHTML = "☰ Show Menu"
            }
            else{
                this.sideBar.current.style.visibility = "visible";
                this.hideBtn.current.style.marginLeft = "220px";
                // document.getElementById('float_button').marginLeft = "220px"; //this doesn't work with getElementById
                this.setState({hide_status:false});
                document.getElementById('btn_id').innerHTML = "☰ Hide Menu"
            }

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

                    <div className="d-flex flex-column flex-shrink-0 p-3 navb cert_nav" ref={this.sideBar}>
                        <div className="bgcolor">

                        <Link to='req'><button>IP Request's</button></Link>
                        <Link to='log'><button>Log</button></Link>
                        <button className='logout' onClick={this.logout}>Logout</button>
                        </div>
                    </div>
                    <div className="float-start floatbtn" ref={this.hideBtn} id="float_button"><button id="btn_id" className='btn hide-btn' onClick={this.hideBar} >☰ Hide Menu </button></div><br></br>
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