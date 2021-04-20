import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#900c3f',
            main: '#511845',
            dark: '#350d2d',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#900c3f',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
})

export default theme
