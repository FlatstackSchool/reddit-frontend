/* eslint-disable max-len,react/no-unused-state,react/prop-types,consistent-return */
import React from 'react';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import NewsCard from '../../organizm/news-card/NewsCard';
import MainTemplate from '../../templates/MainTemplate/index';
import TimeConverter from '../../molecules/TimeConverter/TimeConverter';

const theme = createMuiTheme();

class CommentPage extends React.Component {
  state = {
    loading: false,
    error: false,
    commentData: {},
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

    const { match } = this.props;

    axios
      .get(`https://www.reddit.com/hot.json`, {
        params: {
          // apikey: process.env.file_name,
        },
      })
      .then(response => {
        this.setState(() => ({
          loading: false,
          commentData: response.data.data.children.filter(
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
    const { commentData, loading, error } = this.state;

    if (commentData) {
      let imgUrl = '';
      const flag = commentData.preview;
      if (flag) {
        imgUrl = commentData.preview.images[0].source.url.replace(
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
                userName={commentData.author}
                pubDate={TimeConverter(commentData.created_utc)}
                img={imgUrl}
                title={commentData.title}
                commentsCount={String(commentData.num_comments)}
              />
            )}
          </MainTemplate>
        </ThemeProvider>
      );
    }
  }
}

export default CommentPage;
