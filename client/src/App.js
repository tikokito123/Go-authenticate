import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Chat from "./Components/Chat";
import EnterChat from "./Components/EnterChat";
import Home from "./Components/Home";
import SideBar from "./Components/NavBar";
import NotFound from "./Components/NotFound";
import Register from "./Components/User";

function App() {
  return (
    <div className="App">
      <Router>
        <SideBar />
        <Switch>
          <Route component={Register} path="/register" />
          <Route component={EnterChat} path="/enter-chat" />
          <Route component={Chat} path="/chat" />
          <Route exact component={Home} path="/" />
          <Route component={NotFound} path="/not-found" />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
