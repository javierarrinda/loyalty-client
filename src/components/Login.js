
import React, {Component} from 'react';
import "../App.css";
import UserService from '../services/UserService';


class Login extends Component {
      state = { usernameInput: '', passwordInput: '' };
      userService = new UserService();
    
  
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }


    handleFormSubmit = (e) =>{
        e.preventDefault();
        // you could just do axios.post('http://localhost:5000/api/signup, {username: this.state.userNameInput, password: this.state.passWordInput}, {withCredentials: true})
        this.userService.login(this.state.usernameInput, this.state.passwordInput)
        .then((userFromDB)=>{
            console.log(userFromDB);
            // here we wait for the API to give us the user object back after logging in
            this.setState({usernameInput: '', passwordInput: ''})
            
            // then we pass that user object back to app component
            this.props.logTheUserIntoAppComponent(userFromDB)
            // here, we are getting the user object from the DB
            // and we're setting AppComponent.state.loggedinuser equal to it


            this.props.history.push('/restaurant-index');
            // then we redirect
            


        })
        .catch((err)=>{
            console.log('sorry something went wrong', err)

        })

    }
  
    render(){
      return(
        <div className="login-form-parent">
                    <div>

                        <form onSubmit={this.handleFormSubmit} className="login-form">

                        
                {/* <label>Username:</label> */}

                <div>
                <input placeholder="USERNAME"type="text" name="usernameInput" value={this.state.usernameInput} onChange={ e => this.handleChange(e)}/>
                    
                

                {/* <label>Password:</label> */}
                <input placeholder="PASSWORD" name="passwordInput" value={this.state.passwordInput} onChange={ e => this.handleChange(e)} />
                </div>


            
                <button id="button-id" type="submit" value="Login">Continue</button>
                
            
                        </form>
             </div>

    </div>






      )
    }
  }
  
  export default Login;