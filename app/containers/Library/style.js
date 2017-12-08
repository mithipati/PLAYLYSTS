
const styles = theme => ({
  root: {
    gridArea: '2 / 2 / span 1 / span 1',
    padding: '20px 30px 0 30px',
    backgroundColor: theme.palette.primary[700],
    overflowY: 'scroll',
  },
  addSongContainer: {
    display: 'flex',
  },
  heading: {
    margin: '15px 0 10px 0',
    fontSize: 35,
    color: theme.palette.primary[200],
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 25,
    width: 500,
    height: 65,
    minWidth: 400,
  },
  input: {
    marginTop: 12,
    '&:after': {
      backgroundColor: theme.palette.primary[900],
    },
    color: theme.palette.primary[200],
    fontWeight: 300,
  },
  errorMessage: {
    display: 'none',
  },
  error: {
    display: 'block',
    color: theme.palette.error[500],
    '&:after': {
      backgroundColor: theme.palette.error[500],
    },
  },
  helperText: {
    width: 'max-content',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary[200],
    }
  },
});

export default styles;

