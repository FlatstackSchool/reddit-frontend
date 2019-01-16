import React from 'react';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MainTemplate from '../../templates/MainTemplate';
import NewsCard from '../../organizm/news-card/NewsCard';

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
              {/*<p>date: {responseData.preview.images.source.url}</p>*/}
              <NewsCard
                avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
                userName={responseData.author}
                pubDate={responseData.created_utc}
                title={responseData.title}
                img="https://tproger.ru/wp-content/uploads/2017/08/coding-mini-js.png"
                commentsCount={responseData.num_comments}/>
            </div>
          </div>
        </MainTemplate>
      </ThemeProvider>
    )
  }
}

export default HomePage;
