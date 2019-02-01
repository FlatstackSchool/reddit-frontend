/* eslint-disable max-len,react/no-unused-state,react/prop-types,consistent-return */
import React, { Fragment } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import NewsCard from '../../organisms/NewsCard';
import MainTemplate from '../../templates/MainTemplate';
import Index from '../../molecules/TimeConverter';
import CommentBlock from '../../organisms/comment-block';

const theme = createMuiTheme();

class CommentPage extends React.Component {
  state = {
    loading: false,
    error: false,
    data: [],
    dataNews: [],
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
      .get(`https://www.reddit.com/comments/${match.params.id}.json`)
      .then(response => {
        this.setState(() => ({
          loading: false,
          data: response.data[0].data.children[0].data,
          dataNews: response.data[1].data.children,
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
    const { data, dataNews, loading, error } = this.state;
    const renderCommentsList = Object.keys(dataNews).map(item => (
      <li
        key={dataNews[item].data.id}
        style={{ listStyleType: 'none', marginBottom: '1em' }}
      >
        <CommentBlock
          author={dataNews[item].data.author}
          pubDate={Index(dataNews[item].data.created_utc)}
          body={dataNews[item].data.body}
        />
      </li>
    ));

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
              <Fragment>
                <NewsCard
                  avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
                  userName={data.author}
                  pubDate={Index(data.created_utc)}
                  img={imgUrl}
                  title={data.title}
                  commentsCount={String(data.num_comments)}
                />
                {renderCommentsList}
              </Fragment>
            )}
          </MainTemplate>
        </ThemeProvider>
      );
    }
  }
}

export default CommentPage;
