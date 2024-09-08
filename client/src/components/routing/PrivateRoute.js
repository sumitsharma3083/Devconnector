import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({component : Component , path }) => {
  const {isAuthenticated, loading} = useSelector(state => state.auth)

     if(loading){
       return <Spinner/>
     }
     if(isAuthenticated){
        return (
          <Route 
          exact 
            path={path}
            component={Component}
          />
        )
     }else{
      return <Redirect to="/login"/>
     }
}



export default PrivateRoute 
