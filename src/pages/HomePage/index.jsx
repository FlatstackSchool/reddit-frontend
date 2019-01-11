import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MainTemplate from '../../templates/MainTemplate';

const theme = createMuiTheme();
const HomePage = () => (
  <ThemeProvider theme={theme}>
    <MainTemplate title="Hot">Очередной бессмысленный текст</MainTemplate>
  </ThemeProvider>
);

export default HomePage;
