import React from 'react';
import {Switch, BrowserRouter, Route,Link} from 'react-router-dom';
import Home from './components/home';
import Add_event from './components/add_event';
import Update_event from './components/update_event'; 
function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/update_event" component={Update_event}/>
              <Route exact path="/add_event" component={Add_event}/>

            </Switch>      
        </div>
    </BrowserRouter>
  );
}

export default App;
