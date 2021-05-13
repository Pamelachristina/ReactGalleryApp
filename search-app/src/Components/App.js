import React, { Component } from 'react';
import './css/App.css';
import apiKey from '../config';
import SearchForm from './SearchForm';
import Home from './Home';
import Nav from './Nav';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import PhotoList from './PhotoList';
import notFound from './notFound';




 class App extends Component {
  
  constructor() {
    super();
    this.state = {
      photos: [],
      cats: [],
      dogs: [],
      owls: [],
      title: '',
      tags: '',
      search: '',
      loading: true
      
    };
  } 

  isLoading = () => {
    this.setState({
      loading: true
    });
  }


  performSearch = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          photos: responseData.photos.photo,
          tags: query,
          isLoading: false
        })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  componentDidMount() {
    this.performSearch('cats');

    //Gets cat photos
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          cats: responseData.photos.photo,
          isLoading: false
        })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    //Gets dog photos
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        dogs: responseData.photos.photo,
        isLoading: false
      })
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });

  //Gets owl photos
  fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=owls&per_page=24&format=json&nojsoncallback=1`)
  .then(response => response.json())
  .then(responseData => {
    this.setState({
      owls: responseData.photos.photo,
      isLoading: false
    })
})
.catch(error => {
  console.log('Error fetching and parsing data', error);
});

  }
  


  render() { 
    return (
    <BrowserRouter>
    
        <div className="container">
            <Home />
            <SearchForm onSearch={this.performSearch} />   
            <div className="main-nav">
              
              <Nav  />
              <Switch>
                <Route exact path='/' render={ () => <PhotoList data={this.state.photos} title={this.state.tags} handleSearch={ () => this.performSearch}/>} />
                <Route path="/search/:query" render={()=> <PhotoList data={this.state.photos} title={this.state.tags} handleSearch={this.performSearch} loading={this.state.isLoading}/> } />
                <Route exact path='/' render={ () => <PhotoList data={this.state.photos} title={this.state.tags} />} />
                <Route exact path="/cats" render={()=> <PhotoList data={this.state.cats} title="Cats" handleSearch={() => this.performSearch}/>} />
                <Route exact path="/dogs" render={()=> <PhotoList data={this.state.dogs} title="Dogs" handleSearch={() => this.performSearch}/>} />
                <Route exact path="/owls" render={()=> <PhotoList data={this.state.owls} title="Owls" handleSearch={() => this.performSearch}/>} />
                <Route component={notFound} />



              </Switch>
        </div>
        </div> 

  
      </BrowserRouter>
      
    
    );
  }
}
export default App;