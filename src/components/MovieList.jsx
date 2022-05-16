import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import Quiz from "./Quiz";

const MovieList = ({ movieArray, setSearchText }) => {
  const [cast, setCast] = useState([]);
  const [wrongCast, setWrongCast] = useState([]);
  const [movie, setMovie] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const getMovieInfo = async (movie_id) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const castArray = [];
      for (let i = 0; i < 3; i++) {
        castArray.push(data.cast[i].name);
      }
      return castArray;
    } catch (error) {
      console.error(error);
    }
  };

  const getWrongMovieInfo = async (movie_id) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const wrongCastArray = [];
      for (let i = 0; i < 2; i++) {
        wrongCastArray.push(data.cast[i].name);
      }
      return wrongCastArray;
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetData = (id, offId, title) => {
    const correctCast = getMovieInfo(id);
    const notCorrectCast = getWrongMovieInfo(offId);
    Promise.all([correctCast, notCorrectCast]).then((response) => {
      const shuffledArray = shuffle([...response[0], ...response[1]]);
      setQuizOptions(shuffledArray);
      setMovie(title);
      setCast(response[0]);
      setWrongCast(response[1]);
    });
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>
            Movie List {movieArray.length ? movieArray.length : ""} matches
          </Typography>
        </AccordionSummary>
        {movieArray.map((movie, i) => {
          return (
            <>
              <AccordionDetails
                button
                key={i}
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleGetData(movie[1], movie[1] - 1, movie[0]);
                }}
              >
                <Typography>{movie[0]}</Typography>
              </AccordionDetails>
            </>
          );
        })}
      </Accordion>
      <Quiz
        cast={cast}
        wrongCast={wrongCast}
        movie={movie}
        setAnswers={setQuizOptions}
        answers={quizOptions}
        setSearchText={setSearchText}
        setMovie={setMovie}
      />
    </div>
  );
};

export default MovieList;
