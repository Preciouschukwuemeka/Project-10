import React from './node_modules/react';
import {Route, Redirect} from './node_modules/react-router-dom';

const PrivateRoute = ({component: Component, user, setPrevLocation, ...rest}) => {
    return(
        <Route {...rest} render={(props) => {
            setPrevLocation(props.location.pathname);
        return user !== null ? <Component {...props} {...rest} user={user} /> : <Redirect to={'/signin'} />;
        }
        }/>
    );
}

export default PrivateRoute;