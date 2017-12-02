
const styles = theme => ({
  root: {
    gridArea: '2 / 2 / span 1 / span 1',
    backgroundColor: '#616161',
    padding: '20px 30px 0 30px',
  },
  heading: {
    margin: '15px 0 30px 0',
    color: theme.palette.primary[200],
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 600,
  },
  input: {
    marginTop: 12,
    '&:after': {
      backgroundColor: theme.palette.primary[900],
    },
    color: theme.palette.primary[200],
    fontWeight: 300,
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

