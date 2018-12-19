import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';




class RewardDetails extends Component{
    state={
        thresholdInput: '',
        nameInput: '',
        descriptionInput: '',
        customerResponse: [],
        rewardResponse: {}
    }

    componentWillMount(){
        // const theRestaurantId = this.props.currentUser._id;
        const theRewardId = this.props.match.params.id;
        console.log('component will mount this',this)
        Axios.post('http://localhost:5000/api/rewards/edit/'+theRewardId, {}, {withCredentials: true})
        .then((res)=>{
            console.log(res)
            this.setState({customerResponse: res.data.customerResponse, rewardResponse: res.data.rewardResponse})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    showUsersForReward = ()=>{

        return this.state.customerResponse.map((user)=>{
            
            return(
                <div className="user-rewards">
                    <h3>Name: {user.name}</h3>
                    <h3>Spent: ${user.spending}</h3>
                </div>
            )
        })
    }


    render(){
        return(
            <div>
            {/* <h2> */}
            <h2>Reward Details: </h2>
                <h2>
                {this.state.rewardResponse.name}
                </h2>
            <div className="user-rewards-div">
            <h2>Customers for this Reward:</h2>
            {this.showUsersForReward()}
            </div>
            {/* </h2> */}
            </div>
        )
    }
}


export default RewardDetails;