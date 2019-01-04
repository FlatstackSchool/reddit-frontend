import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    loading: false,
    error: false,
    data: [],
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.setState({
      data: [],
      loading: true,
      error: false,
    });
    axios
        .get(`https://www.reddit.com/hot.json`, {
          params: {
            // apikey: process.env.file_name,
          },
        })
        .then((response) => {
          this.setState({
            loading: false,
            data: [response.data.data.children[0].data.author],
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
            error: true,
          });
        });
  };
  render() {
    const { data, loading, error } = this.state;
    return (
      <div>
        <div>
          {loading && <p>Loading...</p>}
          {error && (
              <div>
                <p>Download error</p>
                <button onClick={this.fetch}>Try again</button>
              </div>
          )}
          <p>response: {data}</p>
          {console.log(data)}
        </div>
      </div>
    );
  }
}

export default App;
