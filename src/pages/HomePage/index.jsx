/* eslint-disable no-param-reassign,max-len */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MainTemplate from '../../templates/MainTemplate';
import NewsCard from '../../organizm/news-card/NewsCard';
import TimeConverter from '../../molecules/TimeConverter/TimeConverter';

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
        this.setState(() => ({
          loading: false,
          responseData: response.data.data.children,
        }));
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

  openAndCheckWindow = () => {
    const window = this.openWindow();
    this.checkAuthWindow(window);
  };

  checkAuthWindow = window => {
    const check = setInterval(() => {
      if (!window || window.closed || window.closed === undefined) {
        clearInterval(check);
      }
      try {
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
    const {
      responseData, loading, error
    } = this.state;
    let renderNewsCards;
    const styles =  {
      itemStyles: {
        listStyleType: 'none',
        paddingInlineStart: 0,
      },
      listMB: {marginBottom: '1em'},
    };

    if(responseData) {
      renderNewsCards = Object.keys(responseData).map((item, index) => {
        let imgUrl = '';
        let flag = responseData[item].data.preview;
        if(flag) {
          imgUrl = responseData[item].data.preview.images[0].source.url.replace(new RegExp('&amp;', 'g'), '&');
        }
        else {
          imgUrl = "https://tproger.ru/wp-content/uploads/2017/08/coding-mini-js.png";
        }
        return (
          <li
            key={index}
            style={styles.listMB}
          >
            <Link
              to={`${'/comments/'}${responseData[item].data.id}`}
            >
              <NewsCard
                avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
                userName={responseData[item].data.author}
                pubDate={TimeConverter(responseData[item].data.created_utc)}
                img={imgUrl}
                title={responseData[item].data.title}
                commentsCount={(responseData[item].data.num_comments).toString()}
              />
            </Link>
          </li>
        )
      });
    }
    return (
      <ThemeProvider theme={theme}>
        <MainTemplate title="Hot" onclick={this.openAndCheckWindow}>
          <div>
            {loading && <p>Loading...</p>}
              {error && (
                <div>
                  <p>Download error</p>
                  <button onClick={this.fetch}>Try again</button>
                </div>
              )}
            <ul style={styles.itemStyles}>
              {renderNewsCards}
            </ul>
          </div>
        </MainTemplate>
      </ThemeProvider>
    )
  }
}

export default HomePage;
