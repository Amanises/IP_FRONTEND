import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

const url = "http://localhost:5000/"


class Log extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jk: null,
        }
        // this.callDb();
        //     axios.get(`${url}db`).then((response)=>{

        //         console.table(response.data);
        //         const ipd = response.data.ip;
        //         this.setState({jk : ipd})
        //         // console.log(typeof(response.data.ip));
        //   });
    };

    //  callDb() {
    //     axios.get(`${url}db`).then((response)=>{

    //         console.table(response.data);
    //         const ipd = response.data.ip;
    //         this.setState({jk : ipd})
    //         // console.log(typeof(response.data.ip));
    //   });
    // }
    componentDidMount() {
        axios.get(`${url}db`).then((response) => {

            console.table(response.data);
            const ipd = response.data.ip;
            this.setState({ jk: ipd })
            // console.log(typeof(response.data.ip));
        });
    }

    render() {
        return (
            <>
                <div>Log</div>
                <div>
                    <p>{this.state.jk}</p>
                    <p>hhis</p>
                </div>
            </>
        )
    }
};



// function Log() {
//     const [res,setRes] = useState(null);
//     const [db,setDb] = useState(null);

//     useEffect(() => {
//       axios.get(url).then((response) => {
//           setRes(response.data);
//           console.log(response.data);
//         //   console.log(res);
//         //   console.log(typeof(response.data));
//       });
//   axios.get(`${url}db`).then((response)=>{
//         setDb(response.data);
//         console.table(response.data);
//         // console.log(typeof(response.data.ip));
//   });

//     }, []);



//   return (
//       <>
//         <div>Log</div>
//         <div>
//             <p>{res}</p>
//             <p>{db.ip}</p>
//         </div>
//       </>
//   )
// }

export default Log