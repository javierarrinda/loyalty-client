import React, { Component } from 'react';



class MainPage extends Component{
    render(){
        return(
        <div className="main-page">
        
        
        <div className="header">
            <img src="/lost-in-loyalty.png" alt="loyalty"/>
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