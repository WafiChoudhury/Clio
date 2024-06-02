import * as React from 'react';

import Home from './Home';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProductPage from './ProductPage';
import RedditPage from './RedditPage';
import YouTubePage from './YouTubePage';
import TikTokPage from './TikTokPage';

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

            <Route path="/RedditPage" component={RedditPage} />
            <Route path="/TikTokPage" component={TikTokPage} />

            <Route exact path = "/YouTubePage">
              <YouTubePage />
            </Route>

          </Switch>
      </div>



    </Router>
   
  )
}


export default App;
