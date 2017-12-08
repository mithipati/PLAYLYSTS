
import { createMuiTheme } from 'material-ui/styles';
import grey from "material-ui/colors/grey";
import lightBlue from "material-ui/colors/lightBlue";
import red from "material-ui/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: { ...lightBlue, A200: '#40C4FF' },
    error: { ...red, A700: '#D50000' }
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue"',
    display1: {
      fontWeight: 300,
      color: grey[200],
    },
    display2: {
      fontSize: 40,
      fontWeight: 300,
      color: grey[200],
    },
    subheading: {
      fontWeight: 300,
      color: grey[200],
    },
    body1: {
      width: 'max-content',
      fontWeight: 300,
      color: grey[200],
    },
  }
});

export default theme;
