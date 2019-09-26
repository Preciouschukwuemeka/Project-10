import React from 'react';
import { Redirect } from 'react-router-dom';

//if the user signed out, then it redirects to the home page.
export default ({context}) => {
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}
