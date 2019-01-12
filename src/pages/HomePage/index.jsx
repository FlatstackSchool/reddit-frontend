import React from 'react';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MainTemplate from '../../templates/MainTemplate';

const theme = createMuiTheme();
class HomePage extends React.Component {
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
    <ThemeProvider theme={theme}>
      <MainTemplate title="Hot">
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
      </MainTemplate>
    </ThemeProvider>
    )
  }
}

export default HomePage;
