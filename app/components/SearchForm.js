import React from 'react';

export default class SearchForm extends React.Component {
  render() {
    return (
      <div id="search-form">
        <form>
          <input id="text-entry" type="text" placeholder="City, State or Zip..." />
          <button id="submit">Ask Alexa</button>
        </form>
      </div>
    )
  }
}