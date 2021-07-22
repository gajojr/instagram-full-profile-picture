import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageURL, setImageURL] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    axios
      .get(
        `/get-profile-picture?username=${e.target.username.value}`,
        {
          responseType: 'arraybuffer'
        }
      )
      .then(response => {
        console.log(response);
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setImageURL("data:;base64," + base64);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      Search profile:
      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" label="somebody.somewhere" />
        </label>

        <button type="submit">Search</button>
      </form>

      {imageURL && <img src={imageURL} alt="profile" />}
    </div>
  );
}

export default App;
