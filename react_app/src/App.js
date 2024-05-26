import * as React from 'react';

import Home from './Home';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProductPage from './ProductPage';

function App(){
  return(
    <Router>
       <div className='App'>
      
          <Switch>
            <Route exact path = "/">
              <Home />
            </Route>
            
            
            <Route exact path = "/ProductPage">
              <ProductPage />
            </Route>


          </Switch>
      </div>



    </Router>
   
  )
}


export default App;
