import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';
import {Link} from 'react-router-dom';


import AddNewCustomer from './AddNewCustomer';

class RestaurantIndex extends Component{
    state={
        allTheCustomers: []
    }

    // keep in mind, the first time the render function runs, the state will look exactly like we set it up in the contstructor above
    // so since we are doint this.state.alltheProject.map, equalling to an empty array in the beginning is a clever trick because
    // this first time the component renders, the state will have an empty array and will loop through that empty array and show nothing
    // you will not see this because it happens very quickly
    // however, if we do start out be equalling our this.state.alltheProjects to an empty array,
    // we will get an error because we are trying to do .map on null, but you are not allowed to do that

// componentWillMount runs everytime the component is about to be rendered on the page
// in this function, we will make an axios request to our api route
// the response we ge back should be equal to an object with a .data key inside it, and that .data will be equal to all the tasks from our API

    componentWillMount(){
       this.fetchCustomers()
    }


    fetchCustomers = () =>{
        console.log(this)

        console.log(this.props)
        Axios.get('http://localhost:5000/api/customers', {withCredentials: true})
            .then((responseFromApi)=>{
            console.log(responseFromApi);
            this.setState({allTheCustomers: responseFromApi.data.customerForThisRest.reverse()}) 
            // .reverse is just so we see the newest tasks at the top of the page
            // once we get all the tasks, we set the state so that the state will have all the tasks in there
        })
        .catch((err)=>{
        })
    }


    // because componentWillMount will still allow the component to intialize before running, we can protect ourselves
    // by putting an if statement before anytime we want to loop through something in our state
    showAllCustomers = () => {
        console.log('this is this----',this)
        if(this.state.allTheCustomers && this.props.currentUser){

            const myCustomers = this.state.allTheCustomers.filter((eachCustomer)=>{
                //return eachCustomer;
                return eachCustomer.restaurantID === this.props.currentUser._id
            })
            console.log(myCustomers)

            // once we have all the tasks in the state, we can map through them as we normally do
            return myCustomers.map((eachCustomer)=>{
                return(
                    <div key={eachCustomer._id}>
                     <h3>{eachCustomer.name}</h3>
                    <h6>{eachCustomer.description}</h6>

                    <Link to={'/project/'+ eachCustomer._id} >See Details</Link> 
                </div>
            )
        })
        }
    }



    render(){
      
        return(
            <div>
            <h1>Your Customers</h1>

            <div className="show-all-customers">
            {this.showAllCustomers()}
            </div>


            <div className="add-new-customer">
            <AddNewCustomer letTheIndexComponentKnowThatWeAddedACustomer = {this.fetchCustomers} />
            {/* we pass in this function so that after we add a new project in the addNewProject component */}
            {/* that component will be able to tell this component to go check for new projects */}
            </div>


            </div>
        )
    }



}


export default RestaurantIndex;
