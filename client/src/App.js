import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route component={Signup} path="/Signup"/>
          <Route component={Signin} path="/Signin"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
