import React, {Component} from 'react';
import "../App.css";
import Axios from 'axios';


class CustomerDetails extends Component{
    state={
        nameInput: '',
        phoneInput: '',
        editing: false
        
    }



    componentWillMount(){
        const theID = this.props.match.params.id;
        Axios.get('http://localhost:5000/api/customers/details/'+theID)
        .then((theThingIGetBackFromApi)=>{

            console.log('------___---__-_-_--_-_-__-_-_-_-_-___-_-----',theThingIGetBackFromApi)

            this.setState({theActualCustomer: theThingIGetBackFromApi.data,
                nameInput: theThingIGetBackFromApi.data.name,
                phoneInput: theThingIGetBackFromApi.data.phone,

            })

        }).catch(()=>{

        })
    }

    updateInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    editProject = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/api/tasks/edit/'+this.state.theActualCustomer._id, 
        {theTitle: this.state.nameInput, theDescription: this.state.phoneInput})
        .then(()=>{
            this.setState({editing: false});
            // after we submit the form and the Axios request is complete, we set this.state.editing
            // back to false so that the form dissappears and looks all fancy
        })
        .catch(()=>{

        })
    }


    toggleForm = () =>{
        this.setState({editing: true})

    }


    showProjectDetails = () =>{
       if(this.state.theActualCustomer){



            if(this.state.editing){
                // if this.state.editing is set to true, we will show a form

                return(
                    <form onSubmit={this.editProject}>
                    <input className="input" value={this.state.nameInput} onChange={this.updateInput} id="nameInput"/>
                    <input className="input" value={this.state.phoneInput} onChange={this.updateInput} id="phoneInput"/>
                    <input className="input" value={this.state.spendingInput} onChange={this.updateInput} id="spendingInput"/>
                    <button>submit changes</button>
                </form>
            )

        }  else{
            // by default this.state.editing is set to false so when we first load the page we will
            // see this below, which is just the info but not form

            return(
                <div>
                    <span>
                    {this.state.nameInput}
                    </span>

                    <span>
                        {this.state.phoneInput}
                    </span>

                    <span>
                        {this.state.spendingInput}
                    </span>
                    {/* we put this little image of a pen here, and add an on click function */}
                    {/* the on click function changes this.state.editing to true */}
                    {/*  therefore, when we change this.state.editing to true, we show a form instead of just the info */}
                    <img onClick={this.toggleForm} className="pen-pic" src="https://us.123rf.com/450wm/jemastock/jemastock1707/jemastock170717063/82921914-stock-vector-school-pen-write-supply-accessory-icon-vector-illustration.jpg?ver=6" alt="pen" />
                </div>
            )
        }
        }
    }


    deleteProject = () =>{
        Axios.post('http://localhost:5000/api/tasks/delete/'+this.state.theActualCustomer._id, {})
        .then(()=>{
            
            this.props.history.push('/project-index');
            // this is how your redirect in react
        })
        .catch(()=>{

        })
    }







    render(){
        console.log(this.props)
        console.log(this.state)
        return(
            <div>
                <h1> Project Details Page</h1>
                {this.showProjectDetails()}

                <br />
                <br />
                <br />
                <br />
            <div>
                <button onClick={this.deleteProject} className="delete">Delete This Project</button>
            </div>

                </div>
        )
    }




}



export default CustomerDetails;