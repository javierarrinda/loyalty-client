import React, { Component } from 'react';
import './App.css';
import UserService from './services/UserService';
import {Route, Switch, Link} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

import RestaurantIndex from './components/RestaurantIndex';




class App extends Component {

  state={
    loggedInUser: null,
    error:null,
    details:''
  }
  service = new UserService()


  componentDidMount(props){
    this.fetchUser()
  }

 


    fetchUser(){
      // if( this.state.loggedInUser === null ){
        this.service.loggedin()
        .then(theActualUserFromDB =>{
          this.setState({
            loggedInUser:  theActualUserFromDB
          }) 

        })
        .catch( err =>{
          console.log('catch getting hit')
          this.setState({
            loggedInUser:  false
          }) 
        })
      // }
    }



    logInTheUser = (userToLogIn) => {
      if(userToLogIn.username){
        this.setState({loggedInUser: userToLogIn, error: false})
      } else {
        this.setState({
          error:true,
          details:userToLogIn
        })
      }
    }



    showUser = () =>{
      if(this.state.error){
        return (
          <div>sry, {this.state.details.message}</div>
        )
      }
      if(this.state.loggedInUser){
        return(
          <div>Welcome, {this.state.loggedInUser.username}</div>
        )
      }
    }


    logout = () =>{
      this.service.logout().then(()=>{
        this.setState({loggedInUser: null});
      })
    }





  render() {
    return (
      <div className="mainPage">
      <nav> 
        <p>{this.showUser()}</p>
        <Link to="/signup" class="link"> Register</Link>
        <Link to="/login" class="link"> Login </Link>
        <Link to='/restaurant-index' class="link"> Customers</Link>
        <button onClick = {this.logout} >Logout</button>
      </nav>

        <Switch>
          <Route path="/login" render = {(props)=> <Login {...props} logTheUserIntoAppComponent = {this.logInTheUser} />  } />
          <Route path="/signup" render = {(props)=> <Signup {...props} logTheUserIntoAppComponent = {this.logInTheUser} />  } />

          <Route path="/restaurant-index" render={(props) => <RestaurantIndex {...props} currentUser={this.state.loggedInUser} /> } />

        </Switch>
      
      </div>
    );
  }
}

export default App;
