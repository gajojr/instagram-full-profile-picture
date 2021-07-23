import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageURL, setImageURL] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    setImageURL('');
    setLoadingImage(true);

    axios
      .get(
        `/get-profile-picture?username=${e.target.username.value}`,
        {
          responseType: 'arraybuffer'
        }
      )
      .then(response => {
        console.log(response);
        if (response.headers['content-type'] === 'text/html; charset=utf-8') {
          setLoadingImage(false);
          alert('Profile doesn\'t exist');
          return;
        }

        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setImageURL("data:;base64," + base64);
        setLoadingImage(false);
      })
      .catch(err => {
        setLoadingImage(false);
        console.log(err);
      });
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

      {loadingImage && <div className="loader"></div>}
      {imageURL && <img src={imageURL} alt="profile" />}
    </div>
  );
}

export default App;
