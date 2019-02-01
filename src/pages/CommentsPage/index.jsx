/* eslint-disable max-len,react/no-unused-state,react/prop-types,consistent-return, react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import NewsCard from '../../organisms/NewsCard';
import MainTemplate from '../../templates/MainTemplate';
import TimeConverter from '../../molecules/TimeConverter';
import receivePosts from '../../store/actions/receivePosts';

const theme = createMuiTheme();

class CommentPage extends React.Component {
  componentDidMount() {
    this.props.receivePosts();
  }

  render() {
    const { data, isLoading, error, match } = this.props;
    if (data) {
      const post = data.filter(
        item => item.data.id === String(match.params.id),
      )[0].data;
      let imgUrl = '';
      const flag = post.preview;
      if (flag) {
        imgUrl = post.preview.images[0].source.url.replace(
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
            {isLoading && <p>Loading...</p>}
            {error && (
              <div>
                <p>Download error</p>
                <button type="button" onClick={() => this.props.receivePosts}>
                  Try again
                </button>
              </div>
            )}
            {!isLoading && (
              <NewsCard
                avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
                userName={post.author}
                pubDate={TimeConverter(post.created_utc)}
                img={imgUrl}
                title={post.title}
                commentsCount={String(post.num_comments)}
              />
            )}
          </MainTemplate>
        </ThemeProvider>
      );
    }
  }
}

const mapStateToProps = state => ({
  data: state.posts.data,
  isLoading: state.posts.isLoading,
  error: state.posts.error,
});

const mapDispatchToProps = dispatch => ({
  receivePosts: () => {
    dispatch(receivePosts());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentPage);

CommentPage.propTypes = {
  receivePosts: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

CommentPage.defaultProps = {
  error: false,
};
