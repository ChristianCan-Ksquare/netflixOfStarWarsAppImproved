import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import "../css/index.css";
import {
  NativeSelect,
  FormControl,
  InputLabel,
  makeStyles,
  TextField,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  FormControl: {
    marginBottom: 20,
  },
  field: {
    marginTop: 10,
    marginBottom: 10,
  },
  crawl: {
    marginBottom: 20,
  },
}));

function MovieForm({ onAddMovie }) {
  const classes = useStyles();

  const [episodeIdValue, setEpisodeId] = useState(0);
  const [title, setTitle] = useState("");
  const [producer, setProducer] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [posterImg, setPosterImg] = useState("");
  const [planet, setPlanet] = useState("Tatooine");
  const [openingCrawl, setOpeningCrawl] = useState("");

  const [dataPlanets, setDataPlanets] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    onAddMovie({
      title: title,
      episode_id: episodeIdValue,
      producer: producer,
      release_date: releaseDate,
      director: director,
      poster_img: posterImg,
      planets: planet,
      opening_crawl: openingCrawl,
    });

    setEpisodeId(0);
    setTitle("");
    setProducer("");
    setReleaseDate("");
    setDirector("");
    setPosterImg("");
    setPlanet("");
    setOpeningCrawl("");
  };

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/planets")
      .then((res) => {
        setDataPlanets(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Box border={1} borderRadius={16} borderColor="primary" padding={2}>
        <form onSubmit={handleOnSubmit}>
          <Grid item md={12}>
            <TextField
              type="number"
              label="Episode Id"
              variant="outlined"
              value={episodeIdValue}
              onChange={(e) => setEpisodeId(e.target.value)}
              className={classes.field}
              required
              id="episodeId"
              fullWidth
              inputProps={{ min: 0, step: 1 }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              required
              id="title"
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Producer"
              variant="outlined"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              className={classes.field}
              required
              id="producer"
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Release Date"
              variant="outlined"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className={classes.field}
              required
              id="releaseDate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Director"
              variant="outlined"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className={classes.field}
              required
              id="director"
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Image of the poster"
              variant="outlined"
              type="file"
              value={posterImg}
              onChange={(e) => setPosterImg(e.target.value)}
              className={classes.field}
              required
              id="director"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={12}>
            <FormControl
              className={classes.FormControl}
              style={{
                display: "flex",
              }}
            >
              <InputLabel shrink htmlFor="planet-native-label-placeholder">
                Planet*
              </InputLabel>
              <NativeSelect
                onChange={(e) => setPlanet(e.target.value)}
                value={planet}
                inputProps={{
                  name: "planet",
                  id: "planet-native-label-placeholder",
                }}
              >
                {dataPlanets.map((element, index) => (
                  <option key={index} value={element.name}>
                    {element.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Opening crawl"
              variant="outlined"
              value={openingCrawl}
              onChange={(e) => setOpeningCrawl(e.target.value)}
              className={(classes.field, classes.crawl)}
              required
              id="openingCrawl"
              placeholder="Write the opening crawl of your movie here..."
              fullWidth
              multiline
              minRows={6}
            />
          </Grid>
          <Box display="flex" justifyContent="center">
            <button className="buttonSubmit">Submit</button>
          </Box>
        </form>
      </Box>
    </Grid>
  );
}

export default MovieForm;
