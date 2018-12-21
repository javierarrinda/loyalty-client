// import React, {Component} from 'react';
// import "../App.css";
// import Axios from 'axios';

// class RewardEdit extends Component{
//     state={
//         thresholdInput: '',
//         nameInput: '',
//         descriptionInput: '',
//         customerResponse: [],
//         rewardResponse: {}
//     }

//     componentWillMount(){
//         // const theRestaurantId = this.props.currentUser._id;
//         const theRewardId = this.props.match.params.id;
//         console.log('component will mount this',this)
//         Axios.post('http://localhost:5000/api/rewards/edit/this/'+theRewardId, {}, {withCredentials: true})
//         .then((res)=>{
//             console.log(res)
//             // this.setState({customerResponse: res.data.customerResponse, rewardResponse: res.data.rewardResponse})
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }



//     render(){
//         return(
//             <div>



//             </div>
//         )
//     }
// }

// export default RewardEdit;