
const styles = theme => ({
  root: {
    gridArea: '1 / 1 / span 1 / span 3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    boxShadow: 'none',
    backgroundColor: theme.palette.primary[900],
  },
  logo: {
    marginLeft: 15,
    fontSize: 30,
    color: theme.palette.secondary.A200,
    letterSpacing: 8,
    cursor: 'pointer',
  },
  settings: {
    marginLeft: 'auto',
    marginRight: 15,
    fontSize: 15,
    color: theme.palette.primary[500],
    letterSpacing: 2,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary[200],
    },
  },
});

export default styles;
