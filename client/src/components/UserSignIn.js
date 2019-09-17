 import React,{Component} from './node_modules/react';
import {NavLink} from './node_modules/react-router-dom';

class UserSignIn extends Component {
    state = {
        message: null
    }

    async submitForm(e){
        e.preventDefault();
        const res = await this.props.signIn(e.target[0].value, e.target[1].value);
        if(res === 200){
            this.props.history.push(this.props.prevLocation);
            this.props.setPrevLocation('/');
        }else{
            this.setState({message:"Invalid email or password"});
        }
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
            <div>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        {this.printErrors()}
                        <form onSubmit={(e) => {this.submitForm(e)}}>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" /></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={(e)=> {e.preventDefault();this.props.history.push('/');}}>Cancel</button>
                                </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <NavLink to="/signup">Click here</NavLink> to sign up!</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserSignIn;
