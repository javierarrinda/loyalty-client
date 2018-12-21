import React, {Component} from 'react';
import "../App.css";
import {Link} from 'react-router-dom';
import Axios from 'axios';

class Rewards extends Component{
        
    state={
            allTheRewards: []
        }

    componentWillMount(){
       this.fetchRewards()
    }


    fetchRewards = () =>{
        console.log(this)
        Axios.get(process.env.REACT_APP_API_URL + '/rewards', {withCredentials: true})
        .then((apiRewards)=>{
            console.log('api rewards go here',apiRewards);
            this.setState({allTheRewards: apiRewards.data.rewardGotten})
        })
        .catch((err)=>{
            console.log('error', err);
        })
    }

    showAllRewards = () =>{
       
        if(this.state.allTheRewards && this.props.currentUser){
            const myRewards = this.state.allTheRewards.filter((eachReward)=>{
                console.log("each reward", eachReward)
                return eachReward.restaurantID === this.props.currentUser._id
            })
            console.log('my rewards',myRewards)
            return myRewards.map((eachReward)=>{
                return(
                    <div>
                        <Link id="rewards-links" to={'/rewards/edit/'+eachReward._id}>{eachReward.name}</Link>
                    </div>
                )
            })
        }
    }



    render(){
        return(
            <div className="show-rewards-box">
        <h1>Rewards:</h1>
        <h4>
                {this.showAllRewards()}
        </h4>

            </div>
        )
    }
}

export default Rewards;