import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes as MainRoutes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import {useDispatch} from 'react-redux'
import { Provider } from 'react-redux';
import store from './store/store';
// import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import {loadUser , logout} from './store/slices/authSlice'
import './App.css';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
   store.dispatch(loadUser());
   dispatch(loadUser())


    window.addEventListener('storage', () => {
      if (!localStorage.token){
          dispatch(logout())
      }
    });
  }, []);

  

  return (
       <Provider store={store}>
         <Router>
            <Fragment>
              <Navbar />
              <MainRoutes>
                <Route exact path="/" component={Landing} />
                <Route component={Routes} />
              </MainRoutes>
            </Fragment>
          </Router>
       </Provider>
  );

};

export default App;

