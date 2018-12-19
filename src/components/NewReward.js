import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';



class NewReward extends Component{
    state={
        thresholdInput: '',
        nameInput: '',
        descriptionInput: ''
    }

    updateInput = (e) => {
        this.setState({[e.target.id]: e.target.value })
        // this.state[e.target.id] = e.target.value
        // fancy way of saying this
    }

    createANewReward = (e) =>{
        // e.preventDefault();
        const newThreshold = this.state.thresholdInput;
        const newName = this.state.nameInput;
        const newDescription = this.state.descriptionInput;
        Axios.post('http://localhost:5000/api/rewards/newReward', 
        {threshold: newThreshold, name: newName, description: newDescription},
        {withCredentials: true})
        .then((rewardResponse)=>{
            console.log('reward response here',rewardResponse)
        })
        .catch((err)=>{
            console.log('error creating reward', err);
        })
    }


    render(){
        return(
        <div className="new-reward-component">
        <h2>Add Reward:</h2>
        <form onSubmit={this.createANewReward}>
                <span>

        <label>Title:</label>
        <input value={this.state.nameInput} id="nameInput" onChange={this.updateInput} />
                </span>
                
                <span>
        <label>Description:</label>
        <input type="textarea" value={this.state.descriptionInput} id="descriptionInput" onChange={this.updateInput} />
                </span>

                <span>
        <label>Spending:</label>
        <input type="number" value={this.state.thresholdInput} id="thresholdInput" onChange={this.updateInput} />
                </span>

        <button>Add</button>

        </form>


        </div>
        )
    }
}




export default NewReward;