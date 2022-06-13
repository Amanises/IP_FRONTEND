import React, { Component } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Csk.css'

class Csk2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csk_user : '',
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
        const user = JSON.parse(window.sessionStorage.getItem('CSK_USER_NAME_KEY_LOCAL'));
        this.setState({csk_user:user})

        if(user){
            this.setState({logged:true});
        }
    }

    logout = () =>{
        const navigation = this.props.navigate;
        window.sessionStorage.removeItem('CSK_USER_NAME_KEY_LOCAL')
        navigation('/',{ replace: true  } );
        alert("logged out successfully");
        console.log('inside logout')
    }

    render() {
        return (
            <>{(this.state.logged &&
                <div className="container-fluid">
                    <div className="headr">
                        <p>  CSK IP Acknowledge PORTAL</p>
                        <p>Welcome CSK User : {this.state.csk_user}</p>
                    </div>

                    <div className="d-flex flex-column flex-shrink-0 p-3 navb" ref={this.sideBar}>
                        <Link to='add'><button>Acknowledge Add IP request's</button></Link>
                        <Link to='del'><button>Acknowledge Delete IP request's</button></Link>
                        <button className='logout' onClick={this.logout}>Logout</button>
                    </div>
                    <div className="float-start floatbtn" ref={this.hideBtn} id="float_button"><button id="btn_id" className='btn hide-btn' onClick={this.hideBar} >☰ Hide Menu </button></div><br></br>
                    <Outlet context={this.props}/>
                </div>
                ) || <div> <h1>LOGGED OUT</h1></div>
                        
            }
            </>
        )
    }
}


function Csk(props) {
    const location = useLocation();
    const navigation = useNavigate();
    return <Csk2 props={props} location={location} navigate={navigation}/>
}

export default Csk;