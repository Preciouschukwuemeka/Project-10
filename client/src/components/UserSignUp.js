import React, {Component} from './node_modules/react';
import {NavLink} from './node_modules/react-router-dom';


//TODO add validation error messages
class UserSignUp extends Component {
    state = {
        message: null
    }

    async submitForm(e){
        e.preventDefault();
        if(e.target[3].value === e.target[4].value){
            let error = await this.props.signUp(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value)
            if(!error){//undifined when no errors
                this.props.history.push('/');
            }else{
                this.setState({message: error.message});
            }
        }else{
            this.setState({message: "Please ensure your passwords match"})
        }
        //set messages
    }

    printErrors(){
        if(this.state.messages !== null){
            return(
                <div>
                    <div className="validation-errors">
                        <ul>
                            {this.state.message}
                        </ul>
                    </div>
                </div>
            );
        }
    }

    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    {this.printErrors()}
                    <form onSubmit={(e) => {this.submitForm(e)}}>
                    <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" defaultValue="" /></div>
                    <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" defaultValue="" /></div>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" /></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" /></div>
                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                        defaultValue="" /></div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Sign Up</button>
                        <button className="button button-secondary" onClick={(e)=> {e.preventDefault();this.props.history.push('/');}}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <NavLink to="/signin">Click here</NavLink> to sign in!</p>
                </div>
            </div>
        );
    }
}

export default UserSignUp

