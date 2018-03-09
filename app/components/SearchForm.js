import React from 'react';

export default class SearchForm extends React.Component {
  render() {
    return (
      <div id="search-form">
        <form>
          <input id="text-entry" type="text" placeholder="City, State or Zip..." />
          <input id="submit" type="image" src="/app/images/mag.png"/>
        </form>
      </div>
    )
  }
}