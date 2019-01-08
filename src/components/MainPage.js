import React, { Component } from 'react';
import {Link} from 'react-router-dom';



class MainPage extends Component{
    render(){
        return(
        <div className="main-page">
        
        
        <div className="header">
        
        <div className="left-side">
        
            <div className="quote">
                <h3>A customer is the most important visitor on our premises, he is not dependant on us. We are dependant on them.</h3>
                <h5>Mahatma Gandhi</h5>
            </div>

            <div className="index-buttons">
                <button><Link to="/signup" class="link"> Register</Link></button>

                <button><Link to="/login" class="link"> Login </Link></button>
            </div>

            <div className="more-about-us">
                <button id="about-us-button">
                    <a href="https://en.wikipedia.org/wiki/Loyalty_business_model">More About Us</a> 
                </button>
            </div>

        </div>

            <img src="/lost-in-loyalty.png" alt="loyalty"/>

            {/* <button id="signup">Signup</button> */}
        </div>


        <div className="our-team">
            
            <h2>Our Team</h2>

            <div className="team-images">

                <img className="kodak" src="https://bit.ly/2CqWclM" alt="kodak"/>
                <img className="kodak" src="https://bit.ly/2CqWclM" alt="kodak"/>
                <img className="kodak" src="https://bit.ly/2CqWclM" alt="kodak"/>

            </div>

            <div className="team-images">
                <h4 className="kodak">Rick</h4>
                <h4 className="kodak">Rick</h4>
                <h4 className="kodak">Rick</h4>
            </div>

            <div className="team-images">
                <p className="kodak">Mad Scientist</p>
                <p className="kodak">Mad Scientist</p>
                <p className="kodak">Mad Scientist</p>
            </div>


        </div>



        <div className="our-mission">

            <h2>Our Mission</h2>
            
            <p>Cradles to Crayons: Provides children from <br/>birth through age 12, living in homeless or low-income<br/> situations, with the essential items<br/> they need to thrive<br/> – at home, at school and at play.</p>
            
        </div>

        
        
            <div className="contact-us">
        
        <h4>Follow us on Twitter</h4>
        <h4>Follow us on Instagram</h4>
        
            </div>
        
        
        
        </div>
        )
    }
}

export default MainPage;