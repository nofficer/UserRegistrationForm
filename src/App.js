import FormHolder from './components/forms/FormHolder'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/header/Header'
import CssBaseline from '@mui/material/CssBaseline';

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
    fontSize: 12
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
     <CssBaseline />
      <div className="App">
        <Header/>
        <FormHolder formTitle={'Create User Account'}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
