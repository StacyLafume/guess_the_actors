import { React, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Quiz = ({
  cast,
  movie,
  answers,
  setSearchText,
  setAnswers,
  setMovie,
}) => {
  const [checkBoxes, setCheckBoxes] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [score, setScore] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckBoxAnswer = (event) => {
      //pass in previous state and override it with user answer
    setCheckBoxes({ ...checkBoxes, [event.target.name]: event.target.checked });
  };

  const handleAfterSubmit = () => {
    let correctAnswers = 0;
    const userAnswers = [...Object.values(checkBoxes)];
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i]) {
        if (cast.includes(answers[i])) {
          correctAnswers++;
        }
      }
    }
    if (correctAnswers === 3) {
      setScore(score + 1);
      setSearchText("");
      setAnswers([]);
      setMovie([]);
      setIsSuccess(true);
    }
    correctAnswers = 0;

    setCheckBoxes({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    });

  };

  let answersEnabled = true;
  let numberOfChecked = 0;
  const userAnswers = [...Object.values(checkBoxes)];
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i]) {
      numberOfChecked++;
    }
    if (numberOfChecked > 2) {
      answersEnabled = false;
    } else {
      answersEnabled = true;
    }
  }

  return (
    <>
      <p> Your score is {score}</p>
      <Snackbar
        severity="success"
        open={isSuccess}
        autoHideDuration={3000}
        message="Congratulations, you won!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={()=> setIsSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Congratulations, you won!
        </Alert>
      </Snackbar>
      <p>
        Which three actors are in <b>"{movie}"</b>?
      </p>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row style={{ display: "block" }}>
          {answers.map((answer, i) => (
            <FormControlLabel
              key={i}
              checked={checkBoxes[i]}
              value="end"
              control={<Checkbox color="primary" />}
              label={answer}
              labelPlacement="end"
              onChange={handleCheckBoxAnswer}
              name={i + ""}
              disabled={!checkBoxes[i] && !answersEnabled}
            />
          ))}
        </FormGroup>
        <Button
          variant="contained"
          style={{ width: 600 }}
          onClick={() => {
            handleAfterSubmit();
          }}
        >
          Submit
        </Button>
      </FormControl>

      <div></div>
    </>
  );
};

export default Quiz;
