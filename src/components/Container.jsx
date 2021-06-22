import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


import Search from './Search'

const Container = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(6),
            margin: 'auto',
            maxWidth: '50%',
        },

    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>


            <Paper className={classes.paper}>

                <Search />

            </Paper>

        </div>
    )
}

export default Container
