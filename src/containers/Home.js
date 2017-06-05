import React, { Component } from 'react';
import './Home.css'

class Home extends Component{
    render(){
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Hello Khánh đây</h1>
                    <p>Đây là SPA của Khánh làm bằng ReactJs và build trên AWS</p>
                </div>
            </div>
        );
    }
}

export default Home;