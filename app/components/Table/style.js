
const styles = theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary[700],
  },
  tableHeader: {
    fontWeight: 400,
    letterSpacing: 2,
    color: theme.palette.primary[300],
    borderBottomColor: theme.palette.primary[800],
  },
  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.primary[600],
    }
  },
  tableCell: {
    fontWeight: 300,
    fontSize: 15,
    color: theme.palette.primary[200],
    borderBottomColor: theme.palette.primary[800],
  },
  buttonCell: {
    width: 10,
  },
  active: {
    backgroundColor: theme.palette.primary[600],
  },
  placeholder: {
    textAlign: 'center',
    color: theme.palette.primary[200],
  },
});

export default styles;

