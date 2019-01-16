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
    responseData: [],
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
          responseData: response.data.data.children[1].data,
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
    const {
      responseData, loading, error
    } = this.state;
    // var data = responseData.children[0].data;
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
              {console.log(responseData)}
              <p>author: {responseData.author}</p>
              <p>date: {responseData.created_utc}</p>
              <p>title: {responseData.title}</p>
              {/*<p>date: {responseData.preview.images.source.url}</p>*/}
              <p>comments: {responseData.num_comments}</p>
            </div>
          </div>
        </MainTemplate>
      </ThemeProvider>
    )
  }
}

export default HomePage;
