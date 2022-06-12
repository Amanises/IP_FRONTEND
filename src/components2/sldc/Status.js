// this will be used to view status of IP's submitted by that respective sldc.
// be careful to fetch the correct SLDC info.

import Axios from '../api/axios';
import React, { Component } from 'react'
import { useOutletContext } from 'react-router-dom';

class Status2 extends Component {
  constructor(props){
    super(props)
    this.state = {

      dbs: null,
      loaded: false,
      selected: [],

      url: '',
      user: '',
      sldc: '',
    }
  }

  fetch_db = () => {
    // const user = this.props.info.user;
    // const sldc = this.props.info.user;
    // this.setState({ sldc: sldc, user: user })
    // console.log('inside fetch')
    // console.log(this.state.user);
  }
  
  // on refresh the data are lost and have to follow the whole process again.
  componentDidMount() {

    // const user = this.props.info.user;
    // const sldc = this.props.info.user;
    const user = JSON.parse(window.sessionStorage.getItem('SLDC_USER_NAME_KEY_LOCAL'));
        
    this.setState({ sldc: user, user: user })
    // this.fetch_db();
    //only fetch all IP's of the corresponding SLDC's
    const to_send = {sldc:user}
    // console.log('inside mount')
    // console.log(to_send);
    Axios.post(`/post/sldc_all`,to_send).then((res) => {
      const data = res.data;
      this.setState({ dbs: data, loaded: true });
    })
  }

  get_status = (num) => {
    if(num === 1)
    {
      return <p>IP add request. Approval Pending at CERT</p>
    }
    else if(num === 2)
    {
      return <p>Approved By CERT. Acknowledgement pending by CSK</p>
    }
    else if(num === 3)
    {
      return <p>IP currently being monitored.</p>
    }
    else if(num === 4)
    {
      return <p>IP delete requested by SLDC</p>
    }
    else if(num === 5)
    {
      return <p>Delete Request approved by CERT. Pending at CSK</p>
    }
    else if(num === 6)
    {
      return <p>IP delete request Acknowledged by CSK. Finished.</p>
    }
    else if(num === 7)
    {
      return <p>IP add request rejected by CERT</p>
    }
    else if(num === 8)
    {
      return <p>IP delete request rejected by CERT</p>
    }
    else {
      return <p>Unknown</p>
    }
  }


  render() {
    return (
      <>
        <div className="container">
          <p>Status of IP's</p>

          <table className='table table-responsive table-bordered container'>
            <thead className='table_head'>
              <tr>
                <th>IP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className='table_body'>
              {
                this.state.loaded &&
                this.state.dbs.map((db) => (
                  <tr key={db._id}>
                    <td>{db.ip}</td>
                    <td>{this.get_status(db.stage)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      </>
    )
  }
}

function Status(props){
  const prop = useOutletContext();
  return <Status2 info={prop} />
}

export default Status;