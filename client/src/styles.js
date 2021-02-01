import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        // makes all text capital(overline) in roboto
        ...theme.typography.overline,
    },
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#212121'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        background: '#212121',
        borderRadius: 3,
        border: 0,
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#424242"
        }
    },

    image: {
        height: 0,
        paddingTop: '80%'
    },
    table: {
        minWidth: 650,
    },
    progress: {
        margin: 'auto',

    }
}));