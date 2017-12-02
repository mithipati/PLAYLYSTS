
const styles = theme => ({
  root: {
    gridArea: '2 / 1 / span 1 / span 1',
    padding: '35px 15px 0 25px',
    backgroundColor: '#424242',
  },
  heading: {
    fontSize: 20,
    color: theme.palette.primary[500],
  },
  subheading: {
    marginLeft: 30,
    color: theme.palette.primary[500],
  },
  link: {
    width: 'max-content',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary[200],
    }
  },
  active: {
    color: theme.palette.primary[200],
    borderBottomColor: theme.palette.secondary.A200,
    borderBottomStyle: 'solid',
    borderBottom: 1,
    borderBottomWidth: 2,
  },
  textField: {
    width: 145,
  },
  inputLabelFocused: {
    color: theme.palette.secondary.A200,
  },
  input: {
    '&:after': {
      backgroundColor: theme.palette.secondary.A200,
    },
    color: theme.palette.secondary.A200,
    fontWeight: 300,
  },
  clearfix: {
    marginBottom: 30,
  },
});

export default styles;

