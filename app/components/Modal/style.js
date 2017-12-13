
const styles = theme => ({
  modalTab: {
    fontWeight: 300,
    letterSpacing: 2,
    color: theme.palette.secondary.A200,
    backgroundColor: theme.palette.primary[900],
  },
  modalContent: {
    paddingTop: 10,
    width: 400,
    backgroundColor: theme.palette.primary[900],
  },
  form: {
    padding: '15px 25px 0 25px',
  },
  formGroup: {
    height: 205,
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
