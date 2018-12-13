import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';
import {Link} from 'react-router-dom';


class AddNewCustomer extends Component {
    state={
        nameInput: '',
        phoneInput: '',
        spendingInput: ''
    }

    updateInput = (e) => {
        this.setState({[e.target.id]: e.target.value })
        // this.state[e.target.id] = e.target.value
        // fancy way of saying this
    }

    createANewCustomer = (e) => {
        e.preventDefault();
        const newName = this.state.nameInput;
        const newSpending = this.state.spendingInput;
        const newPhone = this.state.phoneInput;
        // grab the values from the DOM

        // gotta send withCredentials: true as a header because
        // the route we are posting to uses req.user which is by default protected by express
        Axios.post("http://localhost:5000/api/customers/newCustomer",
         {name: newName, spending: newSpending, phone: newPhone},
         {withCredentials: true})
         .then((responseFromOurApi)=>{
            console.log('success', responseFromOurApi)

            this.props.letTheIndexComponentKnowThatWeAddedACustomer();
            // after we send the axios request, we call the function in the parent component
            // to make that component go and get all the project again so now it should have the new project we just added


         })
         .catch((err)=>{
            console.log('error creating task', err)
         })
    }


    render(){
        return(
            <div className="addCustomer">
                <h2>Add New Customer:</h2>
                <form onSubmit={this.createANewCustomer}>

                    <label>Name:</label>
                    <input value={this.state.nameInput} id="nameInput" onChange={this.updateInput} />

                    <label>Phone Number:</label>
                    <input value={this.state.phoneInput} id="phoneInput" onChange={this.updateInput} />

                    <label>Spending:</label>
                    <input value={this.state.spendingInput} id="spendingInput" onChange={this.updateInput} />

                    <button>Add</button>

                </form>
                
            </div>
        )
    }





}


export default AddNewCustomer;