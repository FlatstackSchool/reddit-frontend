/* eslint-disable no-param-reassign,max-len,react/no-unused-state,react/no-array-index-key,prettier/prettier, react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import receivePosts from '../../store/actions/receivePosts';
import NewsCard from '../../organisms/NewsCard';
import TimeConverter from '../../molecules/TimeConverter';
import MainTemplate from '../../templates/MainTemplate';

const theme = createMuiTheme();

class HomePage extends React.Component {
  componentDidMount() {
    this.props.receivePosts();
  }

  render() {
    const { data, isLoading, error, } = this.props;
    let renderNewsCards;
    const styles = {
      itemStyles: {
        listStyleType: 'none',
        paddingInlineStart: 0,
      },
      listMB: { marginBottom: '1em' },
    };
    if (data) {
      renderNewsCards = Object.keys(data).map((item, index) => {
        let imgUrl = '';
        const flag = data[item].data.preview;
        if (flag) {
          imgUrl = data[item].data.preview.images[0].source.url.replace(
            new RegExp('&amp;', 'g'),
            '&',
          );
        } else {
          imgUrl =
            'https://tproger.ru/wp-content/uploads/2017/08/coding-mini-js.png';
        }
        return (
          <li key={index} style={styles.listMB}>
            <Link to={`${'/comments/'}${data[item].data.id}`}>
              <NewsCard
                avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
                userName={data[item].data.author}
                pubDate={TimeConverter(data[item].data.created_utc)}
                img={imgUrl}
                title={data[item].data.title}
                commentsCount={data[item].data.num_comments.toString()}
              />
            </Link>
          </li>
        );
      });
    }
    return(
      <ThemeProvider theme={theme}>
        <MainTemplate title="Hot">
          <div>
            {isLoading && <p>Loading...</p>}
            {error && (
              <div>
                <p>Download error</p>
                <button type="button" onClick={() => this.props.receivePosts()}>
                  Try again
                </button>
              </div>
            )}
             <ul style={styles.itemStyles}>{renderNewsCards}</ul>
          </div>
        </MainTemplate>
      </ThemeProvider>
    )
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
    }
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

HomePage.propTypes = {
  receivePosts: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

HomePage.defaultProps = {
  error: false,
};
