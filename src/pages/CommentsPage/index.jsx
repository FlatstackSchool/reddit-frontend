/* eslint-disable max-len,react/prop-types,consistent-return, react/destructuring-assignment, prefer-destructuring */
import React, { Fragment } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import NewsCard from '../../organisms/NewsCard';
import MainTemplate from '../../templates/MainTemplate';
import TimeConverter from '../../molecules/TimeConverter';
import CommentBlock from '../../organisms/CommentBlock';
import receiveComments from '../../store/actions/receiveComments';

const theme = createMuiTheme();

class CommentsPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.receiveComments(id);
  }

  render() {
    const { data, dataNews, isLoading, error } = this.props;
    const renderCommentsList = Object.keys(dataNews).map(item => (
      <li key={dataNews[item].data.id} style={{ marginBottom: '1em' }}>
        {dataNews[item].data.author && (
          <CommentBlock
            author={dataNews[item].data.author}
            pubDate={TimeConverter(dataNews[item].data.created_utc)}
            body={dataNews[item].data.body}
          />
        )}
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
            {isLoading && <p>Loading...</p>}
            {error && (
              <div>
                <p>Download error</p>
                <button
                  type="button"
                  onClick={() => this.props.receiveComments()}
                >
                  Try again
                </button>
              </div>
            )}
            {!isLoading && (
              <Fragment>
                <NewsCard
                  avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
                  userName={data.author}
                  pubDate={TimeConverter(data.created_utc)}
                  img={imgUrl}
                  title={data.title}
                  commentsCount={String(data.num_comments)}
                />
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingInlineStart: 0,
                    position: 'absolute',
                    width: '85%',
                  }}
                >
                  {renderCommentsList}
                </ul>
              </Fragment>
            )}
          </MainTemplate>
        </ThemeProvider>
      );
    }
  }
}

const mapStateToProps = state => ({
  data: state.comments.data,
  dataNews: state.comments.dataNews,
  isLoading: state.comments.isLoading,
  error: state.comments.error,
});

const mapDispatchToProps = {
  receiveComments: id => receiveComments(id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsPage);

CommentsPage.propTypes = {
  receiveComments: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataNews: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

CommentsPage.defaultProps = {
  error: false,
};
