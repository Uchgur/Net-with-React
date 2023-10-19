import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './route-config'
import configureValidations from './Validations';
import { claim } from './Auth/Auth.models';
import AuthenticationContext from './Auth/AuthenticationContext';
import { getClaims } from './Auth/HandleJWT';
import configureInterceptor from './utils/HttpInterceptors';

configureValidations();
configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, [])
  
  function isAdmin() {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{claims, update: setClaims}}>
        <Menu />
        <div className="container">
          <Switch>
            {routes.map(route => 
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.isAdmin && !isAdmin() ? <>
                You are not allowed to see this page
              </> : <route.component />}
            </Route>)}
          </Switch>
       </div>
        <footer className="bd-footer py-5 mt-5 bg-light">
          <div className="container">
           Made by Kaunaz Dagaz
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>

  )
}

export default App;
