import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    //bringing in the context and the authenticated user
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    //If user is authenticated, show welcome user sign on the top right.
    //if user is not authenticated, show sign up and sign in.
    return (
      <div className="header">
        <div className="bounds">
          <Link className="header--logo" to="/">Courses</Link>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
};
