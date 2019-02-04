import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {
  card: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  title: {
    fontSize: 16,
    fontWidth: 700,
  },
  pos: {
    marginBottom: 12,
  },
};

const CommentBlock = ({ classes, author, pubDate, body }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} gutterBottom>
        {author}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {pubDate}
      </Typography>
      <Divider />
      <Typography component="p">{body}</Typography>
    </CardContent>
  </Card>
);

CommentBlock.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  author: PropTypes.string,
  pubDate: PropTypes.string,
  body: PropTypes.string,
};
CommentBlock.defaultProps = {
  author: '',
  pubDate: '',
  body: '',
};

export default withStyles(styles)(CommentBlock);
