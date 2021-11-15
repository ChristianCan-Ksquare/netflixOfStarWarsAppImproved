import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MovieCard from "./MovieCard";
import Header from "./Header";
import MovieForm from "./MovieForm";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default function ListOfMovies() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/films")
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onAddMovie = (movie) => {
    setData([...data, movie]);
  };

  return (
    <Box>
      <Header />
      <Grid container spacing={2} className={classes.gridContainer}>
        {data.map((element, index) => (
          <Grid key={element.episode_id} item xs={12} sm={8} md={4}>
            <MovieCard
              key={element.episode_id}
              episodeId={parseInt(element.episode_id, 10)}
              title={element.title}
              director={element.director}
              releaseDate={element.release_date}
              openingCrawl={element.opening_crawl}
              producer={element.producer}
              planets={element.planets}
              posterImg={element.poster_img}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2} mb={4}>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          onClick={handleShowForm}
        >
          Add film
        </Button>
      </Box>
      <Box mb={4}>
        {showForm ? <MovieForm onAddMovie={onAddMovie} /> : false}
      </Box>
    </Box>
  );
}
