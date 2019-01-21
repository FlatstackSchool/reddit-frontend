import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  cover: {
    width: 151,
  },
};

function NewsCard(props) {
  const {
    classes,
    avatarImg,
    userName,
    pubDate,
    title,
    img,
    commentsCount,
  } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="Recipe"
            src={avatarImg}
            className={classes.avatar}
          >
            A
          </Avatar>
        }
        title={userName}
        subheader={pubDate}
      />
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={img}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {commentsCount} Comments
        </Button>
      </CardActions>
    </Card>
  );
}
NewsCard.defaultProps = {
  avatarImg: '',
  userName: '',
  pubDate: '',
  title: '',
  img: '',
  commentsCount: '',
};

NewsCard.propTypes = {
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
  avatarImg: PropTypes.string,
  userName: PropTypes.string,
  pubDate: PropTypes.string,
  title: PropTypes.string,
  img: PropTypes.string,
  commentsCount: PropTypes.string,
};

export default withStyles(styles)(NewsCard);
