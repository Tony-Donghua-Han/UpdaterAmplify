import React from 'react';
import './App.css';
import FileUpload from './file-upload';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <div className="App">
      <Authenticator variation='modal' hideSignUp={true}>
        {({ signOut, user }) => (
          <div>
            { (user !== undefined && user.attributes !== undefined) ? <h2>Hello, {user.attributes.email}</h2> : <h2>Not signed in</h2> }
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
      <h1>File Upload</h1>
      <FileUpload />
    </div>
  );
}

export default App;
