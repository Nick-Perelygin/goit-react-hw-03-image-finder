import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends React.Component {
state ={
  value: '',
}

onSubmitClick = data => {
  this.setState({value: data.value})
}

render() {
    return (
      <div className="App"
        style={{
          height: '100vh',
          display: 'block',
          fontSize: 40,
          color: '#010101',
        }}>
        <Searchbar onSubmit={this.onSubmitClick}/>
        <ImageGallery value={this.state.value}/>
      </div>
    )
  }
};
