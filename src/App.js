import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from './places/pages/NewPlace';
import PlacesUser from "./places/pages/PlacesUser";
import EditPlace from "./places/pages/EditPlace";
import Navigation from './shared/components/NavBar/Navigation';


const App = () => {
  return (
    <Router>
      <Navigation/>
      <main>
      <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path='/:userId/places' exact>
        <PlacesUser/>
      </Route>
      <Route path="/places/new" exact>
        <NewPlace/>
      </Route>
      <Route path="/places/:placeId">
        <EditPlace/>
      </Route>
      <Redirect to="/"/>
      </Switch>
      </main>
    </Router>
  );
};

export default App;
