import React from 'react';
import axios from 'axios';
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
    page: 1,
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

  render() {
    const {
      responseData, loading, error
    } = this.state;
    let renderNewsCards;

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
          >
            <NewsCard
              avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
              userName={responseData[item].data.author}
              pubDate={TimeConverter(responseData[item].data.created_utc)}
              img={imgUrl}
              title={responseData[item].data.title}
              commentsCount={(responseData[item].data.num_comments).toString()}/>
          </li>
        )
      });
    }
    return (
      <div>
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
               <ul>
                 {renderNewsCards}
               </ul>
            </div>
          </div>
        </MainTemplate>
      </ThemeProvider>
      </div>
    )
  }
}

export default HomePage;
