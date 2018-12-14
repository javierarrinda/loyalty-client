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
        const newSpending = this.state.spendingInput;
        e.preventDefault();
        this.service.getAllCustomers()
        .then((allTheUsers)=>{
            console.log('these are all the user', allTheUsers);
            let theUser = allTheUsers.customerForThisRest.filter((eachUser)=>{
                console.log("each user .>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", eachUser.phone, this.state.phoneInput);
               return eachUser.phone == this.state.phoneInput;
            }) 
            console.log('this is the user to update  ----',theUser)
               Axios.post("http://localhost:5000/api/customers/edit/"+theUser[0]._id,
                {spending: newSpending},
                {withCredentials: true})
                .then((updatedSpending)=>{
                    this.setState({theUserToUpdate: theUser})
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
            <label>Phone Number:</label>
            <input type="number" value={this.state.phoneInput} id="phoneInput" onChange={this.updateInput} />
            
            <label>Spending:</label>
            <input type="number" value={this.state.spendingInput} id="spendingInput" onChange={this.updateInput} />

            <button type="submit">Update</button>
            </form>

            </div>
        )
    }
}

export default UpdateSpending;