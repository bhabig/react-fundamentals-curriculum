import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css');

const App = (props) => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);