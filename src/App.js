import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: '',
      errorMessage: '',
      loading: false,
    };
  }

  key = '16a63f8cb5fc103c8b8d80e5f178b2e1';

  searchLocation = (event) => {
    if (event.key === 'Enter') {
      this.setState({ loading: true, errorMessage: '' });
      setTimeout(() => {
        const { location } = this.state;
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.key}&units=metric`;
        axios.get(URL)
          .then((response) => {
            this.setState({ data: response.data, location: '', loading: false });
          })
          .catch((error) => {
            const errorMessage = error.response
              ? error.response.data.message
              : error.request
                ? 'No response received'
                : error.message;
            this.setState({ errorMessage, loading: false });
            console.log(error);

          })
      }, 2000);
    }
  }

  handleChange = (event) => {
    this.setState({ location: event.target.value });
  }

  render() {
    const { data, location, errorMessage, loading } = this.state;

    return (
      <div className="app">
        <div className='search'>
          <input
            value={location}
            onChange={this.handleChange}
            onKeyDown={this.searchLocation}
            placeholder='Enter City Name'
          />
        </div>
        {errorMessage && <div className='warning'>{errorMessage}</div>}
        {loading && <div className='loader'></div>}

        <div className='container'>
          <div className='top'>
            {data.name && <div className='location'><p>{data.name}</p></div>}
            {data.main && <div className='temp'><h1>{data.main.temp} °C</h1></div>}
            {data.weather && <div className='description'><p>{data.weather[0].main}</p></div>}
          </div>
          <div className='bottom'>
            {data.main && (
              <>
                <div className='feels'>
                  <p className='bold'>{data.main.feels_like}°C</p>
                  <p>Feels Like</p>
                </div>
                <div className='humidity'>
                  <p className='bold'>{data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </>
            )}
            {data.wind && (
              <div className='wind'>
                <p className='bold'>{data.wind.speed} m/s</p>
                <p>Wind Speed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
