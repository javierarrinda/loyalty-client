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
        Axios.get('http://localhost:5000/api/rewards', {withCredentials: true})
        .then((apiRewards)=>{
            console.log('api rewards go here',apiRewards);
            this.setState({allTheRewards: apiRewards.data.rewardGotten})
        })
        .catch((err)=>{
            console.log('error', err);
        })
    }

    showAllRewards = () =>{
       console.log('thisthisthisthis',this)
        if(this.state.allTheRewards && this.props.currentUser){
            const myRewards = this.state.allTheRewards.filter((eachReward)=>{
                console.log("each reward", eachReward)
                return eachReward.restaurantID === this.props.currentUser._id
            })
            console.log('my rewards',myRewards)
            return myRewards.map((eachReward)=>{
                return(
                    <div>
                        <h4>{eachReward.name}</h4>
                        <Link to={'/rewards/edit/'+eachReward._id}>See Details</Link>
                    </div>
                )
            })
        }
    }



    render(){
        return(
            <div className="show-rewards-box">
        <h2>Rewards:</h2>
        <ul>
            <li>
                {this.showAllRewards()}
            </li>
        </ul>

            </div>
        )
    }
}

export default Rewards;