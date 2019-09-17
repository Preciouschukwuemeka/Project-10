import React from './node_modules/react';
import {Redirect} from './node_modules/react-router-dom';

const UserSignOut = ({signOut}) => {
    signOut();
    return(
        <Redirect to="/"/>
    );
}

export default UserSignOut;