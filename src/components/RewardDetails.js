import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';


class RewardDetails extends Component{
    state={
        thresholdInput: '',
        nameInput: '',
        descriptionInput: '',
        customerResponse: [],
        rewardResponse: {},
        editing: false
    }

    componentWillMount(){
        // const theRestaurantId = this.props.currentUser._id;
        const theRewardId = this.props.match.params.id;
        console.log('component will mount this',this)
        Axios.post(process.env.REACT_APP_API_URL + '/rewards/approved/'+theRewardId, {}, {withCredentials: true})
        .then((res)=>{
            console.log(res)
            this.setState({customerResponse: res.data.customerResponse, rewardResponse: res.data.rewardResponse})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
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

    editReward = (e) =>{
        // e.preventDefault();
        const theRewardId = this.props.match.params.id;
        console.log('reward id is this {{{{',theRewardId);
        Axios.post(process.env.REACT_APP_API_URL + '/rewards/edit/'+theRewardId, {theName: this.state.nameInput, theDescription: this.state.descriptionInput, theThreshold: this.state.thresholdInput}, {withCredentials: true})
        .then((res)=>{
            console.log(res)
            this.setState({editing: false})
        })
        .catch((err)=>{
            console.log('error occurred' ,err)
        })
    }

    toggleForm = () =>{
        this.setState({editing: true})
    }

    deleteProject = () =>{
        const theRewardId = this.props.match.params.id;
        Axios.post(process.env.REACT_APP_API_URL + '/rewards/delete/'+theRewardId, {})
        .then(()=>{
            
            this.props.history.push('/project-index');
            // this is how your redirect in react
        })
        .catch(()=>{

        })
    }

    showRewardsForm = () =>{
        if(this.state.rewardResponse){
            if(this.state.editing){
                return(
                    <div className="reward-details-a">
                    
                    <form className="reward-details-b"onSubmit={this.editReward}>
                        <input name="nameInput" placeholder="NAME INPUT" value={this.state.nameInput} onChange={ e => this.handleChange(e)}/>
                        
                        <input name="descriptionInput" placeholder="DESCRIPTION" value={this.state.descriptionInput} onChange={ e => this.handleChange(e)}/>
                        
                        <input name="thresholdInput" placeholder="THRESHOLD" value={this.state.thresholdInput} onChange={ e => this.handleChange(e)}/>

                        <button>Submit</button>
                        
                    
                    
                    </form>

                    </div>
                )
            } else {

                return(
                                <div className="reward-details-a">
                                
                        <div className="reward-details-b">

                            <h1>{this.state.rewardResponse.name}</h1>

                            <h3>{this.state.rewardResponse.description}</h3>

                            <h2>

                            $ {this.state.rewardResponse.threshold}
                            </h2>


                            <button className="button-id" onClick={this.toggleForm}>Edit</button>

                            <button onClick={this.deleteProject} className="button-id">Delete this Reward</button>
                                    

                        </div>
                                
                                </div>

                    )

            }
        }
    }



    render(){
        return(
            <div className="reward-details-background">
            {/* <h2> */}
            <h2>Reward Details: </h2>

            {this.showRewardsForm()}

            <div className="user-rewards-div">
            <h2>Customers for this Reward:</h2>
            {this.showUsersForReward()}
            </div>



            </div>
        )
    }
}


export default RewardDetails;