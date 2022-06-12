import React ,{useState} from 'react'
import axios from 'axios'

const url = "http://localhost:5000/"



class Active extends React.Component {

    constructor (props) {
        super(props);

        this.state={
            jk : null,
        }
    }


    
    componentDidMount(){    //runs after the component gets rendered.
        axios.get(`${url}db`).then((response)=>{
            
            // console.table(response.data);
            const ipd = response.data;
            this.setState({jk : ipd }); //JSON.stringify(ipd)

            console.log(typeof(response.data));
            // console.log(response);
            console.log(this.state.jk);
            console.log(typeof(this.state.jk));
      });
    }

    renderIP() {
        console.log("hello")
        console.log(this.state.jk)
    }
    fun = () => {
        console.log(this.state.jk)
    }

    
        render() {
            if(this.state.jk === null) { // render loading state.
            return ( 
                <>
                  <div>Active Components</div>
                  <div>
                      {/* <p>{JSON.stringify(this.state.jk)}</p> */}
                      {/* <p onClick={this.trial}>ho ho</p> */}
                      {/* <p>{this.state.jk}</p> */}
                      <p id="disp">HERE</p>
                      <button onClick={this.renderIP}>Click to change</button>
                      <button onClick={this.fun}>FUN</button>
                  </div>
                </>
            )
        }
        else {
            return (
                <>
                    <p>{JSON.stringify(this.state.jk[0])}</p>
                    <table className="table table-responsive">
                      <thead className="table_head">
                          <tr>
    
                              <th>SLDC</th>
                              <th>IP</th>
                              <th>Submited By</th>
                              <th>Active Now</th>
                              <th>Active From</th>
                              <th>Active Till</th>
                          </tr>
                      </thead>
                      <tbody className="table_body">
                          {
                              this.state.jk.map(({_id,sldc,ip,submitBy,activeNow,activeFrom,activeTill}) =>(
                                  <tr key={_id}>
                                      <td>{sldc}</td>
                                      <td>{ip}</td>
                                      <td>{submitBy}</td>
                                      <td>{activeNow}</td>
                                      <td>{activeFrom}</td>
                                      <td>{activeTill}</td>
                                    
                                  </tr>

                              ))
                          }
                      </tbody>
                  </table>
                </>
            )
        }
        }
}


export default Active