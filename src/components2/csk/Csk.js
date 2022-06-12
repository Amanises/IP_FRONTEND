import React, { Component } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Csk.css'

class Csk2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csk_user : '',
            logged : false,
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

                    <div className="d-flex flex-column flex-shrink-0 p-3 navb" >
                        <Link to='add'><button>Acknowledge Add IP request's</button></Link>
                        <Link to='del'><button>Acknowledge Delete IP request's</button></Link>
                        <button className='logout' onClick={this.logout}>Logout</button>
                    </div>
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