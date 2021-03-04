import React from 'react';
import Button from '@material-ui/core/Button';

import logo from '../resources/images/logo.png';
import '../styles/App.scss';

function App() {
    return (
        <body>
        <img src={logo}/>
        <Button variant="contained" color="primary">
            Hello World
        </Button>
        <p>
            Hello World !!!
        </p>
        </body>
    );
}

export default App;
