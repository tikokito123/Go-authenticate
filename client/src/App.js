import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Chat from "./Components/Chat";
import EnterChat from "./Components/EnterChat";
import Home from "./Components/Home";
import SideBar from "./Components/SideBar";
import NavBar from './Components/NavBar'; 
import NotFound from "./Components/NotFound";
import Register from "./Components/User";
import './Components/css/main.css'
function App() {
  return (
    <div >
      <Router>
        <NavBar />
        <SideBar />
        <Routes>
          <Route element={<Register />} path="/register" />
          <Route element={<EnterChat />} path="/enter-chat" />
          <Route element={<Chat />} path="/chat" />
          <Route element={<NotFound />} path="*" />
          <Route element={<Home />} path="/" />
          <Navigate to="/not-found" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
