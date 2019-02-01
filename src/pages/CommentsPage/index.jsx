/* eslint-disable max-len,react/no-unused-state,react/prop-types,consistent-return */
import React from 'react';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import NewsCard from '../../organisms/NewsCard';
import MainTemplate from '../../templates/MainTemplate';
import Index from '../../molecules/TimeConverter';

const theme = createMuiTheme();

class CommentPage extends React.Component {
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
      loading: true,
      error: false,
    });

    const { match } = this.props;

    axios
      .get(`https://www.reddit.com/hot.json`)
      .then(response => {
        this.setState(() => ({
          loading: false,
          data: response.data.data.children.filter(
            item => item.data.id === String(match.params.id),
          )[0].data,
        }));
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

    if (data) {
      let imgUrl = '';
      const flag = data.preview;
      if (flag) {
        imgUrl = data.preview.images[0].source.url.replace(
          new RegExp('&amp;', 'g'),
          '&',
        );
      } else {
        imgUrl =
          'https://tproger.ru/wp-content/uploads/2017/08/coding-mini-js.png';
      }
      return (
        <ThemeProvider theme={theme}>
          <MainTemplate title="">
            {loading && <p>Loading...</p>}
            {error && (
              <div>
                <p>Download error</p>
                <button type="button" onClick={this.fetch}>
                  Try again
                </button>
              </div>
            )}
            {!loading && (
              <NewsCard
                avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
                userName={data.author}
                pubDate={Index(data.created_utc)}
                img={imgUrl}
                title={data.title}
                commentsCount={String(data.num_comments)}
              />
            )}
          </MainTemplate>
        </ThemeProvider>
      );
    }
  }
}

export default CommentPage;
