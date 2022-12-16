import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/place/new" exact>
          <NewPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
