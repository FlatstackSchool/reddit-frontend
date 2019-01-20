import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import NewsCard from '../../organizm/news-card/NewsCard';
import MainTemplate from '../../templates/MainTemplate/index';

const theme = createMuiTheme();

const Index = () => (
  <div>
    <ThemeProvider theme={theme}>
      <MainTemplate title="Hot">
        <div>
          <div>
            <NewsCard
              avatarImg="https://sun9-29.userapi.com/c845121/v845121770/17f149/6TqH6c5o6nc.jpg?ava=1"
              userName="BigDaddyLaowai"
              pubDate="September 14, 2018"
              title="Путь к техническому лидерству: как разработчику стать техлидом"
              img="https://tproger.ru/wp-content/uploads/2017/08/coding-mini-js.png"
              commentsCount="47"
            />
          </div>
        </div>
      </MainTemplate>
    </ThemeProvider>
  </div>
);

export default Index;
