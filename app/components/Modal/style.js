
const styles = theme => ({
  modalTab: {
    fontWeight: 300,
    letterSpacing: 2,
    color: theme.palette.secondary.A200,
    backgroundColor: theme.palette.primary[900],
  },
  modalContent: {
    width: '100%',
    minWidth: 400,
    paddingTop: 10,
    backgroundColor: theme.palette.primary[900],
  },
  form: {
    padding: '15px 25px 0 25px',
  },
  formGroup: {
    height: 205,
  },
  formGroupReset: {
    height: '100%',
  },
  textArea: {
    height: '33%',
  },
  loginTextArea: {
    height: '50%',
  },
  label: {
    fontWeight: 300,
    color: theme.palette.secondary.A200,
  },
  input: {
    fontWeight: 300,
    color: theme.palette.secondary.A200,
  },
  hiddenInput: {
    display: 'none',
  },
  helperText: {
    position: 'absolute',
    top: '50%',
    marginTop: '-20px',
    width: 'max-content',
    cursor: 'pointer',
    color: theme.palette.primary[700],
    '&:hover': {
      color: theme.palette.secondary.A200,
    }
  },
  clearfix: {
    width: '100%',
    margin: '10px 0',
    textAlign: 'center',
    letterSpacing: '2px',
    fontWeight: 200,
    color: theme.palette.secondary.A200,
  },
});

export default styles;
