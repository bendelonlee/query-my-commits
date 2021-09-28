import React from 'react';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay'
import fetchGraphQL from './fetchGraphQL';

const { useState, useEffect } = React;

function App() {
  // We'll load the name of a repository, initially setting it to null
  const [name, setName] = useState(null);

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query LoggedInViewerName {
        # feel free to change owner/name here
        viewer {
          login
        }
      }
    `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      setName(data.viewer.login);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, [fetchGraphQL]);

  // Render "Loading" until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {name != null ? `Repository: ${name}` : "Loading"}
        </p>
      </header>
    </div>
  );
}

export default App;