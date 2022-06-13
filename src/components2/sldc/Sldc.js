// this is sldc home page 
// all the componenets will be children of this componenet and will 
// rendered using outlet.

// 1. From Login we will be navigated to this Page, with user info and all.
// 2. Now we have to pass this user info to child component using outlet.
// 3. Outlet uses hook so we have to use a wrapper for class.
import React, { Component } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Sldc.css'

class Sldc2 extends Component {
    // we want url and user info inside the props. 1. by app.js [2]. by navigate through landing page.
    constructor(props){
        super(props);
        this.state = {
            sldc_user : '',
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

        const user = JSON.parse(window.sessionStorage.getItem('SLDC_USER_NAME_KEY_LOCAL'));
        this.setState({sldc_user:user})

        if(user){
            this.setState({logged:true});
        }

    }
    logout = () =>{
        const navigation = this.props.navigate;
        window.sessionStorage.removeItem('SLDC_USER_NAME_KEY_LOCAL')
        // window.location.reload(false);
        navigation('/',{ replace: true  } );
        alert("logged out successfully");
        console.log('inside logout')
    }

    render() {
        return (
            <>{(this.state.logged &&
            <div className="container-fluid">

                <div className='headr'>
                    <p>  SLDC IP PORTAL</p>
                    
                    <p>Welcome User : {this.state.sldc_user} </p>
                    {/* <p>SLDC : {this.props.info.sldc}</p> */}
                </div>
                
                <div className="d-flex flex-column flex-shrink-0 p-3 navb" ref={this.sideBar}>
                    <Link to='add'><button>Add IP</button></Link>
                    <Link to='del'><button>Delete IP</button></Link>
                    <Link to='status'><button>Status</button></Link>
                    <button className='logout' onClick={this.logout}>Logout</button>
                </div>
                <div className="float-start floatbtn" ref={this.hideBtn} id="float_button"><button id="btn_id" className='btn hide-btn' onClick={this.hideBar} >☰ Hide Menu </button></div><br></br>
                <Outlet context={this.state.location_prop}/>
            </div>
            ) || <div> <h1>LOGGED OUT</h1></div>
                        
        }
            </>
        )
    }
}

function Sldc(props){
    const location = useLocation();
    const navigation = useNavigate();
    return <Sldc2 props={props} location={location}  navigate={navigation}/>
}

export default Sldc;