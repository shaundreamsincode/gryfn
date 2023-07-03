import React from "react";
import { Link } from "react-router-dom";

import { Button } from '@material-ui/core';

export default () => (
    <div>
        <h1 className="display-4">Docbot :D</h1>
        <p className="lead">
            Welcome!
        </p>
        <hr className="my-4" />
        <Link
            to="/chats/new"
            className="btn btn-lg custom-button"
            role="button"
        >
            Create a Nessw Chat
        </Link>

        <Button color="primary">Hello World!</Button>
    </div>
);
