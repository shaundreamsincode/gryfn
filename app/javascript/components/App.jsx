import React from "react";
import Routes from "../routes";
import { Card, CardContent } from "@material-ui/core";

export default props => <>
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
            {Routes}
            <br/> <br/>
            DISCLAIMER GOES HERE!
        </CardContent>
    </Card>
</>;
