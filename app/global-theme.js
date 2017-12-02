
import { createMuiTheme } from 'material-ui/styles';
import grey from "material-ui/colors/grey";
import lightBlue from "material-ui/colors/lightBlue";

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: { ...lightBlue, A200: '#40C4FF' }
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
