import React from 'react'
import './Home.css'

function Home() {
    return (
        <>
            <div>Home, Welcom to sldc Portal for IP updation.</div>
            <div className="table">

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
                <div className="button_grp">
                    <button className='style_1'>Button 1</button>
                    <button className="style_2 style_1">Button 2</button>
                    <button className="button" ><span>Hover </span></button>
                </div>

            </div>
        </>
    )
}

export default Home