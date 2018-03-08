import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css');

const App = (props) => {
  return (
    <div>
      'Alexa, what's the weather today?'
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);