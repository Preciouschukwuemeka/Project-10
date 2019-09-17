import React from './node_modules/react';
import {NavLink} from './node_modules/react-router-dom';

const Header = ({user}) => {
    const checkUser = () => {
        if(user){
            return(
                <nav><span>Welcome {user.firstName} {user.lastName}!</span><NavLink className="signout" to="/signout">Sign Out</NavLink></nav>
            );
        }else{
            return(
                <nav><NavLink className="signup" to="/signup">Sign Up</NavLink><NavLink className="signin" to="/signin">Sign In</NavLink></nav>
            );
        }
    }

    return(
        //signed in
        
        <div className="header">
            <div className="bounds">
                <NavLink to="/"><h1 className="header--logo">Courses</h1></NavLink>
                {checkUser()}
            </div>
            <hr />
        </div>
    );
}
