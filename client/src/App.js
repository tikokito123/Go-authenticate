import logo from './logo.svg';
import './App.css';

function App() {
  const handleSubmit = e => {
    e.preventDefault();

    fetch('localhost:3080/users/create',{
      method: 'POST',
      
    })
  }
  const handleChange = e => {
    e.preventDefault();
  }
  return (
    <div className="App">
      <from onSubmit={handleSubmit}></from>
    </div>
  );
}

export default App;
