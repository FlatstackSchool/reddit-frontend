/* eslint-disable no-param-reassign,max-len */
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
      .then(response => {
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

  openWindow = () => {
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const state = process.env.REACT_APP_STATE;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const baseUrl = process.env.REACT_APP_BASEURL;
    const url = `${baseUrl}authorize.compact?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=temporary&scope=identity`;
    return window.open(
      url,
      'oauth',
      `width=${width}, height=${height}, left=${left}, top=${top}`,
    );
  };

  getRequest = () => {
    const window = this.openWindow();
    this.checkAuthWindow(window);
  };

  checkAuthWindow = window => {
    const check = setInterval(() => {
      if (!window || window.closed || window.closed === undefined) {
        clearInterval(check);
        console.log('window closed by user');
      }
      try {
        console.log(window.location.hostname);
        if (window.location.pathname.indexOf('callback') >= 0) {
          window.opener.location.href = window.location.href;
          window.close();
        }
      } catch (e) {
        console.log(e);
      }
    }, 500);
  };

  render() {
    const { data, loading, error } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <MainTemplate title="Hot" onclick={this.getRequest}>
          <div>
            <div>
              {loading && <p>Loading...</p>}
              {error && (
                <div>
                  <p>Download error</p>
                  <button type="button" onClick={this.fetch}>
                    Try again
                  </button>
                </div>
              )}
              <p>response: {data}</p>
              {console.log(data)}
            </div>
          </div>
        </MainTemplate>
      </ThemeProvider>
    );
  }
}

export default HomePage;
