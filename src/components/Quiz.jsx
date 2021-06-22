import { React, useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'

const Quiz = ({ cast, movie, answers, setSearchText }) => {
    const [checkBoxes, setCheckBoxes] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
    });
    const [score, setScore] = useState(0);

    const handleCheckBoxAnswer = (event) => {
        setCheckBoxes({ ...checkBoxes, [event.target.name]: event.target.checked });

    };

    const handleAfterSubmit = () => {
        let correctAnswers = 0
        const userAnswers = [...Object.values(checkBoxes)]
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i]) {
                if (cast.includes(answers[i])) {
                    correctAnswers++
                }
            }
        }
        if (correctAnswers === 3) {

            setScore(score + 1)
        }
        correctAnswers = 0
        // for(let i = 0; i < 5; i++){
        // setCheckBoxes({ ...checkBoxes, [i]: false })
        // }
        setSearchText("")
    }

    let answersEnabled = true
    let numberOfChecked = 0
    const userAnswers = [...Object.values(checkBoxes)]
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i]) {
            numberOfChecked++
        }
        if (numberOfChecked > 2) {
            answersEnabled = false
        } else {
            answersEnabled = true
        }
    }


    return (
        <>
            <p>
                Which three actors are in <b>"{movie}"</b>?
        </p>
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row style={{ display: 'block' }}>
                    {answers === undefined ? null : answers.map((answer, i) =>
                        <FormControlLabel
                            key={i}
                            checked={checkBoxes[i]}
                            value="end"
                            control={<Checkbox color="primary" />}
                            label={answer}
                            labelPlacement='end'
                            onChange={handleCheckBoxAnswer}
                            name={i + ""}
                            disabled={!checkBoxes[i] && !answersEnabled}

                        />
                    )}
                </FormGroup>
                <Button variant="contained" style={{ width: 600 }} onClick={() => { handleAfterSubmit() }}>Submit</Button>
            </FormControl>
            <p> Your score is {score}</p>
            <div>
            </div>
        </>
    )
}

export default Quiz
