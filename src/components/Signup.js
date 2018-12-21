import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';
import UserService from '../services/UserService';
import {Link} from 'react-router-dom'


class Signup extends Component {
      state = { usernameInput: '', passwordInput: '' };
      service = new UserService();
    
  
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }


    handleFormSubmit = (e) =>{
        e.preventDefault();
        // you could just do axios.post('http://localhost:5000/api/signup, {username: this.state.userNameInput, password: this.state.passWordInput}, {withCredentials: true})
        this.service.signup(this.state.usernameInput, this.state.passwordInput)
        .then((userFromDB)=>{
            console.log('------------------------', userFromDB)
            this.props.logTheUserIntoAppComponent(userFromDB)
            // here we wait for the API to give us the user object back after logging in
            // then we pass that user object back to app component
            this.setState({usernameInput: '', passwordInput: ''})


            // redirect 
            this.props.history.push('/restaurant-index');


        })
        .catch((err)=>{
            console.log('sorry something went wrong', err)

        })

    }
  
    render(){
      return(
        <div className="login-form-parent">
            <form className="login-form" onSubmit={this.handleFormSubmit}>

            <div>

     
                <input  placeholder="USERNAME"type="text" name="usernameInput" value={this.state.usernameInput} onChange={ e => this.handleChange(e)}/>
                
                <input placeholder="PASSWORD" name="passwordInput" value={this.state.passwordInput} onChange={ e => this.handleChange(e)} />
                
            </div>
                <button className="button-id">Submit</button>
            <p>Already have account? 
                <Link to={"/login"}> Login</Link>
            </p>
            </form>


    </div>
      )
    }
  }
  
  export default Signup;