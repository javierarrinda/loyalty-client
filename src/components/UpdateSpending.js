import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';
import {Link} from 'react-router-dom';
import UserService from '../services/UserService';

class UpdateSpending extends Component{
    state={
        phoneInput: '',
        spendingInput: '',
        theUserToUpdate: {}
    }

    service = new UserService();

    updateInput = (e) => {
        this.setState({[e.target.id]: e.target.value })
        // this.state[e.target.id] = e.target.value
        // fancy way of saying this
    }
    
    updateSpending = (e) =>{
        console.log('this is User Service -- ',this.service);
        // pass from app.js to restaurant index to update spending in order to filter (currentUser is what im passing)
        const newSpending = this.state.spendingInput;
        e.preventDefault();
        this.service.getAllCustomers()
        .then((allTheUsers)=>{
            console.log('these are all the user', allTheUsers);
            let theUser = allTheUsers.customerForThisRest.filter((eachUser)=>{
                console.log("each user .>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", eachUser, this.state);
               return eachUser.phone == this.state.phoneInput;
            }) 
            console.log('this is the user to update  ----',theUser[0].spending)
               Axios.post(process.env.REACT_APP_API_URL + "/customers/edit/"+theUser[0]._id,
                {spending: newSpending},
                {withCredentials: true})
                .then((updatedSpending)=>{
                    this.setState({theUserToUpdate: updatedSpending.data.spending})
                    console.log('the user to update log',this.state.theUserToUpdate)
                    console.log('updated spending is this ', updatedSpending)
                    this.props.updateCustomer(updatedSpending);        
                })
                .catch((err)=>{
                    console.log('error creating task', err)
                })
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    render(){
        return(
            <div className="update-through-phone">
            <form onSubmit={this.updateSpending}>

            <h3>Update Customer by Number: </h3>
                    <span>
            <label>Phone Number:</label>
            <input type="number" value={this.state.phoneInput} id="phoneInput" onChange={this.updateInput} />
                    </span>

                    <span>
            <label>Spending:</label>
            <input type="number" value={this.state.spendingInput} id="spendingInput" onChange={this.updateInput} />
                    </span>

            <button type="submit">Update</button>
            </form>

            </div>
        )
    }
}

export default UpdateSpending;