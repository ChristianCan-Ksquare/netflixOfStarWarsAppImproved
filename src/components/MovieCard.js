import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import posterImages from "../assets/poster-images";
import MovieCrawlModal from "./MovieCrawlModal";
import Modal from "@material-ui/core/Modal";
import funcs from "../utils/functions";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    height: "100%",
  },
  media: {
    height: 240,
  },
  poster: {
    height: "100%",
  },

  button: {
    justifyContent: "center",
  },
});

function MovieCards(props) {
  const classes = useStyles();
  const {
    episodeId,
    title,
    director,
    releaseDate,
    openingCrawl,
    producer,
    planets,
    posterImg,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openPoster, setOpenPoster] = React.useState(false);

  const handleOpenPoster = () => {
    setOpenPoster(true);
  };

  const handleClosePoster = () => {
    setOpenPoster(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {posterImg ? (
          <Typography variant="h6" component="h6">
            {posterImg}
          </Typography>
        ) : (
          <CardMedia
            onClick={handleOpenPoster}
            className={classes.media}
            image={posterImages[episodeId]}
          />
        )}

        <CardContent>
          <Typography variant="h6" component="h6">
            {`Episode ${funcs.integerToRoman(parseInt(episodeId, 10))}`}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {`Director: ${director}`}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {`Producer(s): ${producer}`}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {`Release Date: ${releaseDate}`}
          </Typography>

          <Typography variant="body2" color="textPrimary" component="p">
            {`Planet(s): ${funcs.GetPlanets(planets)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions classes={{ root: classes.button }}>
        <Button size="medium" variant="outlined" onClick={handleOpen}>
          See opening
        </Button>
      </CardActions>
      <div>
        {open ? (
          <MovieCrawlModal
            open={true}
            close={handleClose}
            openingCrawl={openingCrawl}
            episodeId={episodeId}
          />
        ) : (
          false
        )}
      </div>
      <Modal
        open={openPoster}
        onClose={handleClosePoster}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {
          <img
            src={posterImages[episodeId]}
            className={classes.poster}
            alt="MoviePoster"
          />
        }
      </Modal>
    </Card>
  );
}

MovieCards.propTypes = {
  episodeId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  openingCrawl: PropTypes.string,
};

export default MovieCards;
