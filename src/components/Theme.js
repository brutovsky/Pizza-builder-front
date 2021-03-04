import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#511845',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#900c3f',
            dark: '#ba000d',
            contrastText: '#000',
        },
        text: {
            main: '#fff',
        },
    },
})
export default theme
