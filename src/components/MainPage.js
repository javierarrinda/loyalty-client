import React, { Component } from 'react';

import logo from "../public/lost-in-loyalty.png";

import kodak from "../public/kodak.png";

class MainPage extends Component{
    render(){
        return(
        <div className="main-page">
        
        
        <div className="header">
            <img src={logo} alt="loyalty"/>
        </div>
        <div className="our-mission">

            <h2>Our Mission</h2>
            
            <p>Cradles to Crayons: Provides children from <br/>birth through age 12, living in homeless or low-income<br/> situations, with the essential items<br/> they need to thrive<br/> – at home, at school and at play.</p>
            
        </div>

        <div className="our-team">
            
            <h2>Our Team</h2>

        <div className="team-images">

            <img className="kodak" src={kodak} alt="kodak"/>
            <img className="kodak" src={kodak} alt="kodak"/>
            <img className="kodak" src={kodak} alt="kodak"/>

        </div>

        </div>


        <div className="contact">
        <h2>Contact Us</h2>
        <label>Drop a line:</label>
        <br/>
        <input type="textarea"/>
        <br/>
        <br/>
        <button>Send</button>
        <div className="contact-us">
        
        <h5>Follow us on Twitter</h5>
        <h5>Follow us on Instagram</h5>
        </div>
        </div>
        
        
        
        </div>
        )
    }
}

export default MainPage;