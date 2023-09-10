import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";

const SurveyWelcome = (props) => {
    const { moveToNextStepProp } = props

    return(
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <Typography align="center">
                    Gryfn is a comprehensive dyslexia screening and personalized support for reading and learning success.
                </Typography>
            </Grid>

            <Grid item>
                <Button variant="contained" color="primary" onClick={moveToNextStepProp}>
                    Start
                </Button>
            </Grid>
        </Grid>
    )
}

export default SurveyWelcome
