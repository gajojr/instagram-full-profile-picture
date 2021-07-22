import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      Users list:
      <div>
        {users && users.map(user => {
          return <p key={user.id}>{user.name} {user.last_name}</p>
        })}
      </div>
    </div>
  );
}

export default App;
