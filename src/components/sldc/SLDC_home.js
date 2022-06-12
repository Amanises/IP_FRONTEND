import React  from 'react'; //use rcc snippet.
import './SLDC_home.css'
import Submit from './Submit'
import Update  from './Update';
import Cert from './Cert';
import {Link} from 'react-router-dom'

// this is the sldc home page.
// it will have 3 branch components.
// show active,show pending,update ip(del:active or add:new),

class SLDC_home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(

        <>
            {/* <div>
                SLDC HOME
                <br/>
                <p>welcome user : {this.props.user}</p>
                <br />
                <Submit />
            </div> */}

            <Link to="/sldc/update">To Update</Link>
            <Link to="/sldc/cert">CERT approve</Link>
        </>
        
        )
    }
}



export default SLDC_home ;