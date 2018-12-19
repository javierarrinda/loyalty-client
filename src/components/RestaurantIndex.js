import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';
import {Link} from 'react-router-dom';


import Rewards from './Rewards';
import NewReward from './NewReward';
import AddNewCustomer from './AddNewCustomer';
import UpdateSpending from './UpdateSpending';

class RestaurantIndex extends Component{

    //look at to-do-list client at between signup and app.js (something is sent from one to the other ) from there look at single project id which updates the input 
    // project index is where he actually gets the information from the logged in user
    // this.props.currentUser._id

        state={
            allTheCustomers: []
        }
    
    componentWillMount(){
        this.fetchCustomers()
    }
    // componentWillMount runs every time the component is about to be rendered on the page
    // in this function, we will make an axios request to our api route
    // the response we ge back should be equal to an object with a .data key inside it, and that .data will be equal to all the tasks from our API
    updateCustomer = (ross) =>{
        console.log('this is ross (the user we are passing in)',ross)
        //update the allTheCustomers array up top with ross.  So what u got to do is goolge how to replace an object in an arry of object by id. then set the state (by mapping??)

        // const updating = this.state.allTheCustomers.map(ross => this.state.allTheCustomers.find(j => j.id == ross.id || ross))
        // .then((getBackFromRoss)=>{
            const updating = this.state.allTheCustomers.map((eachCustomer) =>{
                console.log('each customer log',eachCustomer, ross)
                if (eachCustomer._id == ross.data._id){
                    return ross.data;
                } else {
                    return eachCustomer;
                }
            })
            console.log('updating is ',updating)
            this.setState({allTheCustomers: updating})
            // console.log('getting back from ross',getBackFromRoss);
        // })
        // .catch((err)=>{
        //     console.log('there was an error',err)
        // })
        // console.log('I am updating == ', updating[0])
        // return updating[0];
    }

    fetchCustomers = () =>{
        console.log(this)

        console.log(this.props)
        Axios.get('http://localhost:5000/api/customers', {withCredentials: true})
            .then((responseFromApi)=>{
            console.log('this is the response from api for customers',responseFromApi);
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
                    <div key={eachCustomer._id} className="countries-flex">
                    <div className="box-for-each-customer">

                     <h3>{eachCustomer.name}</h3>
                     <h3>Phone #: {eachCustomer.phone}</h3>
                    <h4>Spent: {eachCustomer.spending}</h4>

                    <Link to={'/customers/details'+ eachCustomer._id} >See Details</Link> 
                    </div>
                </div>
            )
        })
        }
    }

    render(){
      console.log('this is this on index',this);
        return(
            <div>

                <div className="space-evenly">

       
            <div className="add-new-customer">
            <AddNewCustomer letTheIndexComponentKnowThatWeAddedACustomer = {this.fetchCustomers} />
            {/* we pass in this function so that after we add a new project in the addNewProject component */}
            {/* that component will be able to tell this component to go check for new projects */}
            </div>

            <div>
            <UpdateSpending updateCustomer = {this.updateCustomer} />
            </div>
            <div className="add-new-reward">
            <NewReward/>
            </div>


            <div className="show-rewards">
            <Rewards currentUser = {this.props.currentUser} />
            </div>
            
                </div>

            <h1>Your Customers</h1>
            <div className="show-all-customers">
            {this.showAllCustomers()}
            </div>




            </div>
        )
    }



}


export default RestaurantIndex;
