
const styles = theme => ({
  root: {
    gridArea: '2 / 2 / span 1 / span 1',
    padding: '20px 30px 0 30px',
    backgroundColor: theme.palette.primary[700],
    overflowY: 'scroll',
  },
  heading: {
    margin: '15px 0 10px 0',
    fontSize: 35,
    fontWeight: 200,
    color: theme.palette.primary[200],
  },
  label: {
    color: theme.palette.primary[200],
    fontWeight: 200,
    fontSize: 35,
  },
  input: {
    marginTop: '30px !important',
    color: theme.palette.primary[200],
    fontWeight: 300,
    '&:after': {
      backgroundColor: theme.palette.primary[900],
    },
  },
  loader: {
    marginTop: 10,
  },
  helperText: {
    fontSize: '1rem',
    width: 'max-content',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary[200],
    }
  },
  helperTextError: {
    fontSize: '1rem',
    lineHeight: '20px',
    color: theme.palette.error.A400,
  },
});

export default styles;

