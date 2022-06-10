import FormHolder from './components/forms/FormHolder'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'Lato'
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <FormHolder formTitle={'Create User Account'}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
